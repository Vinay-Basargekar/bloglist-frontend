import { useState, useEffect } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import loginService from "./services/login";
import Notification from "./components/Notification";
import BlogForm from "./components/BlogForm";

const App = () => {
	const [blogs, setBlogs] = useState([]);
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [user, setUser] = useState(null);

	const [newTitle, setNewTitle] = useState("");
	const [newAuthor, setNewAuthor] = useState("");
	const [newUrl, setNewUrl] = useState("");
	const [notification, setNotification] = useState({ message: null, type: "" });
	const [blogVisible, setBlogVisible] = useState(false);

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
		<form onSubmit={handleLogin} className="space-y-4">
			<div>
				<label className="block mb-2 font-bold">Username</label>
				<input
					type="text"
					value={username}
					name="Username"
					onChange={({ target }) => setUsername(target.value)}
					className="w-full p-2 border rounded"
				/>
			</div>
			<div>
				<label className="block mb-2 font-bold">Password</label>
				<input
					type="password"
					value={password}
					name="Password"
					onChange={({ target }) => setPassword(target.value)}
					className="w-full p-2 border rounded"
				/>
			</div>
			<button
				type="submit"
				className="bg-blue-500 text-white py-2 px-4 rounded"
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
			url: newUrl,
			likes: 0,
		};

		blogService
			.create(blogObject)
			.then((returnedBlog) => {
				setBlogs(blogs.concat(returnedBlog));
				setNewTitle("");
				setNewAuthor("");
				setNewUrl("");
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
		const hideWhenVisible = { display: blogVisible ? "none" : "" };
		const showWhenVisible = { display: blogVisible ? "" : "none" };

		return (
			<div>
				<div style={hideWhenVisible}>
					<button
						className="bg-green-500 text-white py-2 px-4 rounded"
						onClick={() => setBlogVisible(true)}
					>
						New Blog
					</button>
				</div>
				<div style={showWhenVisible}>
					<BlogForm
						newTitle={newTitle}
						newAuthor={newAuthor}
						newUrl={newUrl}
						handleTitleChange={({ target }) => setNewTitle(target.value)}
						handleAuthorChange={({ target }) => setNewAuthor(target.value)}
						handleUrlChange={({ target }) => setNewUrl(target.value)}
						handleAddBlog={addBlog}
					/>
					<button
						className="bg-red-500 text-white py-2 px-4 rounded mt-4"
						onClick={() => setBlogVisible(false)}
					>
						Cancel
					</button>
				</div>
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
		<div className="max-w-4xl mx-auto p-4">
			<Notification message={notification.message} type={notification.type} />
			{user === null ? (
				loginForm()
			) : (
				<div>
					<div className="flex justify-between">
						<h2 className="text-2xl font-bold mb-4">Blogs</h2>
						<div className="flex-col">
							<p>{user.name} logged-in</p>
							<button
								type="button"
								className="bg-gray-800 text-white py-2 px-4 rounded mt-2"
								onClick={handleLogout}
							>
								Log out
							</button>
						</div>
					</div>
					<div className="my-6">
						<h2 className="text-xl font-bold mb-4">Create New</h2>
						{blogForm()}
					</div>
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
			)}
		</div>
	);
};

export default App;
