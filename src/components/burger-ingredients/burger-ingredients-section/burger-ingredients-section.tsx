import BurgerIngredientsItem from '../burger-ingredients-item/burger-ingredients-item';
import s from './burger-ingredients-section.module.scss';

type BurgerIngredientsSectionType = {
	ingredient: Array<BurgerIngredientType>;
	onChange: (ingredientName: string) => void;
};

export type BurgerIngredientType = {
	_id: string;
	name: string;
	type: string;
	proteins: number;
	fat: number;
	carbohydrates: number;
	calories: number;
	price: number;
	image: string;
	image_mobile: string;
	image_large: string;
	__v: number;
};

export default function BurgerIngredientsSection({
	ingredient,
	onChange,
}: BurgerIngredientsSectionType) {
	return (
		<section className={`${s.container} pt-6 pr-4 pb-10 pl-4`}>
			<h2 className='text text_type_main-medium'>
				{ingredient[0].type === 'bun'
					? 'Булки'
					: ingredient[0].type === 'sauce'
					? 'Соусы'
					: 'Начинки'}
			</h2>
			<ul className={s.list}>
				{ingredient.map((ingredient: BurgerIngredientType) => (
					<BurgerIngredientsItem
						key={ingredient.name}
						ingredient={ingredient}
						onChange={onChange}
					/>
				))}
			</ul>
		</section>
	);
}
