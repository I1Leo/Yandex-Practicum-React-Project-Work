import {
	Counter,
	CurrencyIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import s from './burger-ingredient-item.module.scss';
import { useDrag } from 'react-dnd';
import { useMemo } from 'react';
import { useAppSelector } from '../../../hooks';
import { Link, useLocation } from 'react-router-dom';
import { TBurgerIngredientsItem, TIngredients } from '../../types/ingredients';

export default function BurgeringredientsItem({
	ingredient,
}: TBurgerIngredientsItem): JSX.Element {
	const { bun, constructorIngredients } = useAppSelector(
		(state) => state.root.constructorIngredients
	);

	const location = useLocation();

	const [, dragRef] = useDrag({
		type: 'ingredient',
		item: { ingredient },
		collect: (monitor) => ({
			isDragging: monitor.isDragging(),
		}),
	});

	const amount = useMemo(() => {
		if (bun) {
			return [bun, ...constructorIngredients, bun].filter(
				(item: TIngredients): boolean => item.name === ingredient.name
			).length;
		} else {
			return [...constructorIngredients].filter(
				(item: TIngredients): boolean => item.name === ingredient.name
			).length;
		}
	}, [constructorIngredients, bun]);

	return (
		<li data-testid={ingredient._id} className={s.item} ref={dragRef}>
			<Link
				key={ingredient._id}
				to={`/ingredients/${ingredient._id}`}
				state={{ background: location }}>
				<button>
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
