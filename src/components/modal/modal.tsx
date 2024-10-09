import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import s from './modal.module.scss';
import { ReactNode, useEffect } from 'react';
import { createPortal } from 'react-dom';
import ModalOverlay from '../modal-overlay/modal-overlay';

type TModal = {
	children: ReactNode;
	title: string;
	onClose: () => void;
};

const modalRoot = document.getElementById('modals');

export default function Modal({ children, title, onClose }: TModal)  : JSX.Element | null { 
	
	useEffect(() => {
		const handleEsc = (event: KeyboardEvent) : void => {
			if (event.key === 'Escape') {
				onClose();
			}
		};

		window.addEventListener('keydown', handleEsc);

		return () : void => {
			window.removeEventListener('keydown', handleEsc);
		};
	}, [onClose]);

	if (!modalRoot) return null;

	return createPortal(
		<>
			<ModalOverlay onClose={onClose} />
			<div className={`${s.modal} pt-10 pr-10 pb-15 pl-10`}>
				<div className={s.modal_header}>
					<h2 className={`${s.title} text text_type_main-large`}>{title}</h2>
					<button className={`${s.close_btn}`} onClick={() => onClose()}>
						<CloseIcon type='primary' />
					</button>
				</div>
				{children}
			</div>
		</>,
		modalRoot
	);
}
