import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import s from './modal.module.scss';
import { Dispatch, ReactNode, SetStateAction, useEffect } from 'react';
import { createPortal } from 'react-dom';

type ModalType = {
	children: ReactNode;
	title: string;
	onChange: Dispatch<SetStateAction<boolean>>;
};

const modalRoot = document.getElementById('modals');

export default function Modal({ children, title, onChange }: ModalType) {
	useEffect(() => {
		const handleEsc = (event: KeyboardEvent) => {
			if (event.key === 'Escape') {
				onChange(false);
			}
		};

		window.addEventListener('keydown', handleEsc);

		return () => {
			window.removeEventListener('keydown', handleEsc);
		};
	}, [onChange]);

	if (!modalRoot) return null;

	return createPortal(
		<div className={`${s.modal} pt-10 pr-10 pb-15 pl-10`}>
			<div className={s.modal_header}>
				<h2 className={`${s.title} text text_type_main-large`}>{title}</h2>
				<button className={`${s.close_btn}`} onClick={() => onChange(false)}>
					<CloseIcon type='primary' />
				</button>
			</div>
			{children}
		</div>,

		modalRoot
	);
}
