import { useState, useEffect } from "react";
import {
	BrowserRouter as Router,
	Routes,
	Route,
	useLocation,
} from "react-router-dom";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import loginService from "./services/login";
import Notification from "./components/Notification";
import BlogForm from "./components/BlogForm";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Profile from "./components/Profile";
import Breadcrumb from "./components/Breadcrumb";
import Footer from "./components/Footer";
import BlogPage from "./components/BlogPage";
import Modal from "./components/Modal";

const App = () => {
	const [blogs, setBlogs] = useState([]);
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [user, setUser] = useState(null);

	const [newTitle, setNewTitle] = useState("");
	const [newAuthor, setNewAuthor] = useState("");
	const [newContent, setNewContent] = useState("");
	const [notification, setNotification] = useState({ message: null, type: "" });
	const [blogVisible, setBlogVisible] = useState(false);
	const location = useLocation(); // Get current location

	const getBreadcrumbPaths = () => {
		const paths = [{ name: "Home", link: "/" }];

		if (location.pathname === "/Blogs") {
			paths.push({ name: "Blogs", link: "/Blogs" });
		} else if (location.pathname.startsWith("/Blogs/")) {
			const blogId = location.pathname.split("/").pop();
			const blog = blogs.find((b) => b.id.toString() === blogId);
			// console.log("Found Blog:", blog);
			if (blog) {
				paths.push({ name: "Blogs", link: "/Blogs" });
				paths.push({ name: blog.title, link: `/Blogs/${blog.id}` });
			}
		} else if (location.pathname === "/Profile") {
			paths.push({ name: "Profile", link: "/Profile" });
		}

		return paths;
	};

	const displayNotification = (message, type = "success") => {
		setNotification({ message, type });
		setTimeout(() => {
			setNotification({ message: null, type: "" });
		}, 5000);
	};

	useEffect(() => {
		if (user) {
			blogService.getAll().then((blogs) => setBlogs(blogs));
		}
	}, [user]);

	useEffect(() => {
		const loggedUserJSON = window.localStorage.getItem("loggedNoteappUser");
		if (loggedUserJSON) {
			const user = JSON.parse(loggedUserJSON);
			setUser(user);
			blogService.setToken(user.token);
		}
	}, []);

	const handleLogin = async (event) => {
		event.preventDefault();
		try {
			const user = await loginService.login({ username, password });
			window.localStorage.setItem("loggedNoteappUser", JSON.stringify(user));
			blogService.setToken(user.token);
			setUser(user);
			setUsername("");
			setPassword("");
			displayNotification("Logged in successfully!", "success");
		} catch (exception) {
			displayNotification("Wrong credentials", "error");
		}
	};

	const handleLogout = () => {
		window.localStorage.removeItem("loggedNoteappUser");
		setUser(null);
		blogService.setToken(null);
	};

	const loginForm = () => (
		<form
			onSubmit={handleLogin}
			className="space-y-6 bg-white shadow-md px-8 pt-6 pb-8 mb-4"
		>
			<div>
				<label className="block text-gray-700 text-sm font-bold mb-2">
					Username
				</label>
				<input
					type="text"
					value={username}
					name="Username"
					onChange={({ target }) => setUsername(target.value)}
					className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition duration-200"
					placeholder="Enter your username"
				/>
			</div>
			<div>
				<label className="block text-gray-700 text-sm font-bold mb-2">
					Password
				</label>
				<input
					type="password"
					value={password}
					name="Password"
					onChange={({ target }) => setPassword(target.value)}
					className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition duration-200"
					placeholder="Enter your password"
				/>
			</div>
			<button
				type="submit"
				className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-200"
			>
				Login
			</button>
		</form>
	);

	const addBlog = (event) => {
		event.preventDefault();
		const blogObject = {
			title: newTitle,
			author: newAuthor,
			content: newContent,
			likes: 0,
		};

		blogService
			.create(blogObject)
			.then((returnedBlog) => {
				setBlogs(blogs.concat(returnedBlog));
				setNewTitle("");
				setNewAuthor("");
				setNewContent("");
				setBlogVisible(false);
				displayNotification(
					`Blog '${returnedBlog.title}' added successfully!`,
					"success"
				);
			})
			.catch((error) => {
				displayNotification(
					"Failed to add the blog. Please try again.",
					"error"
				);
			});
	};

	const blogForm = () => {
		return (
			<div className="app-container">
				<button
					className="bg-pink-600 text-white py-2 px-4 rounded"
					onClick={() => setBlogVisible(true)}
				>
					New Blog
				</button>

				{/* Render the Modal if blogVisible is true */}
				{blogVisible && (
					<Modal>
						<BlogForm
							newTitle={newTitle}
							newAuthor={newAuthor}
							newContent={newContent}
							handleTitleChange={({ target }) => setNewTitle(target.value)}
							handleAuthorChange={({ target }) => setNewAuthor(target.value)}
							handleContentChange={({ target }) => setNewContent(target.value)}
							handleAddBlog={addBlog}
							onClose={() => setBlogVisible(false)}
						/>
					</Modal>
				)}
			</div>
		);
	};

	const handleLikeUpdate = (updatedBlog) => {
		setBlogs(
			blogs.map((blog) => (blog.id === updatedBlog.id ? updatedBlog : blog))
		);
	};

	const handleDeleteBlog = async (id) => {
		try {
			await blogService.deleteBlog(id);
			setBlogs(blogs.filter((blog) => blog.id !== id));
			displayNotification("Blog removed successfully", "success");
		} catch (error) {
			displayNotification(
				"Failed to delete the blog. Please try again.",
				"error"
			);
		}
	};

	return (
		<div className="flex flex-col min-h-screen ">
			<Notification message={notification.message} type={notification.type} />
			{user === null ? (
				loginForm()
			) : (
				<>
					<Navbar user={user} handleLogout={handleLogout} />
					<div className="flex-grow w-full max-w-4xl mx-auto px-4">
						{" "}
						<Breadcrumb paths={getBreadcrumbPaths()} />
						<Routes>
							<Route path="/" element={<Home />} />
							<Route path="/Blogs/:id" element={<BlogPage />} />
							<Route
								path="/Blogs"
								element={
									<div className="my-6">
										<h2 className="text-xl font-bold mb-4">Create New</h2>
										{blogForm()}
										{blogs
											.sort((a, b) => b.likes - a.likes)
											.map((blog) => (
												<Blog
													key={blog.id}
													blog={blog}
													handleLikeUpdate={handleLikeUpdate}
													deleteBlogID={handleDeleteBlog}
													user={user}
												/>
											))}
									</div>
								}
							/>
							<Route path="/Profile" element={<Profile user={user} />} />
						</Routes>
					</div>
					<Footer />
				</>
			)}
		</div>
	);
};

export default App;
