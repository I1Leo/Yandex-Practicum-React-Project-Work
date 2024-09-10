import { useSelector } from 'react-redux';
import s from './ingredient-detail.module.scss';
import { RootState } from '../..';

export default function IngredientDetails() {
	const { ingredientDetails } = useSelector(
		(state: RootState) => state.root.ingredientDetails
	);

	return (
		<>
			<div className={`${s.img_container} mb-4`}>
				<img src={ingredientDetails?.image} alt={ingredientDetails?.name} />
			</div>
			<p className='text text_type_main-medium pb-8'>
				{ingredientDetails?.name}
			</p>
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
						<th className='pr-5'>{ingredientDetails?.calories}</th>
						<th className='pr-5'>{ingredientDetails?.proteins}</th>
						<th className='pr-5'>{ingredientDetails?.fat}</th>
						<th>{ingredientDetails?.carbohydrates}</th>
					</tr>
				</tbody>
			</table>
		</>
	);
}
