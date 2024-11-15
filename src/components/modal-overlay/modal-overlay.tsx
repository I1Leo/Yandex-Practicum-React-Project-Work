import { TModalOverlay } from '../types/modal';
import s from './modal-overlay.module.scss';
import { KeyboardEvent } from 'react';

export default function ModalOverlay({ onClose }: TModalOverlay): JSX.Element {
	const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>): void => {
		if (e.key === ' ') {
			onClose();
		}
	};

	return (
		<div
			data-testid='modal-overlay'
			className={s.modal_overlay}
			role='button'
			tabIndex={0}
			onClick={() => onClose()}
			onKeyDown={handleKeyDown}></div>
	);
}
