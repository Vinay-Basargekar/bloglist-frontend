import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
	return (
		<div className="container mx-auto">
			<header className="mb-8">
				<h1 className="text-5xl font-bold mb-4">
					Discover Endless Inspiration
				</h1>
				{/* <p className="text-gray-600 text-xl">
					BlogSpace is where ideas come to life! Whether you&apos;re sharing
					stories, exploring new ideas, or diving deep into your passions, this
					is your home for creativity. Join a vibrant community of thinkers and
					writers.
				</p> */}
			</header>

			<div className="relative">
				<img
					src="https://images.unsplash.com/photo-1499728603263-13726abce5fd?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
					alt="Background"
					className="w-full h-96 object-cover"
				/>
			</div>

			<section className="mt-4">
				<h2 className="text-4xl font-semibold mb-4">Why Blog with Us?</h2>
				<p className="text-gray-600 text-lg">
					BlogSpace is where ideas come to life! Whether you&apos;re sharing
					stories, exploring new ideas, or diving deep into your passions, this
					is your home for creativity. Join a vibrant community of thinkers and
					writers.
				</p>
				<p className="mt-4 text-gray-600 text-lg">
					Here, you can also discover blogs from various categories like
					technology, lifestyle, self-growth, and much more. Every blog
					contributes to a richer experience. Stay inspired, learn new things,
					and take part in meaningful conversations!
				</p>
			</section>

			<section className="mt-8">
				<h2 className="text-4xl font-semibold mb-4">Featured Blogs</h2>
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
					<div className="bg-white rounded-lg shadow p-4 cursor-pointer">
						<Link to="https://mnsh.me/blog/reading-books">
							<img
								src="https://mnsh.me/_next/image?url=https%3A%2F%2Ffirebasestorage.googleapis.com%2Fv0%2Fb%2Fmnsh-b3e89.appspot.com%2Fo%2FInstagram%2520post%2520-%2520118.png%3Falt%3Dmedia%26token%3Da15a6a86-df8d-489a-a787-715faf18f525&w=3840&q=75"
								alt="Reading Good Books"
								className="w-full h-96 object-cover rounded-3xl"
							/>
							<h3 className="text-xl font-semibold mt-2">Reading Good Books</h3>
							<p className="text-gray-500 inline-block">Feb 22, 2021</p>
						</Link>
					</div>
					<div className="bg-white rounded-lg shadow p-4 cursor-pointer">
						<Link to="https://mnsh.me/blog/false-beliefs">
							<img
								src="https://mnsh.me/_next/image?url=https%3A%2F%2Ffirebasestorage.googleapis.com%2Fv0%2Fb%2Fmnsh-b3e89.appspot.com%2Fo%2Fmaxim-berg-H2CSTaboiy0-unsplash.jpg%3Falt%3Dmedia%26token%3De3a16983-70fe-4e66-823b-2b07ab6ee433&w=3840&q=75"
								alt="False Beliefs"
								className="w-full h-96 object-cover rounded-3xl"
							/>
							<h3 className="text-xl font-semibold mt-2">False Beliefs</h3>
							<p className="text-gray-500 inline-block">Oct 22, 2022</p>
						</Link>
					</div>
				</div>
			</section>
		</div>
	);
};

export default Home;
