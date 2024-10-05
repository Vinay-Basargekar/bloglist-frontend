import React, { useState } from "react";
import blogService from "../services/blogs";

const Blog = ({ blog, handleLikeUpdate, deleteBlogID, user }) => {
	const [visible, setVisible] = useState(false);

	const toggleVisibility = () => {
		setVisible(!visible);
	};

	const likeBlog = async () => {
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
		if (window.confirm(`Remove blog "${blog.title}" by ${blog.author}?`)) {
			deleteBlogID(blog.id);
		}
	};

	return (
		<div className="p-4 border border-gray-300 rounded-lg mb-4">
			<div className="flex justify-between items-center">
				<div>
					<strong>{blog.title}</strong> by {blog.author}
				</div>
				<button
					className="text-blue-500 hover:underline"
					onClick={toggleVisibility}
				>
					{visible ? "Hide" : "View"}
				</button>
			</div>
			{visible && (
				<div className="mt-2">
					<p>
						<strong>URL:</strong>{" "}
						<a
							href={blog.url}
							className="text-blue-600 hover:underline"
							target="_blank"
							rel="noopener noreferrer"
						>
							{blog.url}
						</a>
					</p>
					<p>
						<strong>Likes:</strong> {blog.likes}{" "}
						<button
							className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-700"
							onClick={likeBlog}
						>
							Like
						</button>
					</p>
					<p>
						<strong>Author:</strong> {blog.author}
					</p>
					{user.username === blog.user.username && (
						<button
							className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-700"
							onClick={confirmAndDelete}
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
