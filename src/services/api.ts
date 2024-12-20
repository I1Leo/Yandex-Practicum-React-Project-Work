import { createAction, createAsyncThunk } from '@reduxjs/toolkit';
import { checkResponse, checkSuccess } from '../utils/request';
import { api } from '../utils/api';
import { setIsAuthChecked } from './auth';
import { TForm, TUser } from '../components/types/auth';

export const getIngredients = createAsyncThunk(
	'getIngredients',
	async (url: string) => {
		const response = await fetch(url).then(checkResponse).then(checkSuccess);

		return response.data;
	}
);

export const getOrder = createAsyncThunk(
	'getOrder',
	async ({
		url,
		ingredientsIds,
	}: {
		url: string;
		ingredientsIds: string[];
	}) => {
		const response = await fetch(url, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				authorization: localStorage.getItem('accessToken') ?? '',
			},
			body: JSON.stringify({ ingredients: ingredientsIds }),
		})
			.then(checkResponse)
			.then(checkSuccess);

		return response.order.number;
	}
);

export const getOrderByNumber = createAsyncThunk(
	'getOrderByNumber',
	async (url: string) => {
		const response = await fetch(url, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
			},
		})
			.then(checkResponse)
			.then(checkSuccess);

		return response;
	}
);

export const login = createAsyncThunk('auth/login', api.login);

export const logout = createAsyncThunk('auth/logout', api.logout);

export const setUser = createAction<TUser, 'auth/setUser'>('auth/setUser');

export const checkUserAuth = createAsyncThunk(
	'auth/checkUserAuth',
	async (_, { dispatch }) => {
		if (localStorage.getItem('accessToken')) {
			api
				.getUser()
				.then((user) => {
					dispatch(setUser(user.user));
				})
				.finally(() => dispatch(setIsAuthChecked(true)));
		} else {
			dispatch(setIsAuthChecked(true));
		}
	}
);

export const updateUser = createAsyncThunk(
	'auth/updateUser',
	async (form: TForm) => {
		return api.updateUser(form);
	}
);
