import {
	CurrencyIcon,
	FormattedDate,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { OrderStatus, TFeedItem } from '../../types/feed';
import s from './feed-item.module.scss';
import IngredientCircle from '../../ingredient-circle/ingredient-circle';
import { useAppDispatch, useAppSelector } from '../../../hooks';
import { Link, useLocation } from 'react-router-dom';
import { setCurrentFeedOrder } from '../../../services/feed/feed-slice';
import { setCurrentOrder } from '../../../services/profile-feed/profile-feed-slice';
import { TIngredients } from '../../types/ingredients';

export default function FeedItem({ order, type }: TFeedItem) {
	const ingredients = useAppSelector<TIngredients[]>(
		(state) => state.root.ingredients.ingredients
	);

	const orderIngredients: string[] = order.ingredients;

	let totalPrice = 0;

	totalPrice = orderIngredients.reduce((sum, orderIngredient) => {
		const ingredient = ingredients.find(
			(ingredient) => ingredient._id === orderIngredient
		);
		return sum + (ingredient ? ingredient.price : 0);
	}, 0);

	const location = useLocation();

	const dispatch = useAppDispatch();

	const handleClick = () => {
		if (type === 'feed') {
			dispatch(setCurrentFeedOrder(order));
		} else {
			dispatch(setCurrentOrder(order));
		}
	};

	const orderStatus: string =
		order.status === 'created'
			? OrderStatus.created
			: order.status === 'pending'
			? OrderStatus.pending
			: OrderStatus.done;

	return (
		<li>
			<Link
				to={
					type === 'feed'
						? `/feed/${order.number}`
						: `/profile/orders/${order.number}`
				}
				state={{ background: location }}>
				<button className={`${s.item} p-6`} onClick={() => handleClick()}>
					<div className={s.header}>
						<p className='text text_type_digits-default'>#{order.number}</p>
						<p className='text text_type_main-default text_color_inactive'>
							<FormattedDate date={new Date(order.createdAt)} />
						</p>
					</div>
					<h3 className='text text_type_main-medium'>{order.name}</h3>
					{type === 'profile' && (
						<p
							className={`text text_type_main-default pb-6 ${
								orderStatus === 'Выполнен' && s.done_order
							}`}>
							{orderStatus}
						</p>
					)}
					<div className={s.body}>
						<ul className={s.ingredients}>
							{orderIngredients.length <= 6
								? orderIngredients.map((orderIngredient, index) => (
										<li key={index}>
											<IngredientCircle
												index={orderIngredients.length - index}
												ingredient={
													ingredients.filter(
														(ingredient) => ingredient._id === orderIngredient
													)[0]
												}
											/>
										</li>
								  ))
								: orderIngredients.slice(0, 6).map((orderIngredient, index) => (
										<li key={index}>
											<IngredientCircle
												index={orderIngredients.length - index}
												ingredient={
													ingredients.filter(
														(ingredient) => ingredient._id === orderIngredient
													)[0]
												}
											/>
										</li>
								  ))}
							{orderIngredients.length > 5 && (
								<li>
									<IngredientCircle
										restIngredients={orderIngredients.length - 5}
									/>
								</li>
							)}
						</ul>
						<div className={s.price}>
							<p className='text text_type_digits-default'>{totalPrice}</p>
							<CurrencyIcon type='primary' />
						</div>
					</div>
				</button>
			</Link>
		</li>
	);
}
