const Profile = ({ user }) => {
	if (!user) {
		return <p>You need to log in to view your profile.</p>;
	}

	return (
		<div>
			<h1>User Profile</h1>
			<p>
				<strong>Name:</strong> {user.name}
			</p>
			<p>
				<strong>Username:</strong> {user.username}
			</p>
		</div>
	);
};

export default Profile;
