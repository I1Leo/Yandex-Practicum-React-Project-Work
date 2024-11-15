import {
	TForm,
	TLoginForm,
	TResetPasswordForm,
} from '../components/types/auth';
import { BASE_URL } from '../constants';
import { checkResponse, checkSuccess, fetchWithRefresh } from './request';

export const getUser = async () => {
	return await fetchWithRefresh(`${BASE_URL}/auth/user`, {
		method: 'GET',
		mode: 'cors',
		cache: 'no-cache',
		credentials: 'same-origin',
		headers: {
			'Content-Type': 'application/json',
			authorization: localStorage.getItem('accessToken') ?? '',
		},
		redirect: 'follow',
		referrerPolicy: 'no-referrer',
	}).catch(() => {
		localStorage.removeItem('accessToken');
		localStorage.removeItem('refreshToken');
	});
};

export const updateUser = async (form: TForm) => {
	return await fetchWithRefresh(`${BASE_URL}/auth/user`, {
		method: 'PATCH',
		mode: 'cors',
		cache: 'no-cache',
		credentials: 'same-origin',
		headers: {
			'Content-Type': 'application/json',
			authorization: localStorage.getItem('accessToken') ?? '',
		},
		redirect: 'follow',
		referrerPolicy: 'no-referrer',
		body: JSON.stringify(form),
	});
};

export const forgotPassword = async (email: string) => {
	return await fetch(`${BASE_URL}/password-reset`, {
		method: 'POST',
		mode: 'cors',
		cache: 'no-cache',
		credentials: 'same-origin',
		headers: {
			'Content-Type': 'application/json',
		},
		redirect: 'follow',
		referrerPolicy: 'no-referrer',
		body: JSON.stringify({
			email: `${email}`,
		}),
	})
		.then(checkResponse)
		.then(checkSuccess)
		.then(() => {
			localStorage.setItem('resetPassword', 'true');
		});
};

export const resetPassword = async (form: TResetPasswordForm) => {
	return await fetch(`${BASE_URL}/password-reset/reset`, {
		method: 'POST',
		mode: 'cors',
		cache: 'no-cache',
		credentials: 'same-origin',
		headers: {
			'Content-Type': 'application/json',
		},
		redirect: 'follow',
		referrerPolicy: 'no-referrer',
		body: JSON.stringify(form),
	})
		.then(checkResponse)
		.then(checkSuccess)
		.then(() => {
			localStorage.removeItem('resetPassword');
		});
};

export const register = async (form: TForm) => {
	return await fetch(`${BASE_URL}/auth/register`, {
		method: 'POST',
		mode: 'cors',
		cache: 'no-cache',
		credentials: 'same-origin',
		headers: {
			'Content-Type': 'application/json',
		},
		redirect: 'follow',
		referrerPolicy: 'no-referrer',
		body: JSON.stringify(form),
	})
		.then(checkResponse)
		.then(checkSuccess);
};

export const login = async (form: TLoginForm) => {
	return await fetch(`${BASE_URL}/auth/login`, {
		method: 'POST',
		mode: 'cors',
		cache: 'no-cache',
		credentials: 'same-origin',
		headers: {
			'Content-Type': 'application/json',
		},
		redirect: 'follow',
		referrerPolicy: 'no-referrer',
		body: JSON.stringify(form),
	})
		.then(checkResponse)
		.then(checkSuccess)
		.then((data) => {
			localStorage.setItem('accessToken', data.accessToken);
			localStorage.setItem('refreshToken', data.refreshToken);
			return data;
		});
};

export const logout = async () => {
	return await fetch(`${BASE_URL}/auth/logout`, {
		method: 'POST',
		mode: 'cors',
		cache: 'no-cache',
		credentials: 'same-origin',
		headers: {
			'Content-Type': 'application/json',
		},
		redirect: 'follow',
		referrerPolicy: 'no-referrer',
		body: JSON.stringify({
			token: localStorage.getItem('refreshToken'),
		}),
	})
		.then(checkResponse)
		.then(checkSuccess)
		.then(() => {
			localStorage.removeItem('accessToken');
			localStorage.removeItem('refreshToken');
		});
};

export const api = {
	getUser,
	updateUser,
	forgotPassword,
	resetPassword,
	register,
	login,
	logout,
};
