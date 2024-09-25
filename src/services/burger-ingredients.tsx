import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getIngredients } from './api';

export type IngredientsType = {
	_id: string;
	name: string;
	type: string;
	proteins: number;
	fat: number;
	carbohydrates: number;
	calories: number;
	price: number;
	image: string;
	image_mobile: string;
	image_large: string;
	__v: number;
	key?: string;
};

type InitialStateType = {
	ingredientsRequest: boolean;
	ingredientsFailed: boolean;
	ingredients: IngredientsType[];
};

const initialState: InitialStateType = {
	ingredientsRequest: false,
	ingredientsFailed: false,
	ingredients: [],
};

export const ingredientsSlice = createSlice({
	name: 'ingredients',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(getIngredients.pending, (state) => {
				state.ingredientsRequest = true;
				state.ingredientsFailed = false;
			})
			.addCase(
				getIngredients.fulfilled,
				(state, action) => {
					const ingredientsData = action.payload as IngredientsType[];
					state.ingredientsRequest = false;
					state.ingredients = ingredientsData;
				}
			)
			.addCase(getIngredients.rejected, (state) => {
				state.ingredientsRequest = false;
				state.ingredientsFailed = true;
			});
	},
});
