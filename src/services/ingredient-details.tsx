import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IngredientsType } from './burger-ingredients';

type InitialStateType = {
	ingredientDetails: IngredientsType | null;
};

const initialState: InitialStateType = {
	ingredientDetails: null,
};

export const ingredientDetailsSlice = createSlice({
	name: 'ingredientDetails',
	initialState,
	reducers: {
		getIngredientDetails(state, action: PayloadAction<IngredientsType>) {
			state.ingredientDetails = action.payload;
		},
	},
});
