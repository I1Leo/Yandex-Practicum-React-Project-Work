import { useState, useEffect } from 'react';
import s from './app.module.scss';
import AppHeader from '../components/app-header/app-header';
import BurgerIngredients from '../components/burger-ingredients/burger-ingredients';
import BurgerConstructor from '../components/burger-constructor/burger-constructor';
import { BurgerIngredientType } from '../components/burger-ingredients/burger-ingredients-section/burger-ingredients-section';
import Modal from '../components/modal/modal';
import IngredientDetails from '../components/ingredient-details/ingredient-details';
import OrderDetails from '../components/order-details/order-details';
import ModalOverlay from '../components/modal-overlay/modal-overlay';

export const App = () => {
	const [burgerIngredients, setBurgerIngridents] = useState<
		BurgerIngredientType[]
	>([]);
	const [activeIngredient, setActiveIngredient] = useState('');
	const [isModalActive, setIsModalActive] = useState(false);
	const [modalType, setModalType] = useState('ingredient');

	const url = 'https://norma.nomoreparties.space/api/ingredients';

	const handleActiveIngredient = (ingredientName: string) => {
		setActiveIngredient(ingredientName);
		setIsModalActive(true);
		setModalType('ingredient');
	};

	const handleOrder = () => {
		setIsModalActive(true);
		setModalType('order');
	};

	useEffect(() => {
		fetch(url)
			.then((res) => {
				if (!res.ok) {
					throw new Error(`${res.status}`);
				}
				return res.json();
			})
			.then((data) => {
				setBurgerIngridents(data.data);
			})
			.catch((e) => console.error(e));
	}, []);

	return (
		<>
			<AppHeader />
			<main className={s.main}>
				{isModalActive && (
					<>
						<ModalOverlay onChange={setIsModalActive} />
						<Modal
							onChange={setIsModalActive}
							title={modalType === 'ingredient' ? 'Детали ингредиента' : ''}>
							{modalType === 'ingredient' ? (
								<IngredientDetails
									ingredient={burgerIngredients.find(
										(ingredient) => ingredient.name === activeIngredient
									)}
								/>
							) : (
								<OrderDetails />
							)}
						</Modal>
					</>
				)}
				<BurgerIngredients
					ingredients={burgerIngredients}
					onChange={handleActiveIngredient}
				/>
				<BurgerConstructor
					ingredients={burgerIngredients}
					onChange={handleOrder}
				/>
			</main>
		</>
	);
};
