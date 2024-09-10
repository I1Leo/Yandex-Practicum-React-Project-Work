import s from './app.module.scss';
import AppHeader from '../components/app-header/app-header';
import BurgerIngredients from '../components/burger-ingredients/burger-ingredients';
import BurgerConstructor from '../components/burger-constructor/burger-constructor';
import Modal from '../components/modal/modal';
import IngredientDetails from '../components/ingredient-details/ingredient-details';
import { useSelector } from 'react-redux';
import { RootState } from '..';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import OrderDetails from '../components/order-details/order-details';

export const App = () => {
	const { isIngredientDetailsModalActive } = useSelector(
		(state: RootState) => state.root.ingredientDetails
	);
	const { orderRequest, orderFailed, isOrderDetailsModalActive } = useSelector(
		(state: RootState) => state.root.orderDetails
	);

	return (
		<>
			<AppHeader />
			<main className={s.main}>
				{isIngredientDetailsModalActive && (
					<Modal title='Детали ингредиента'>
						<IngredientDetails />
					</Modal>
				)}
				{!orderRequest && !orderFailed && isOrderDetailsModalActive && (
					<Modal title=''>
						<OrderDetails />
					</Modal>
				)}
				<DndProvider backend={HTML5Backend}>
					<BurgerIngredients />
					<BurgerConstructor />
				</DndProvider>
			</main>
		</>
	);
};
