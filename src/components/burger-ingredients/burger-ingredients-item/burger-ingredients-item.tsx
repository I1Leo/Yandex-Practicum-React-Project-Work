import {
	Counter,
	CurrencyIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import s from './burger-ingredient-item.module.scss';
import { ingredientDetailsSlice } from '../../../services/ingredient-details';
import { useDrag } from 'react-dnd';
import { useMemo } from 'react';
import { IngredientsType } from '../../../services/burger-ingredients';
import { useAppDispatch, useAppSelector } from '../../../hooks';
import { Link, useLocation, useNavigate } from 'react-router-dom';

type BurgerIngredientsItemType = {
	ingredient: IngredientsType;
};
export default function BurgeringredientsItem({
	ingredient,
}: BurgerIngredientsItemType) {
	const { ingredients } = useAppSelector((state) => state.root.ingredients);
	const { bun, constructorIngredients } = useAppSelector(
		(state) => state.root.constructorIngredients
	);

	const { getIngredientDetails } =
		ingredientDetailsSlice.actions;
	const dispatch = useAppDispatch();

	const location = useLocation();

	const [, dragRef] = useDrag({
		type: 'ingredient',
		item: { ingredient },
		collect: (monitor) => ({
			isDragging: monitor.isDragging(),
		}),
	});

	function handleClick() {
		const currentIngredient = ingredients.find(
			(ingredientName) => ingredientName.name === ingredient.name
		);
		if (currentIngredient) {
			dispatch(getIngredientDetails(currentIngredient));
		}

		
	}

	const amount = useMemo(() => {
		if (bun) {
			return [bun, ...constructorIngredients, bun].filter(
				(item) => item && item.name === ingredient.name
			).length;
		} else {
			return [...constructorIngredients].filter(
				(item) => item && item.name === ingredient.name
			).length;
		}
	}, [constructorIngredients, bun]);

	return (
		<li className={s.item} ref={dragRef}>
			<Link key={ingredient._id}
			to={`/ingredients/${ingredient._id}`} state={{background: location}}>
				<button onClick={handleClick}>
					{amount > 0 && (
						<Counter count={amount} size='default' extraClass='m-1' />
					)}
					<div className={s.img_container}>
						<img src={ingredient.image} alt={ingredient.name} />
					</div>
					<div className={s.price_container}>
						<p className='text text_type_digits-default pr-1'>
							{ingredient.price}
						</p>
						<CurrencyIcon type='primary' />
					</div>
					<p className={`text text_type_main-default ${s.name}`}>
						{ingredient.name}
					</p>
				</button>
			</Link>

		</li>
	);
}
