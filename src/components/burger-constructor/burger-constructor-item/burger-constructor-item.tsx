import {
	ConstructorElement,
	DragIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import s from './burger-consructor-item.module.scss';
import {
	constructorIngredientsSlice,
} from '../../../services/burger-constructor';
import { useRef } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import { useAppDispatch } from '../../../hooks';
import { TBurgerConstructorItem } from '../../types/ingredients';



export default function BurgerConstructorItem({
	type,
	ingredient,
	index,
	moveIngredient,
}: TBurgerConstructorItem) : JSX.Element {
	const dispatch = useAppDispatch();
	const { deleteIngredient } = constructorIngredientsSlice.actions;

	const handleDelete = () => {
		if (ingredient.key) {
			dispatch(deleteIngredient(ingredient.key));
		}
	};

	const ref = useRef<HTMLLIElement>(null);

	const [, drag] = useDrag({
		type: 'constructorIngredient',
		item: { index },
		canDrag: ingredient.type !== 'bun',
	});

	const [, drop] = useDrop({
		accept: 'constructorIngredient',
		hover(item: { index: number }, monitor) {
			if (!ref.current || !moveIngredient) return;
			const dragIndex = item.index;
			const hoverIndex = index ?? 0;

			if (dragIndex === hoverIndex) return;

			const hoverBoundingRect = ref.current.getBoundingClientRect();
			const hoverMiddleY =
				(hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
			const clientOffset = monitor.getClientOffset();
			const hoverClientY = clientOffset!.y - hoverBoundingRect.top;

			if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) return;
			if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) return;

			moveIngredient!(dragIndex, hoverIndex);

			item.index = hoverIndex;
		},
	});

	drag(drop(ref));

	return (
		<li ref={ref} className={`${s.item}`}>
			{ingredient.type !== 'bun' && <DragIcon type='primary' />}
			{ingredient.type !== 'bun' ? (
				<ConstructorElement
					text={ingredient.name}
					price={ingredient.price}
					thumbnail={ingredient.image}
					handleClose={() => handleDelete()}
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
