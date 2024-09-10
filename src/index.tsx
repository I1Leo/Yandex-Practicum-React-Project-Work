import { createRoot } from 'react-dom/client';
import { App } from './app';
import './styles.css';
import { combineSlices, configureStore } from '@reduxjs/toolkit';
import { ingredientsSlice } from './services/burger-ingredients';
import { Provider } from 'react-redux';
import { constructorIngredientsSlice } from './services/burger-constructor';
import { ingredientDetailsSlice } from './services/ingredient-details';
import { orderDetailsSlice } from './services/order-details';

const rootReducer = combineSlices(
	ingredientsSlice,
	constructorIngredientsSlice,
	ingredientDetailsSlice,
	orderDetailsSlice
);

const store = configureStore({
	reducer: {
		root: rootReducer,
	},
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

const domNode = document.getElementById('root') as HTMLDivElement;
const root = createRoot(domNode);
root.render(
	<Provider store={store}>
		<App />
	</Provider>
);
