import { createSlice, nanoid, PayloadAction } from '@reduxjs/toolkit';
import { IngredientsType } from './burger-ingredients';

type InitialStateType = {
	bun: IngredientsType | null;
	constructorIngredients: IngredientsType[];
};

const initialState: InitialStateType = {
	bun: null,
	constructorIngredients: [],
};

export type ConstructorIngredientType = {
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

export const constructorIngredientsSlice = createSlice({
	name: 'constructorIngredients',
	initialState,
	reducers: {
		addBun(state, action: PayloadAction<IngredientsType>) {
			state.bun = action.payload;
		},
		addIngredient: {
			reducer: (state, action: PayloadAction<ConstructorIngredientType>) => {
				state.constructorIngredients = [
					...state.constructorIngredients,
					action.payload,
				];
			},
			prepare: (item: IngredientsType) => {
				const key = nanoid();
				return {
					payload: {
						...item,
						key,
					},
				};
			},
		},
		deleteIngredient(state, action: PayloadAction<string>) {
			state.constructorIngredients = [
				...state.constructorIngredients.filter(
					(item) => item.key !== action.payload
				),
			];
		},
		setIngredients(state, action: PayloadAction<ConstructorIngredientType[]>) {
			state.constructorIngredients = action.payload;
		},
		resetIngredients(state) {
			state.bun = null;
			state.constructorIngredients = [];
		},
	},
});
