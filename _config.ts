import lume from "lume/mod.ts";
import nunjucks from "lume/plugins/nunjucks.ts";
import sass from "lume/plugins/sass.ts";
import jsx from "lume/plugins/jsx.ts";
import code_highlight from "lume/plugins/code_highlight.ts";
import mark from "npm:markdown-it-mark";

const site = lume({}, { markdown: { plugins: [mark] } })
  .use(nunjucks())
  .use(sass())
  .use(jsx())
  .use(code_highlight());

site.copy("fonts");
site.copy("images");
site.copy("favicon.ico");

site.add("/styles");

export default site;
