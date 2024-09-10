import s from './modal-overlay.module.scss';
import { useDispatch } from 'react-redux';
import { ingredientDetailsSlice } from '../../services/ingredient-details';
import { KeyboardEvent } from 'react';

export default function ModalOverlay() {
	const { deactivateIngredientsDetailsModal } = ingredientDetailsSlice.actions;
	const dispatch = useDispatch();

	const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
		if (e.key === ' ') {
			dispatch(deactivateIngredientsDetailsModal());
		}
	};

	return (
		<div
			className={s.modal_overlay}
			role='button'
			tabIndex={0}
			onClick={() => dispatch(deactivateIngredientsDetailsModal())}
			onKeyDown={handleKeyDown}></div>
	);
}
