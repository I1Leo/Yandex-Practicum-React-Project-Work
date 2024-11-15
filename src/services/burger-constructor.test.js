import {
	addBun,
	addIngredient,
	constructorIngredientsSlice,
	deleteIngredient,
	initialState,
	resetIngredients,
	setIngredients,
} from './burger-constructor';

const testBun = {
	_id: '643d69a5c3f7b9001cfa093c',
	name: 'Краторная булка N-200i',
	type: 'bun',
	proteins: 80,
	fat: 24,
	carbohydrates: 53,
	calories: 420,
	price: 1255,
	image: 'https://code.s3.yandex.net/react/code/bun-02.png',
	image_mobile: 'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
	image_large: 'https://code.s3.yandex.net/react/code/bun-02-large.png',
	__v: 0,
};

const testIngredient = {
	_id: '643d69a5c3f7b9001cfa0941',
	name: 'Биокотлета из марсианской Магнолии',
	type: 'main',
	proteins: 420,
	fat: 142,
	carbohydrates: 242,
	calories: 4242,
	price: 424,
	image: 'https://code.s3.yandex.net/react/code/meat-01.png',
	image_mobile: 'https://code.s3.yandex.net/react/code/meat-01-mobile.png',
	image_large: 'https://code.s3.yandex.net/react/code/meat-01-large.png',
	__v: 0,
};

describe('constructorIngredientsSlice reducers check', () => {
	it('correct initial state', () => {
		const state = constructorIngredientsSlice.reducer(undefined, {
			type: undefined,
		});
		expect(state).toEqual(initialState);
	});

	it('addBun', () => {
		const action = { type: addBun.type, payload: testBun };

		const state = constructorIngredientsSlice.reducer(initialState, action);

		expect(state).toEqual({ ...initialState, bun: testBun });
	});

	it('addIngredient', () => {
		const action = {
			type: addIngredient.type,
			payload: { ...testIngredient, key: 'test-key' },
		};

		const state = constructorIngredientsSlice.reducer(initialState, action);

		expect(state).toEqual({
			...initialState,
			constructorIngredients: [{ ...testIngredient, key: 'test-key' }],
		});
	});

	it('deleteIngredient', () => {
		const prevState = {
			bun: null,
			constructorIngredients: [{ ...testIngredient, key: 'test-key' }],
		};
		const action = { type: deleteIngredient.type, payload: 'test-key' };

		const state = constructorIngredientsSlice.reducer(prevState, action);

		expect(state).toEqual({ ...initialState, constructorIngredients: [] });
	});

	it('setIngredients', () => {
		const ingredients = [
			{ ...testIngredient, key: 'test-key-1' },
			{ ...testIngredient, key: 'test-key-2' },
		];
		const action = { type: setIngredients.type, payload: ingredients };

		const state = constructorIngredientsSlice.reducer(initialState, action);

		expect(state).toEqual({
			...initialState,
			constructorIngredients: ingredients,
		});
	});

	it('resetIngredients', () => {
		const prevState = {
			bun: testBun,
			constructorIngredients: [{ ...testIngredient, key: 'test-key' }],
		};

		const action = { type: resetIngredients.type };
		const state = constructorIngredientsSlice.reducer(prevState, action);

		expect(state).toEqual(initialState);
	});
});
