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
	// console.log(response);
	return response.data;
};

const create = async (newObject) => {
	const config = {
		headers: { Authorization: token },
	};

	const response = await axios.post(baseUrl, newObject, config);
	// console.log(response);
	return response.data;
};

const update = async (id, updatedObject) => {
	const config = {
		headers: { Authorization: token },
	};
	const response = await axios.put(`${baseUrl}/${id}`, updatedObject, config);
	// console.log(response);
	return response.data;
};

const deleteBlog = async (id) => {
	const config = {
		headers: { Authorization: token },
	};
	await axios.delete(`${baseUrl}/${id}`, config);
};

export default { getAll, create, setToken, update, deleteBlog };
