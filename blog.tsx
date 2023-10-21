import type { PageData } from "lume/core.ts";

export const layout = "layout.njk";

export default function ({ search }: PageData) {
	const posts = search.pages("layout=blog.njk");

	return (
		<>
			<h1>Posts</h1>
			{posts.filter(Boolean).map((post) => (
				<>
					<a href={post!.data.url} target="_self">
						{post!.data.title}
					</a>
					<span className="muted"> · {post!.data.description}</span>
					<br />
				</>
			))}
			<br />
			<a href="/" className="go_back" target="_self">
				Go back
			</a>
		</>
	);
}
