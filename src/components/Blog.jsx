import React, { useState } from "react";
import blogService from "../services/blogs";

const Blog = ({ blog, handleLikeUpdate, deleteBlogID, user }) => {
	const [visible, setVisible] = useState(false);

	const toggleVisibility = () => {
		setVisible(!visible);
	};

	const blogStyle = {
		padding: 10,
		border: "1px solid #ccc",
		marginBottom: 5,
		borderRadius: 5,
	};

	const likeBlog = async () => {
		// console.log("blog", blog);
		const updatedBlog = {
			...blog,
			likes: blog.likes + 1,
			user: blog.user.id,
		};
		try {
			const returnedBlog = await blogService.update(blog.id, updatedBlog);
			handleLikeUpdate(returnedBlog);
		} catch (error) {
			console.error("Error updating likes:", error);
		}
	};

	const confirmAndDelete = async (id) => {
		console.log(id);
		if (window.confirm(`Remove blog "${blog.title}" by ${blog.author}?`)) {
			deleteBlogID(blog.id);
		}
	};

	return (
		<div style={blogStyle}>
			<div>
				<strong>{blog.title}</strong> by {blog.author}{" "}
				<button onClick={toggleVisibility}>{visible ? "Hide" : "View"}</button>
			</div>
			{visible && (
				<div>
					<p>
						<strong>URL:</strong> <a href={blog.url}>{blog.url}</a>
					</p>
					<p>
						<strong>Likes:</strong> {blog.likes}{" "}
						<button onClick={likeBlog}>Like</button>
					</p>
					<p>
						<strong>Author:</strong> {blog.author}
					</p>
					{user.username === blog.user.username && (
						<button
							onClick={confirmAndDelete}
							style={{ backgroundColor: "red", color: "white" }}
						>
							remove
						</button>
					)}
				</div>
			)}
		</div>
	);
};

export default Blog;
