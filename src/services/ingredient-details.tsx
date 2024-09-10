import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IngredientsType } from './burger-ingredients';

type InitialStateType = {
	ingredientDetails: IngredientsType | null;
	isIngredientDetailsModalActive: boolean;
};

const initialState: InitialStateType = {
	ingredientDetails: null,
	isIngredientDetailsModalActive: false,
};

export const ingredientDetailsSlice = createSlice({
	name: 'ingredientDetails',
	initialState,
	reducers: {
		getIngredientDetails(state, action: PayloadAction<IngredientsType>) {
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
