export const layout = "layout.njk";

export default function ({ search }: Lume.Data) {
	const posts = search.pages("layout=blog.njk");

	return (
		<>
			<div id="v">
				<div id="circle"></div>
				<h1>Posts</h1>
			</div>
			<div className="mb-20">
				{posts.filter(Boolean).sort((a, b) => b.date.getTime() - a.date.getTime()).map((post) => (
					<div key={post.title}>
						<a href={post.url} target="_self">
							{post.title}
						</a>
						<span className="muted"> · {post.description}</span>
						<br />
					</div>
				))}
			</div>
			<div className="meta-links">
				<a href="/" className="go_back" target="_self">
					Go back
				</a>
			</div>
		</>
	);
}
