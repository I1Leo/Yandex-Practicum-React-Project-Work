import { createSlice, nanoid, PayloadAction } from '@reduxjs/toolkit';
import { TIngredients } from './burger-ingredients';

type TInitialState = {
	bun: TIngredients | null;
	constructorIngredients: TIngredients[];
};

const initialState: TInitialState = {
	bun: null,
	constructorIngredients: [],
};

export type TConstructorIngredient = TIngredients & {
	key?: string
};

export const constructorIngredientsSlice = createSlice({
	name: 'constructorIngredients',
	initialState,
	reducers: {
		addBun(state, action: PayloadAction<TIngredients>) {
			state.bun = action.payload;
		},
		addIngredient: {
			reducer: (state, action: PayloadAction<TConstructorIngredient>) => {
				state.constructorIngredients = [
					...state.constructorIngredients,
					action.payload,
				];
			},
			prepare: (item: TIngredients) => {
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
					(item : TConstructorIngredient) => item.key !== action.payload
				),
			];
		},
		setIngredients(state, action: PayloadAction<TConstructorIngredient[]>) {
			state.constructorIngredients = action.payload;
		},
		resetIngredients(state) {
			state.bun = null;
			state.constructorIngredients = [];
		},
	},
});
