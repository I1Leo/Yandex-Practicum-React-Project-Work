import s from './ingredient-detail.module.scss';
import { useAppSelector } from '../../hooks';
import { useParams } from 'react-router-dom';
import { TIngredients } from '../../services/burger-ingredients';

type TIngredientDetails = {
	isTitle?: boolean
}

export default function IngredientDetails({ isTitle }: TIngredientDetails): JSX.Element {
	const { ingredientDetails } = useAppSelector(
		(state) => state.root.ingredientDetails
	);

	const { ingredientId } = useParams();

	const ingredients = useAppSelector(state => state.root.ingredients.ingredients)
	const currentIngredient = ingredients.filter((ingredient: TIngredients): boolean => ingredient._id === ingredientId)[0];


	return (
		<>
			{
				!isTitle ?
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
					</> :
					<section className={s.paged_details}>
						<h2 className="text text_type_main-large">Детали ингредиента</h2>
						<div className={`${s.img_container} ${s.img_container_page}`}>
							<img src={currentIngredient?.image} alt={currentIngredient?.name} />
						</div>
						<p className='text text_type_main-medium pb-8'>
							{currentIngredient?.name}
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
									<th className='pr-5'>{currentIngredient?.calories}</th>
									<th className='pr-5'>{currentIngredient?.proteins}</th>
									<th className='pr-5'>{currentIngredient?.fat}</th>
									<th>{currentIngredient?.carbohydrates}</th>
								</tr>
							</tbody>
						</table>
					</section>

			}
		</>
	);
}
