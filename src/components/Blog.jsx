import React, { useState } from "react";
import { AiFillHeart, AiFillDelete } from "react-icons/ai";
import { Link } from "react-router-dom";
import blogService from "../services/blogs";

const Blog = ({ blog, handleLikeUpdate, deleteBlogID, user }) => {
	const [liked, setLiked] = useState(false);

	const likeBlog = async () => {
		const updatedBlog = {
			...blog,
			likes: blog.likes + (liked ? -1 : +1),
			user: blog.user.id,
		};
		try {
			const returnedBlog = await blogService.update(blog.id, updatedBlog);
			handleLikeUpdate(returnedBlog);
			setLiked(!liked);
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
		<div>
			<div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-1 gap-6 mt-4">
				<Link to={`/Blogs/${blog.id}`} state={{ blog }}>
					<div className="relative -z-10 bg-white rounded-3xl shadow p-4 pr-8 cursor-pointer ">
						<img
							src="https://mnsh.me/_next/image?url=https%3A%2F%2Ffirebasestorage.googleapis.com%2Fv0%2Fb%2Fmnsh-b3e89.appspot.com%2Fo%2Frenato-ramos-puma-FwMC5JJxt6k-unsplash.jpg%3Falt%3Dmedia%26token%3Df472b9ac-04e0-46ad-a72b-b6ae1868d4e3&w=3840&q=75"
							alt={blog.title}
							className="w-full h-80 object-cover rounded-3xl"
						/>
						<div className="flex justify-between">
							<div>
								<h3 className="text-xl font-semibold mt-2">{blog.title}</h3>
								<p className="text-gray-500 inline-block">by {blog.author}</p>
							</div>
							<div className="flex items-center space-x-2">
								<AiFillHeart
									onClick={(e) => {
										e.preventDefault(); // Prevents the click from triggering the link
										likeBlog();
									}}
									size={28}
									className={`cursor-pointer transition-transform duration-300 ${
										liked ? "text-pink-600 scale-125" : "text-gray-400"
									}`}
								/>
								<p>{blog.likes}</p>
							</div>
						</div>
						{/* Delete Button (Only if User Owns the Blog) */}
						{user.username === blog.user.username && (
							<button
								className="absolute top-4 right-1 text-pink-600 hover:text-pink-700 focus:outline-none"
								onClick={(e) => {
									e.preventDefault(); // Prevents the click from triggering the link
									confirmAndDelete(blog.id);
								}}
							>
								<AiFillDelete size={24} />
							</button>
						)}
					</div>
				</Link>
			</div>
		</div>
	);
};

export default Blog;