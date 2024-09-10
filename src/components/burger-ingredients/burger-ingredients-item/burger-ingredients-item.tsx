import {
	Counter,
	CurrencyIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import s from './burger-ingredient-item.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../..';
import { ingredientDetailsSlice } from '../../../services/ingredient-details';
import { useDrag } from 'react-dnd';
import { useMemo } from 'react';
import { IngredientsType } from '../../../services/burger-ingredients';

type BurgerIngredientsItemType = {
	ingredient: IngredientsType;
};
export default function BurgeringredientsItem({
	ingredient,
}: BurgerIngredientsItemType) {
	const { ingredients } = useSelector(
		(state: RootState) => state.root.ingredients
	);
	const { bun, constructorIngredients } = useSelector(
		(state: RootState) => state.root.constructorIngredients
	);

	const { getIngredientDetails, activateIngredientsDetailsModal } =
		ingredientDetailsSlice.actions;
	const dispatch = useDispatch();

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
			dispatch(activateIngredientsDetailsModal());
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
		</li>
	);
}
