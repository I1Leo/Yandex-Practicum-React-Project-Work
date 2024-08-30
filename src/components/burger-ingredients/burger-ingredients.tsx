import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import { useState } from 'react';
import s from './burger-ingredients.module.scss';
import BurgerIngredientsSection, {
	BurgerIngredientType,
} from './burger-ingredients-section/burger-ingredients-section';

type BurgerIngredientsType = {
	ingredients: Array<BurgerIngredientType>;
	onChange: (ingredientName: string) => void;
};

export default function BurgerIngredients({
	ingredients,
	onChange,
}: BurgerIngredientsType) {
	const [current, setCurrent] = useState('Булки');

	const burgerBuns = [...ingredients].filter(
		(ingredient) => ingredient.type === 'bun'
	);

	const burgerSauces = [...ingredients].filter(
		(ingredient) => ingredient.type === 'sauce'
	);

	const burgerMains = [...ingredients].filter(
		(ingredient) => ingredient.type === 'main'
	);

	return (
		<section className=''>
			<h1 className='text text_type_main-large pt-10 pb-5'>Соберите бургер</h1>
			<ul className={s.tabs}>
				<li>
					<Tab value='Булки' active={current === 'Булки'} onClick={setCurrent}>
						Булки
					</Tab>
				</li>
				<li>
					<Tab value='Соусы' active={current === 'Соусы'} onClick={setCurrent}>
						Соусы
					</Tab>
				</li>
				<li>
					<Tab
						value='Начинки'
						active={current === 'Начинки'}
						onClick={setCurrent}>
						Начинки
					</Tab>
				</li>
			</ul>
			<div className={`${s.sections_container} custom-scroll`}>
				{ingredients.length !== 0 && (
					<>
						<BurgerIngredientsSection
							ingredient={burgerBuns}
							onChange={onChange}
						/>
						<BurgerIngredientsSection
							ingredient={burgerSauces}
							onChange={onChange}
						/>
						<BurgerIngredientsSection
							ingredient={burgerMains}
							onChange={onChange}
						/>
					</>
				)}
			</div>
		</section>
	);
}
