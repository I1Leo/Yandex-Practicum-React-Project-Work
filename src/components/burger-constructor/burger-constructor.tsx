import {
	Button,
	CurrencyIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import s from './burger-constructor.module.scss';
import BurgerConstructorItem from './burger-constructor-item/burger-constructor-item';
import { BurgerIngredientType } from '../burger-ingredients/burger-ingredients-section/burger-ingredients-section';

type BurgerConstrustorType = {
	ingredients: Array<BurgerIngredientType>;
	onChange: () => void;
};

export default function BurgerConstructor({
	ingredients,
	onChange,
}: BurgerConstrustorType) {
	const burgerBuns = ingredients.filter(
		(ingredient) => ingredient.type === 'bun'
	);
	const burgerIngredientsWithoutBuns = ingredients.filter(
		(ingredient) => ingredient.type !== 'bun'
	);

	return (
		<div className={`pt-25 pr-4 pl-4 ${s.container}`}>
			{ingredients.length !== 0 && (
				<ul className={`${s.constructor_list}`}>
					<BurgerConstructorItem type='top' ingredient={burgerBuns[0]} />
					<li>
						<ul className={s.sublist}>
							{burgerIngredientsWithoutBuns.map((ingredient) => (
								<BurgerConstructorItem
									key={ingredient.name}
									ingredient={ingredient}
								/>
							))}
						</ul>
					</li>
					<BurgerConstructorItem type='bottom' ingredient={burgerBuns[0]} />
				</ul>
			)}
			<div className={`pt-10 ${s.total}`}>
				<div className={`pr-10 ${s.price_container}`}>
					<p className='text text_type_digits-medium'>610</p>
					<CurrencyIcon type='primary' />
				</div>
				<Button
					htmlType='button'
					type='primary'
					size='large'
					onClick={() => onChange()}>
					Оформить заказ
				</Button>
			</div>
		</div>
	);
}
