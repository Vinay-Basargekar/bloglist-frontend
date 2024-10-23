/* eslint-disable react/no-unescaped-entities */
// import { FaBlog } from "react-icons/fa";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faKeyboard } from "@fortawesome/free-solid-svg-icons";
import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const LoginForm = ({
	username,
	password,
	handleUsernameChange,
	handlePasswordChange,
	handleSubmit,
}) => {
	const [showPassword, setShowPassword] = useState(false);

	const togglePasswordVisibility = () => {
		setShowPassword(!showPassword);
	};

	return (
		<div
			className="flex items-center justify-center min-h-screen bg-cover bg-center"
			style={{
				backgroundImage: "url('/src/images/background.jpg')",
			}}
		>
			<div className="bg-white p-8 rounded shadow-md w-full max-w-md font-light">
				<div className="mb-6 text-center">
					<div className="flex items-center space-x-4 justify-center">
						<FontAwesomeIcon
							icon={faKeyboard}
							className="text-slate-800 text-5xl"
						/>
						{/* <h1 className="text-3xl font-bold">NoteApp</h1>{" "} */}
					</div>
					<h2 className="text-2xl font-semibold mt-4 text-slate-800">
						Welcome
					</h2>
					<p className="text-slate-800">Log in to continue to the app</p>
				</div>
				<form onSubmit={handleSubmit} className="space-y-4">
					<div>
						<input
							className="border border-gray-300 rounded p-3 w-full"
							type="text"
							value={username}
							name="Username"
							placeholder="Username"
							onChange={handleUsernameChange}
						/>
					</div>
					<div className="relative">
						<input
							className="border border-gray-300 rounded p-3 w-full"
							type={showPassword ? "text" : "password"}
							value={password}
							name="Password"
							placeholder="Password"
							onChange={handlePasswordChange}
						/>
						<span
							className="absolute right-3 top-4 cursor-pointer"
							onClick={togglePasswordVisibility}
						>
							{showPassword ? <FaEyeSlash /> : <FaEye />}
						</span>
					</div>
					<button
						type="submit"
						className="bg-slate-800 text-white px-4 py-2 rounded w-full"
					>
						Continue
					</button>
					<div className="text-center">
						<a className="text-sm text-blue-500" href="#">
							Forgot password?
						</a>
					</div>
				</form>
				<div className="mt-6 text-center">
					<p className="text-sm">
						Don't have an account?{" "}
						<a className="text-orange-500" href="#">
							Sign up
						</a>
					</p>
				</div>
			</div>
		</div>
	);
};

export default LoginForm;
