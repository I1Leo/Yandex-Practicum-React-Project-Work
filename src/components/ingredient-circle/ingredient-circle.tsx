import { IngredientCircle } from '../types/ingredients';
import s from './ingredient-circle.module.scss';

export default function IngredientCircle({
	ingredient,
	index,
	restIngredients,
}: IngredientCircle): JSX.Element {
	return (
		<div className={s.container} style={{ zIndex: index }}>
			{!restIngredients ? (
				<img
					src={ingredient && ingredient.image_mobile}
					alt={ingredient && ingredient.name}
				/>
			) : (
				<p className='text text_type_main-default'>+{restIngredients}</p>
			)}
		</div>
	);
}
