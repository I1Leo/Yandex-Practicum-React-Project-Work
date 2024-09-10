import { RefObject } from 'react';
import { IngredientsType } from '../../../services/burger-ingredients';
import BurgerIngredientsItem from '../burger-ingredients-item/burger-ingredients-item';
import s from './burger-ingredients-section.module.scss';

type BurgerIngredientsSectionType = {
	ingredient: Array<IngredientsType>;
	sectionRef: RefObject<HTMLDivElement>;
};

export default function BurgerIngredientsSection({
	ingredient,
	sectionRef,
}: BurgerIngredientsSectionType) {
	return (
		<section className={`${s.container} pt-6 pr-4 pb-10 pl-4`} ref={sectionRef}>
			<h2 className='text text_type_main-medium'>
				{ingredient[0].type === 'bun'
					? 'Булки'
					: ingredient[0].type === 'sauce'
					? 'Соусы'
					: 'Начинки'}
			</h2>
			<ul className={s.list}>
				{ingredient.map((ingredient: IngredientsType) => (
					<BurgerIngredientsItem
						key={ingredient.name}
						ingredient={ingredient}
					/>
				))}
			</ul>
		</section>
	);
}
