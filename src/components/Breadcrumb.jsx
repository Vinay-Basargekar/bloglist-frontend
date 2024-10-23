import React from "react";
import { Link } from "react-router-dom";

const Breadcrumb = ({ paths }) => {
	return (
		<div className="p-2 shadow bg-white">
			<nav className="flex px-4 max-w-4xl mx-auto text-gray-600">
				{paths.map((path, index) => (
					<React.Fragment key={index}>
						<Link
							to={path.link}
							className="hover:text-pink-500 transition-colors font-medium"
						>
							{path.name}
						</Link>
						{index < paths.length - 1 && (
							<span className="text-gray-400 px-1">/</span>
						)}
					</React.Fragment>
				))}
			</nav>
		</div>
	);
};

export default Breadcrumb;
