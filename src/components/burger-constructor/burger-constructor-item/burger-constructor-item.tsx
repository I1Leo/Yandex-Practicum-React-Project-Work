import {
	ConstructorElement,
	DragIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import s from './burger-consructor-item.module.scss';
import { BurgerIngredientType } from '../../burger-ingredients/burger-ingredients-section/burger-ingredients-section';

type BurgerConstructorItemType = {
	type?: 'top' | 'bottom' | undefined;
	ingredient: BurgerIngredientType;
};

export default function BurgerConstructorItem({
	type,
	ingredient,
}: BurgerConstructorItemType) {
	return (
		<li className={`${s.item}`}>
			{ingredient.type !== 'bun' && <DragIcon type='primary' />}
			{ingredient.type !== 'bun' ? (
				<ConstructorElement
					text={ingredient.name}
					price={ingredient.price}
					thumbnail={ingredient.image}
				/>
			) : (
				<div className='pl-8'>
					<ConstructorElement
						type={type}
						isLocked={true}
						text={`${ingredient.name} ${type === 'top' ? '(вверх)' : '(низ)'}`}
						price={ingredient.price}
						thumbnail={ingredient.image}
					/>
				</div>
			)}
		</li>
	);
}
