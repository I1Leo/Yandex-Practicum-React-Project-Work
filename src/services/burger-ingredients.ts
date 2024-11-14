import { createSlice } from '@reduxjs/toolkit';
import { getIngredients } from './api';
import { TIngredients } from '../components/types/ingredients';

type TInitialState = {
	ingredientsRequest: boolean;
	ingredientsFailed: boolean;
	ingredients: TIngredients[];
};

export const initialState: TInitialState = {
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
			.addCase(getIngredients.fulfilled, (state, action) => {
				const ingredientsData = action.payload as TIngredients[];
				state.ingredientsRequest = false;
				state.ingredients = ingredientsData;
			})
			.addCase(getIngredients.rejected, (state) => {
				state.ingredientsRequest = false;
				state.ingredientsFailed = true;
			});
	},
});

export  { getIngredients } 