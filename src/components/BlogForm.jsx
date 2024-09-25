import React from "react";

const BlogForm = (props) => {
	return (
		<div>
			<form onSubmit={props.handleAddBlog}>
				<div>
					Title:
					<input value={props.newTitle} onChange={props.handleTitleChange} />
				</div>
				<div>
					Author:
					<input value={props.newAuthor} onChange={props.handleAuthorChange} />
				</div>
				<div>
					URL:
					<input value={props.newUrl} onChange={props.handleUrlChange} />
				</div>
				<button type="submit">create</button>
			</form>
		</div>
	);
};

export default BlogForm;
