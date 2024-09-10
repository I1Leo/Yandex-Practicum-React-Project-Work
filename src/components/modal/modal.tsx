import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import s from './modal.module.scss';
import { ReactNode, useEffect } from 'react';
import { createPortal } from 'react-dom';
import ModalOverlay from '../modal-overlay/modal-overlay';
import { useDispatch } from 'react-redux';
import { ingredientDetailsSlice } from '../../services/ingredient-details';
import { orderDetailsSlice } from '../../services/order-details';

type ModalType = {
	children: ReactNode;
	title: string;
};

const modalRoot = document.getElementById('modals');

export default function Modal({ children, title }: ModalType) {
	const { deactivateIngredientsDetailsModal } = ingredientDetailsSlice.actions;
	const { deactivateOrderDetailsModal } = orderDetailsSlice.actions;
	const dispatch = useDispatch();

	useEffect(() => {
		const handleEsc = (event: KeyboardEvent) => {
			if (event.key === 'Escape') {
				dispatch(deactivateIngredientsDetailsModal());
				dispatch(deactivateOrderDetailsModal());
			}
		};

		window.addEventListener('keydown', handleEsc);

		return () => {
			window.removeEventListener('keydown', handleEsc);
		};
	}, [dispatch]);

	const handleClick = () => {
		dispatch(deactivateIngredientsDetailsModal());
		dispatch(deactivateOrderDetailsModal());
	};

	if (!modalRoot) return null;

	return createPortal(
		<>
			<ModalOverlay />
			<div className={`${s.modal} pt-10 pr-10 pb-15 pl-10`}>
				<div className={s.modal_header}>
					<h2 className={`${s.title} text text_type_main-large`}>{title}</h2>
					<button className={`${s.close_btn}`} onClick={() => handleClick()}>
						<CloseIcon type='primary' />
					</button>
				</div>
				{children}
			</div>
		</>,
		modalRoot
	);
}
