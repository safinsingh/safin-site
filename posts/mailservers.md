---
title: Mail Servers
pubDate: 2023-01-15
description: Architecture and setup for mail servers on Fedora 36
layout: blog.njk
---

## How do Mail Servers work?

### Parts of a Mail Server

1. MTA

An MTA, or Mail Transfer Agent, is responsible for sending and recieving messages between mail servers. Some popular examples of MTAs include: `postfix`, `exim`, and `sendmail`. An MTA interfaces with other mail servers using SMTP. In order to do this, it identifies the IP of the recipient server using DNS and creates a connection using SMTP.

> Note: it is possible for `exim` to act as both an MTA and MDA; however, it is reccomended to separate the two for modularity reasons

2. MDA

An MDA, or Mail Delivery Agent, is responsible for delivering mail from a server to individual users' inboxes. One commonly used Linux MDA is `dovecot`.

3. MUA

An MUA, or Mail User Agent, is responsible for displaying mail to the user and allowing them to read/manipulate it. Web-based MUAs such as Squirrelmail and Roundcube use PHP on the server to interact with the MDA to retrieve and display mail. An MUA can also connect to the MDA via the POP3 and IMAP protocols, which are explained below.

### Mail-specific Protocols

1. IMAP/POP3

IMAP and POP3 are both protocols used by the MUA and MDA to delivery mail to the user's inbox. A MUA connects to the MDA using either protocol and retrieves the most updated messages recieved by the MTA. IMAP is different from POP3 in that:

- IMAP allows the client to manage their email without downloading them to their local device. The client's changes sync between devices because changes are made and stored on the server
- POP3 requires the client to download messages and then delete them from the server. They are only acessible by the device on which the emails have been downloaded and message deletion is not synced between devices or servers.

> Note: additional features such as "favorite"-ing an email must be implemented separately on the server as they are not necessarily part of the SMTP standard. This interaction typically occurs over HTTP and information is stored in a separate database on the server.

2. SMTP

SMTP is used in any interaction with the MTA. For example, when an email is sent through the MUA, it establishes a connection to the MTA over SMTP. From there, the sender's MTA establishes a connection to the recipient's MTA over SMTP.

### Mail Flow

> The following example assumes the usage of `roundcube`, `postfix`, and `dovecot` as an MUA, MTA, and MDA respectively. It assumes the usage of the IMAP protocol for mail delivery. The `.s` and `.r` indicate whether the service is the client's or recipient's, respectively.

1. User drafts and sends a message through Roundcube, a web-based MUA.
2. Roundcube executes PHP that establishes an STMP connection with `postfix.s`, the sender's MTA. It provides the email's subject, body, and recipients.
3. The sender's MTA, `postfix.s`, looks up recipient's MTA (`postfix.r`) using DNS and then establishes a connection to the recipient's MTA (`postfix.r`) over SMTP.
4. The recipient's MTA, `postfix.r`, forwards message to recipient's MDA (`dovecot.r`) over SMTP.
5. The recipient's MUA updates when refreshed, pulling messages from the recipient's MDA (`dovecot.r`) over IMAP.

## Setting up a Mail Server on Fedora 36

Before we continue onwards, since I'm using a desktop image of Fedora, we'll start by installing the best text editor to exist on Linux:

```sh
dnf install gedit
```

### Installing dependencies

Roundcube is written in PHP and therefore requires some external dependencies, hence why we are installing multiple PHP modules separately. It will run atop a LAMP stack with Apache2, MariaDB, and PHP.

```sh
dnf install postfix dovecot httpd php mariadb-server \
    php-mysqlnd php-pear php-intl php-ldap php-gd php-imagick php-zip

# install roundcube (replace version appropriately)
cd /var/www/html
wget https://github.com/roundcube/roundcubemail/releases/download/1.6.0/roundcubemail-1.6.0-complete.tar.gz
tar xf roundcubemail-1.6.0-complete.tar.gz
mv roundcubemail-1.6.0 roundcube
chown -R apache:apache roundcube
```

### Postfix configuration

In this guide, I will be using SASL, specifically the `dovecot` SASL implementation, as an authentication layer for Postfix.

Edit the following properties in `/etc/postfix/main.cf`:

```nginx
# replace based on scenario
myhostname = localhost.localdomain
mydomain = localhost.localdomain
myorigin = localhost.localdomain

# use the maildir format for delivery
home_mailbox = Maildir/

# SASL auth parameters
smtpd_sasl_type = dovecot
smtpd_sasl_path = private/auth
smtpd_sasl_auth_enable = yes
smtpd_sasl_authenticated_header = yes
```

The `smtpd_sasl_path` option indicates the location of the UNIX socket Postfix will interact with to perform SASL authentication. This socket is created and managed by Dovecot, and is relative to the root directory of the Postfix service, which is, by default, `/var/spool/postfix/`.

The SASL type may also be set to `cyrus`, which is another 3rd-party SASL implementation separate from Dovecot. However, since we are also using Dovecot as an MDA, we will use it as a SASL layer because it has tighter integration with the rest of our stack and, as a result, is more performant.

### Dovecot configuration

Edit the following properties in `/etc/dovecot/dovecot.conf`:

```nginx
protocols = imap lmtp
```

Edit the following properties in `/etc/dovecot/conf.d/10-master.conf`:

```nginx
service auth {
  #unix_listener auth-userdb {
    #mode = 0666
    #user =
    #group =
  #}

  # create a UNIX socket to communicate with Postfix
  # and run it as the postfix user
  unix_listener /var/spool/postfix/private/auth {
    mode = 0666
    user = postfix
    group = postfix
  }
}
```

Edit the following properties in `/etc/dovecot/conf.d/10-mail.conf`:

```nginx
# enable the use of the Maildir mailbox format for delivery
mail_location = maildir:~/Maildir
```

By default, Dovecot's authentication socket uses system authentication through PAM. If you take a look at `/etc/dovecot/conf.d/10-mail.conf`, you'll notice the following:

```nginx
passdb {
  driver = pam
  # [session=yes] [setcred=yes] [failure_show_msg=yes] [max_requests=<n>]
  # [cache_key=<key>] [<service name>]
  #args = dovecot
}
```

This is uncommented, indicating that the main driver for password verification is PAM.

### MariaDB configuration

```sh
systemctl start mariadb
systemctl enable mariadb
mariadb-secure-installation
mariadb -u root -p
```

Roundcube assumes the use of the `roundcubemail` database by default. Run the following within the MariaDB interactive SQL prompt to assign the proper database and user permissions.

```sql
sql> CREATE DATABASE roundcubemail;
sql> GRANT ALL PRIVILEGES ON roundcubemail.* TO roundcube@localhost IDENTIFIED BY 'password';
sql> FLUSH PRIVILEGES;
sql> EXIT;
```

### PHP-FPM configuration

Assuming the configuration file for PHP has been left default since the installation, there's only a few preferences to set. Edit the following in `/etc/php.ini`:

```php
# any value >16M
memory_limit = 128M
file_uploads = On
date.timezone = America/Los_Angeles
```

### Roundcube setup

First, restart all the necessary services accordingly:

```sh
for srv in httpd postfix dovecot php-fpm; do
    systemctl enable $srv
    systemctl start $srv
done
```

Next, due to the fact that SELinux is enabled and enforcing by default on Fedora 36, we must run the following commands to give `httpd` permission to read/write to our Roundcube log and error directories as well as connect to the Postfix SMTP server through PHP.

```sh
for dir in logs temp; do
    abs="/var/www/html/roundcube/$dir"
    sudo semanage fcontext -a -t httpd_sys_rw_content_t $abs
    sudo restorecon -v $abs
done
setsebool -P httpd_can_sendmail on
```

Finally, navigate to [http://localhost/roundcube/installer/](http://localhost/roundcube/installer/) in your browser and follow the installation steps. Ensure that your `imap_host` and `smtp_host` are both set properly. Note that, without additional configuration, the default SMTP port for Postfix is `25` and Roundcube assumes that it is `587`. Save your generated configuration file to `/var/www/html/roundcube/config/config.inc.php`. Finally, initialize the database schema from the Roundcube web interface and test your SMTP and IMAP connections. Your server is now fully set up and running!

## Next Steps

You have successfully set up a complete mail server using Roundcube (MUA), Dovecot (MDA, SASL), and Postfix (MTA)! Here are some next steps for additional hardening and setup:

- Create a new Apache2 VHOST with HTTPS enabled
- Use TLS to encrypt messages transferred to the server over SMTP
  - Force TLS encryption with `smtp_tls_security_level`
- Use TLS to encrypt messages transferred to the client over IMAP
- Switch to port 587 for Postfix (587 is intended to be used for submission)