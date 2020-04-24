import axios from "axios";
const baseUrl = "http://localhost:5000";

// New User Registration

export const register = newUser => {
  return axios
    .post(`${baseUrl}/api/register`, {
		name: newUser.name,
      email: newUser.email,
      password: newUser.password
    })
	.then(response => {
		return response.data
	})
	.catch(err => Promise.reject(err));
};

// Current User Login

export const login = user => {
	return axios.post(`${baseUrl}/api/login`, { email: user.email, password: user.password })
		.then(response => {
			localStorage.setItem('x-access-token', response.data.token);
			localStorage.setItem('x-access-token-expiration', Date.now() + 2 * 60 * 60 * 1000);
			return response.data
		})
		.catch(err => Promise.reject('Authentication Failed!'));
}

export const isAuthenticated = () => {
	return localStorage.getItem('x-access-token') && localStorage.getItem('x-access-token-expiration') > Date.now()
}


export const getProducts = () => {
	return axios.get(`${baseUrl}/api/products`)
		.then(response => response.data);
}

export const getCartProducts = user => {
	return axios.post(`${baseUrl}/api/get-cart`, {user_id: user})
		.then(response => response.data);
}

export const updateCartProducts = cart => {
	return axios.post(`${baseUrl}/api/update-cart`, {cart})
		.then(response => response.data);
}

