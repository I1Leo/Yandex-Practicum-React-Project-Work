import BurgerIngredients from '../../components/burger-ingredients/burger-ingredients';
import BurgerConstructor from '../../components/burger-constructor/burger-constructor';
import Modal from '../../components/modal/modal';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import OrderDetails from '../../components/order-details/order-details';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { orderDetailsSlice } from '../../services/order-details';
import s from './main.module.scss';

export default function Main(): JSX.Element {
	const { orderRequest, orderFailed, isOrderDetailsModalActive } =
		useAppSelector((state) => state.root.orderDetails);

	const { deactivateOrderDetailsModal } = orderDetailsSlice.actions;
	const dispatch = useAppDispatch();

	const handleClose = (): void => {
		dispatch(deactivateOrderDetailsModal());
	};

	return (
		<main className={s.main}>
			{orderRequest && isOrderDetailsModalActive && (
				<Modal title='' onClose={handleClose}>
					<p className='text text_type_main-medium'>Оформление заказа...</p>
				</Modal>
			)}
			{!orderRequest && !orderFailed && isOrderDetailsModalActive && (
				<Modal title='' onClose={handleClose}>
					<OrderDetails />
				</Modal>
			)}
			<DndProvider backend={HTML5Backend}>
				<BurgerIngredients />
				<BurgerConstructor />
			</DndProvider>
		</main>
	);
}
