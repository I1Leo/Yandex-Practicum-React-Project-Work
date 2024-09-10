import { createAsyncThunk } from '@reduxjs/toolkit';

export const getIngredients = createAsyncThunk(
	'getIngredients',
	async (url: string) => {
		try {
			const response = await fetch(url);

			if (!response.ok) {
				throw new Error(`${response.status}`);
			}

			const data = await response.json();

			if (data && data.success) {
				return data.data;
			} else {
				throw new Error('Data error');
			}
		} catch (error) {
			console.error(error);
			return null;
		}
	}
);

export const getOrder = createAsyncThunk(
	'getOrder',
	async (
		{ url, ingredientsIds }: { url: string; ingredientsIds: string[] },
		thunkAPI
	) => {
		try {
			const response = await fetch(url, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ ingredients: ingredientsIds }),
			});

			if (!response.ok) {
				throw new Error(`${response.status}`);
			}

			const data = await response.json();

			if (data && data.success) {
				return data.order.number;
			} else {
				throw new Error('Data error');
			}
		} catch (error) {
			return thunkAPI.rejectWithValue(error);
		}
	}
);
