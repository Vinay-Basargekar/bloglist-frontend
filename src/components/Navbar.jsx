import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignOutAlt, faKeyboard } from "@fortawesome/free-solid-svg-icons";
import Avatar from "boring-avatars";
import { Link } from "react-router-dom";

const Navbar = ({ user, handleLogout }) => {
	const [dropdownOpen, setDropdownOpen] = useState(false);

	const toggleDropdown = () => {
		setDropdownOpen(!dropdownOpen);
	};

	return (
		<nav className="bg-black text-white py-3 px-6 shadow-lg">
			<div className="max-w-4xl mx-auto px-4">
				<div className="flex justify-between items-center">
					{/* Left Side: Logo and Icon */}
					<div className="flex items-center space-x-3">
						<FontAwesomeIcon icon={faKeyboard} className="text-white text-xl" />
						<h2 className="text-2xl font-semibold tracking-wide">BlogSpace</h2>
					</div>

					{/* Right Side: Navigation Links and Avatar */}
					<div className="flex items-center space-x-6 ">
						<p className="hover:text-gray-300 transition-all text-xl">
							<Link to="/">Home</Link>
						</p>
						<p className="hover:text-gray-300 transition-all text-xl">
							<Link to="/Blogs">Blogs</Link>
						</p>

						{/* Avatar and Dropdown */}
						<div className="relative">
							<Avatar
								size={40}
								name={user.name}
								variant="beam"
								square
								className="cursor-pointer"
								onClick={toggleDropdown}
							/>

							{dropdownOpen && (
								<div className="absolute right-0 mt-3 w-48 bg-white text-black rounded-md shadow-md">
									<p className="block px-4 py-2 hover:bg-gray-100 cursor-pointer transition-all">
										<Link to="/Profile">{user.name}</Link>
									</p>
									<hr className="my-1" />
									<button
										type="button"
										className="flex items-center space-x-2 px-4 py-2 w-full text-left hover:bg-gray-100 transition-all"
										onClick={handleLogout}
									>
										<FontAwesomeIcon
											icon={faSignOutAlt}
											className="text-gray-600"
										/>
										<span>Log out</span>
									</button>
								</div>
							)}
						</div>
					</div>
				</div>
			</div>
		</nav>
	);
};

export default Navbar;
