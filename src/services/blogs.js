import axios from "axios";
const baseUrl = "/api/blogs";

let token = null;

const setToken = (newToken) => {
	token = `Bearer ${newToken}`;
};

const getAll = async () => {
	const config = {
		headers: { Authorization: token },
	};

	const response = await axios.get(baseUrl, config);
  console.log(response);
	return response.data;
};

export default { getAll, setToken };
