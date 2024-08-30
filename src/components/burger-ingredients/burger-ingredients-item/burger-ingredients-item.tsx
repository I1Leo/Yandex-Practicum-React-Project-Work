import {
	Counter,
	CurrencyIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { BurgerIngredientType } from '../burger-ingredients-section/burger-ingredients-section';
import s from './burger-ingredient-item.module.scss';

type BurgerIngredientsItemType = {
	ingredient: BurgerIngredientType;
	onChange: (ingredientName: string) => void;
};
export default function BurgeringredientsItem({
	ingredient,
	onChange,
}: BurgerIngredientsItemType) {
	return (
		<li className={s.item}>
			<button onClick={() => onChange(ingredient.name)}>
				{(ingredient.name === 'Краторная булка N-200i' ||
					ingredient.name === 'Соус традиционный галактический') && (
					<Counter count={1} size='default' extraClass='m-1' />
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
