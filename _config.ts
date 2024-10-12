import lume from "lume/mod.ts";
import nunjucks from "lume/plugins/nunjucks.ts";
import sass from "lume/plugins/sass.ts";
import jsx from "lume/plugins/jsx.ts";
import code_highlight from "lume/plugins/code_highlight.ts";

const site = lume()
	.use(nunjucks())
	.use(sass())
	.use(jsx())
	.use(code_highlight({ extensions: [".md"] }));

site.copy("fonts");
site.copy("images");
site.copy("favicon.ico");

export default site;
