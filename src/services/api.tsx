import { createAction, createAsyncThunk } from '@reduxjs/toolkit';
import { checkResponse, checkSuccess } from '../utils/request';
import { api, TLoginForm, TForm, TRegisterResponse } from '../utils/api';
import { setIsAuthChecked } from './auth';

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
				authorization: localStorage.getItem('accessToken') ?? ''
			},
			body: JSON.stringify({ ingredients: ingredientsIds }),
		})
			.then(checkResponse)
			.then(checkSuccess);

		return response.order.number;
	}
);

export const login = createAsyncThunk (
	'auth/login',
	async (form: TLoginForm)  => {
		return api.login(form)
	}
)

export const logout = createAsyncThunk (
	'auth/logout',
	async () => {
		return api.logout()
	}
)

export const setUser = createAction <Partial<TRegisterResponse>>("auth/setUser");

export const checkUserAuth = createAsyncThunk(
    "auth/checkUserAuth",
    async (_, { dispatch }) => {
        if (localStorage.getItem("accessToken")) {
            api.getUser()
                .then(user => {
						dispatch(setUser(user.user))
					 })
                .finally(() => dispatch(setIsAuthChecked(true)));
        } else {
            dispatch(setIsAuthChecked(true));
        }
    }
)

export const updateUser = createAsyncThunk(
	"auth/updateUser",
	async (form: TForm) => {
		return api.updateUser(form);
	}
)