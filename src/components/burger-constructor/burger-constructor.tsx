import {
	Button,
	CurrencyIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import s from './burger-constructor.module.scss';
import BurgerConstructorItem from './burger-constructor-item/burger-constructor-item';
import { useDrop } from 'react-dnd';
import {
	constructorIngredientsSlice,
} from '../../services/burger-constructor';
import { useCallback, useMemo } from 'react';
import { getOrder } from '../../services/api';
import { orderDetailsSlice } from '../../services/order-details';
import { BASE_URL } from '../../constants';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { useNavigate } from 'react-router-dom';
import { TConstructorIngredient, TIngredients } from '../types/ingredients';

export default function BurgerConstructor() : JSX.Element {
	const { bun, constructorIngredients } = useAppSelector(
		(state) => state.root.constructorIngredients
	);

	const dispatch = useAppDispatch();
	const { addBun, addIngredient, setIngredients, resetIngredients } =
		constructorIngredientsSlice.actions;
	const { activateOrderDetailsModal } = orderDetailsSlice.actions;

	const user = useAppSelector(state => state.root.auth.user)

	const [{ isOver, draggingItem }, dropRef] = useDrop({
		accept: 'ingredient',
		drop: (item: { ingredient: TIngredients }) => {
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
		(ingredient: TConstructorIngredient, index: number) : JSX.Element => {
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
				(sum : number, curr : TIngredients) : number => sum + curr.price,
				0
			);
		} else {
			return [...constructorIngredients].reduce(
				(sum : number, curr : TIngredients) : number => sum + curr.price,
				0
			);
		}
	}, [bun, constructorIngredients]);

	const bunPlaceholderBorder : { border : string } = {
		border:
			isOver && draggingItem.ingredient.type === 'bun'
				? '2px solid #524EFF'
				: 'none',
	};

	const ingredientPlaceholderBorder : {border : string } = {
		border:
			isOver && draggingItem.ingredient.type !== 'bun'
				? '2px solid #524EFF'
				: 'none',
	};

	const ingredientsIds = useMemo(() => {
		if (bun) {
			return [bun, ...constructorIngredients, bun].map((item : TIngredients) : string => item._id);
		} else {
			return [...constructorIngredients].map((item : TIngredients) : string => item._id);
		}
	}, [bun, constructorIngredients]);

	const navigate = useNavigate();

	const handleClick = () : void => {
		
		if (!user) {
			navigate('/login');
			return
		}

		dispatch(getOrder({ url: `${BASE_URL}/orders`, ingredientsIds }));
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
								{constructorIngredients.map((ingredient : TIngredients, index : number) : JSX.Element =>
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
					onClick={() => handleClick()}
					disabled={bun ? false : true}>
					Оформить заказ
				</Button>
			</div>
		</div>
	);
}
