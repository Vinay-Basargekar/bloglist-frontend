import React from "react";

const BlogForm = (props) => {
	return (
		<div className="max-w-lg mx-auto p-4 bg-gray-100 rounded-lg shadow-md">
			<form onSubmit={props.handleAddBlog} className="space-y-4">
				<div>
					<label className="block text-gray-700 font-bold mb-1">Title:</label>
					<input
						className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
						value={props.newTitle}
						onChange={props.handleTitleChange}
					/>
				</div>
				<div>
					<label className="block text-gray-700 font-bold mb-1">Author:</label>
					<input
						className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
						value={props.newAuthor}
						onChange={props.handleAuthorChange}
					/>
				</div>
				<div>
					<label className="block text-gray-700 font-bold mb-1">URL:</label>
					<input
						className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
						value={props.newUrl}
						onChange={props.handleUrlChange}
					/>
				</div>
				<button
					type="submit"
					className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-700 transition duration-300"
				>
					Create
				</button>
			</form>
		</div>
	);
};

export default BlogForm;
