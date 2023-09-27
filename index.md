---
layout: layout.njk
---

<div id="img_container">
    <img id="profile" src="/images/profile.webp" alt="Profile" style="opacity: 0" />
</div>

# Hello, I'm Safin

I'm a student and programmer interested in cybersecurity. I'm a 4x CyberPatriot [National Champion](https://www.sandiegouniontribune.com/pomerado-news/news/story/2023-04-11/champions-again-poway-unified-has-top-high-school-middle-school-cybersecurity-teams-in-nation) and 3x [Future Problem Solving](https://www.fpspi.org/) International Finalist.

<br>

I love to challenge myself with difficult problems (`homework due yesterday` and `debugging Rust errors` to name a few). In doing so, I've developed an aptitude for learning new things and simplifying their core concepts to [teach them to others](https://www.youtube.com/playlist?list=PLcn9NsWbb8s4wQrX0Qi5G4kRifQHxCV9-).

<br>

I love to build low-level \*nix apps, security training tools, websites—and just about everything in between. I primarily write code in JavaScript (TypeScript), Rust, and C. In my free time, I enjoy playing tennis & basketball and listening to music.

<br>

[Blog](/blog) · [GitHub](https://github.com/safinsingh) · [LinkedIn](https://www.linkedin.com/in/safinsingh/)

<style>
    #img_container {
        background-color: #81c0cb;
    }
    #img_container, img {
        width: 200px;
        height: 200px
    }
    img {
        transition: all 0.2s
    }
    h1 {
        margin: 10px 0;
    }
</style>

<script>
    const image = document.getElementById("profile");
    image.addEventListener("load", () => image.style.opacity = "1");
</script>