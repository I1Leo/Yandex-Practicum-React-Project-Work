import { createRoot } from 'react-dom/client';
import { App } from './app';
import './styles.css';
import { combineSlices, configureStore } from '@reduxjs/toolkit';
import { ingredientsSlice } from './services/burger-ingredients';
import { Provider } from 'react-redux';
import { constructorIngredientsSlice } from './services/burger-constructor';
import { ingredientDetailsSlice } from './services/ingredient-details';
import { orderDetailsSlice } from './services/order-details';
import { BrowserRouter as Router } from 'react-router-dom';
import { authSlice } from './services/auth';

const rootReducer = combineSlices(
	ingredientsSlice,
	constructorIngredientsSlice,
	ingredientDetailsSlice,
	orderDetailsSlice,
	authSlice
);

export const store = configureStore({
	reducer: {
		root: rootReducer,
	},
});

const domNode = document.getElementById('root') as HTMLDivElement;
const root = createRoot(domNode);
root.render(
	<Router>
		<Provider store={store}>
			<App />
		</Provider>
	</Router>

);
