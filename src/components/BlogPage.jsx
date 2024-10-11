import { useParams } from "react-router-dom";
import blogService from "../services/blogs";
import { useState, useEffect } from "react";

const BlogPage = () => {
	const { id } = useParams(); // Get the blog ID from the URL
	const [blog, setBlog] = useState(null);

	useEffect(() => {
		const fetchBlog = async () => {
			const fetchedBlog = await blogService.getById(id);
			setBlog(fetchedBlog);
		};

		fetchBlog();
	}, [id]);

	if (!blog) return <p className="text-center text-gray-500">Loading...</p>;

	// Convert newlines (\n) in content to <br> for line breaks
	const formattedContent = blog.content.replace(/\n/g, "<br>");

	return (
		<div className="px-4 sm:px-6 lg:px-8">
			{" "}
			{/* Responsive padding for different screen sizes */}
			<div className="max-w-4xl mx-auto p-4 lg:px-28 bg-white shadow-lg rounded-lg mt-10">
				{" "}
				{/* Adjust width for mobile */}
				<h1 className="text-3xl sm:text-4xl lg:text-6xl font-bold mb-4 text-gray-800">
					{blog.title}
				</h1>
				<p className="text-gray-600 mb-2 text-sm sm:text-base lg:text-lg">
					By {blog.author}
				</p>
				<div
					className="text-base sm:text-lg lg:text-xl text-gray-700 leading-relaxed white-space-pre-line"
					dangerouslySetInnerHTML={{ __html: formattedContent }} // This renders the content with line breaks
				></div>
			</div>
		</div>
	);
};

export default BlogPage;
