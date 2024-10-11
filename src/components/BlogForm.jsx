import React from "react";

const BlogForm = (props) => {
	return (
		<div className="relative max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-md border border-gray-300">
			<button
				className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
				onClick={props.onClose}
			>
				✖️
			</button>
			<form onSubmit={props.handleAddBlog} className="space-y-6">
				<div>
					<label className="block text-gray-700 font-semibold mb-1">
						Title:
					</label>
					<input
						className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
						type="text"
						value={props.newTitle}
						onChange={props.handleTitleChange}
						placeholder="Enter blog title"
						required
					/>
				</div>
				<div>
					<label className="block text-gray-700 font-semibold mb-1">
						Author:
					</label>
					<input
						className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
						type="text"
						value={props.newAuthor}
						onChange={props.handleAuthorChange}
						placeholder="Enter author name"
						required
					/>
				</div>
				<div>
					<label className="block text-gray-700 font-semibold mb-1">
						Content:
					</label>
					<textarea
						className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 h-48 resize-none"
						value={props.newContent}
						onChange={props.handleContentChange}
						placeholder="Write your blog content here..."
						required
					/>
				</div>
				<button
					type="submit"
					className="w-full bg-pink-600 text-white p-3 rounded-lg hover:bg-blue-700 transition duration-300"
				>
					Create Blog
				</button>
			</form>
		</div>
	);
};

export default BlogForm;
