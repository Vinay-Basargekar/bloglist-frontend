import React from "react";
import { Link } from "react-router-dom";

const Breadcrumb = ({ paths }) => {
	return (
		<div className="container mx-auto pt-4">
			<nav className="flex items-center space-x-1 mb-2 text-gray-600">
				{paths.map((path, index) => (
					<React.Fragment key={index}>
						<Link
							to={path.link}
							className="hover:text-pink-500 transition-colors font-medium"
						>
							{path.name}
						</Link>
						{index < paths.length - 1 && (
							<span className="text-gray-400">/</span>
						)}
					</React.Fragment>
				))}
			</nav>
		</div>
	);
};

export default Breadcrumb;
