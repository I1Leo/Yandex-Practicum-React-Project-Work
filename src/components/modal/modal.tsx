import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import s from './modal.module.scss';
import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import ModalOverlay from '../modal-overlay/modal-overlay';
import { useParams } from 'react-router-dom';
import { TModal } from '../types/modal';

const modalRoot = document.getElementById('modals');

export default function Modal({
	children,
	title,
	isOrder,
	onClose,
}: TModal): JSX.Element | null {
	useEffect(() => {
		const handleEsc = (event: KeyboardEvent): void => {
			if (event.key === 'Escape') {
				onClose();
			}
		};

		window.addEventListener('keydown', handleEsc);

		return (): void => {
			window.removeEventListener('keydown', handleEsc);
		};
	}, [onClose]);

	const orderNumber = useParams().orderNumber;

	if (!modalRoot) return null;

	return createPortal(
		<>
			<ModalOverlay onClose={onClose} />
			<div data-testid='modal' className={`${s.modal} pt-10 pr-10 pb-15 pl-10`}>
				<div className={s.modal_header}>
					{title && (
						<h2 className={`${s.title} text text_type_main-large`}>{title}</h2>
					)}
					{isOrder && (
						<h2 className={`${s.title} text text_type_digits-default`}>
							# {orderNumber}
						</h2>
					)}
					<button
						data-testid='close'
						className={`${s.close_btn}`}
						onClick={() => onClose()}>
						<CloseIcon type='primary' />
					</button>
				</div>
				{children}
			</div>
		</>,
		modalRoot
	);
}
