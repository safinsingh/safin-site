export const layout = "layout.njk";

export default function ({ search }: Lume.Data) {
	const posts = search.pages("layout=blog.njk");

	return (
		<>
			<h1>Posts</h1>
			{posts.filter(Boolean).map((post) => (
				<div key={post.title}>
					<a href={post.url} target="_self">
						{post.title}
					</a>
					<span className="muted"> · {post.description}</span>
					<br />
				</div>
			))}
			<br />
			<a href="/" className="go_back" target="_self">
				Go back
			</a>
		</>
	);
}
