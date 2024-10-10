import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TIngredients } from './burger-ingredients';

type TInitialState = {
	ingredientDetails: TIngredients | null;
	isIngredientDetailsModalActive: boolean;
};

const initialState: TInitialState = {
	ingredientDetails: null,
	isIngredientDetailsModalActive: false,
};

export const ingredientDetailsSlice = createSlice({
	name: 'ingredientDetails',
	initialState,
	reducers: {
		getIngredientDetails(state, action: PayloadAction<TIngredients>) {
			state.ingredientDetails = action.payload;
		},
		activateIngredientsDetailsModal(state) {
			state.isIngredientDetailsModalActive = true;
		},
		deactivateIngredientsDetailsModal(state) {
			state.isIngredientDetailsModalActive = false;
		},
	},
});
