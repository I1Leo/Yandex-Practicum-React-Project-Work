import { createAsyncThunk } from '@reduxjs/toolkit';
import { checkResponse, checkSuccess } from '../utils/request';

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
			},
			body: JSON.stringify({ ingredients: ingredientsIds }),
		})
			.then(checkResponse)
			.then(checkSuccess);

		return response.order.number;
	}
);
