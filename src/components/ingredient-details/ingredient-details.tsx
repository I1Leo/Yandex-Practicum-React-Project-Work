import { BurgerIngredientType } from '../burger-ingredients/burger-ingredients-section/burger-ingredients-section';
import s from './ingredient-detail.module.scss';

export type IngredientDetailsType = {
	ingredient: BurgerIngredientType | undefined;
};

export default function IngredientDetails({
	ingredient,
}: IngredientDetailsType) {
	return (
		<>
			<div className={`${s.img_container} mb-4`}>
				<img src={ingredient?.image} alt={ingredient?.name} />
			</div>
			<p className='text text_type_main-medium pb-8'>{ingredient?.name}</p>
			<table>
				<thead>
					<tr className='text text_type_main-default text_color_inactive'>
						<th className='pr-5 pb-2'>Калории,ккал</th>
						<th className='pr-5 pb-2'>Белки,г</th>
						<th className='pr-5 pb-2'>Жиры,г</th>
						<th>Углеводы, г</th>
					</tr>
				</thead>
				<tbody>
					<tr className='text text_type_digits-default text_color_inactive'>
						<th className='pr-5'>{ingredient?.calories}</th>
						<th className='pr-5'>{ingredient?.proteins}</th>
						<th className='pr-5'>{ingredient?.fat}</th>
						<th>{ingredient?.carbohydrates}</th>
					</tr>
				</tbody>
			</table>
		</>
	);
}
