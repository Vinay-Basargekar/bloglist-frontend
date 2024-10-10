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
		<div className="p-6 bg-white text-black rounded-lg shadow-md mb-6 hover:bg-gray-100">
			<div className="flex justify-between items-center">
				<div>
					<h3 className="text-xl font-semibold">{blog.title}</h3>
					<p className="text-gray-400">by {blog.author}</p>
				</div>
				<button
					className="text-blue-500 font-semibold hover:underline focus:outline-none"
					onClick={toggleVisibility}
				>
					{visible ? "Hide" : "View"}
				</button>
			</div>

			{visible && (
				<div className="mt-4 space-y-3">
					<p>
						<strong>URL:</strong>{" "}
						<a
							href={blog.url}
							className="text-blue-400 underline hover:text-blue-600 transition"
							target="_blank"
							rel="noopener noreferrer"
						>
							{blog.url}
						</a>
					</p>
					<div className="flex items-center space-x-2">
						<p>
							<strong>Likes:</strong> {blog.likes}
						</p>
						<button
							className="bg-blue-500 text-white px-3 py-1 rounded-lg hover:bg-blue-600 focus:outline-none"
							onClick={likeBlog}
						>
							Like
						</button>
					</div>
					<p>
						<strong>Author:</strong> {blog.author}
					</p>
					{user.username === blog.user.username && (
						<button
							className="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600 focus:outline-none"
							onClick={confirmAndDelete}
						>
							Remove
						</button>
					)}
				</div>
			)}
		</div>
	);
};

export default Blog;
