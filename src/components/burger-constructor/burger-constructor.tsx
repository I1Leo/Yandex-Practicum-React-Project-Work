import {
	Button,
	CurrencyIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import s from './burger-constructor.module.scss';
import BurgerConstructorItem from './burger-constructor-item/burger-constructor-item';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../..';
import { useDrop } from 'react-dnd';
import {
	ConstructorIngredientType,
	constructorIngredientsSlice,
} from '../../services/burger-constructor';
import { useCallback, useMemo } from 'react';
import { getOrder } from '../../services/api';
import { orderDetailsSlice } from '../../services/order-details';
import { IngredientsType } from '../../services/burger-ingredients';

export default function BurgerConstructor() {
	const { bun, constructorIngredients } = useSelector(
		(state: RootState) => state.root.constructorIngredients
	);

	const dispatch = useDispatch<AppDispatch>();
	const { addBun, addIngredient, setIngredients, resetIngredients } =
		constructorIngredientsSlice.actions;
	const { activateOrderDetailsModal } = orderDetailsSlice.actions;

	const [{ isOver, draggingItem }, dropRef] = useDrop({
		accept: 'ingredient',
		drop: (item: { ingredient: IngredientsType }) => {
			if (item.ingredient.type === 'bun') {
				dispatch(addBun(item.ingredient));
			} else {
				dispatch(addIngredient(item.ingredient));
			}
		},
		collect: (monitor) => ({
			isOver: monitor.isOver(),
			draggingItem: monitor.getItem(),
		}),
	});

	const moveIngredient = useCallback(
		(dragIndex: number, hoverIndex: number) => {
			const updatedIngredients = [...constructorIngredients];
			updatedIngredients.splice(
				hoverIndex,
				0,
				updatedIngredients.splice(dragIndex, 1)[0]
			);
			dispatch(setIngredients(updatedIngredients));
		},
		[constructorIngredients, dispatch]
	);

	const renderItem = useCallback(
		(ingredient: ConstructorIngredientType, index: number) => {
			return (
				<BurgerConstructorItem
					key={ingredient.key}
					ingredient={ingredient}
					index={index}
					moveIngredient={moveIngredient}
				/>
			);
		},
		[moveIngredient]
	);

	const totalPrice = useMemo(() => {
		if (bun) {
			return [bun, ...constructorIngredients, bun].reduce(
				(sum, curr) => sum + curr.price,
				0
			);
		} else {
			return [...constructorIngredients].reduce(
				(sum, curr) => sum + curr.price,
				0
			);
		}
	}, [bun, constructorIngredients]);

	const bunPlaceholderBorder = {
		border:
			isOver && draggingItem.ingredient.type === 'bun'
				? '2px solid #524EFF'
				: 'none',
	};
	const ingredientPlaceholderBorder = {
		border:
			isOver && draggingItem.ingredient.type !== 'bun'
				? '2px solid #524EFF'
				: 'none',
	};

	const url = 'https://norma.nomoreparties.space/api/orders';

	const ingredientsIds = useMemo(() => {
		if (bun) {
			return [bun, ...constructorIngredients, bun].map((item) => item._id);
		} else {
			return [...constructorIngredients].map((item) => item._id);
		}
	}, [bun, constructorIngredients]);

	const handleClick = () => {
		dispatch(getOrder({ url, ingredientsIds }));
		dispatch(activateOrderDetailsModal());
		dispatch(resetIngredients());
	};

	return (
		<div className={`pt-25 pr-4 pl-4 ${s.container}`}>
			{
				<ul className={`${s.constructor_list}`} ref={dropRef}>
					{bun ? (
						<BurgerConstructorItem type='top' ingredient={bun} />
					) : (
						<li className='pl-8'>
							<div
								className={`pt-4 pr-8 pb-4 pl-6 ${s.placeholder} ${s.bun_top}`}
								style={bunPlaceholderBorder}>
								<p className='text text_type_main-medium'>Выберите булку</p>
							</div>
						</li>
					)}
					<li
						className={`${constructorIngredients.length === 0 ? 'pl-8' : ''}`}>
						{constructorIngredients.length > 0 ? (
							<ul className={s.sublist}>
								{constructorIngredients.map((ingredient, index) =>
									renderItem(ingredient, index)
								)}
							</ul>
						) : (
							<div
								className={`pt-4 pr-8 pb-4 pl-6 ${s.placeholder}`}
								style={ingredientPlaceholderBorder}>
								<p className='text text_type_main-medium'>Выберите начинку</p>
							</div>
						)}
					</li>
					{bun ? (
						<BurgerConstructorItem type='bottom' ingredient={bun} />
					) : (
						<li className='pl-8'>
							<div
								className={`pt-4 pr-8 pb-4 pl-6 ${s.placeholder} ${s.bun_bottom}`}
								style={bunPlaceholderBorder}>
								<p className='text text_type_main-medium'>Выберите булку</p>
							</div>
						</li>
					)}
				</ul>
			}
			<div className={`pt-10 ${s.total}`}>
				<div className={`pr-10 ${s.price_container}`}>
					<p className='text text_type_digits-medium'>{totalPrice}</p>
					<CurrencyIcon type='primary' />
				</div>
				<Button
					htmlType='button'
					type='primary'
					size='large'
					onClick={() => handleClick()}>
					Оформить заказ
				</Button>
			</div>
		</div>
	);
}
