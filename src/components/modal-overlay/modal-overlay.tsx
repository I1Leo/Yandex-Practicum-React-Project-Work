import s from './modal-overlay.module.scss';
import { KeyboardEvent } from 'react';

type ModalOverlayType = {
	onClose: () => void;
};

export default function ModalOverlay({ onClose }: ModalOverlayType) {
	const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
		if (e.key === ' ') {
			onClose();
		}
	};

	return (
		<div
			className={s.modal_overlay}
			role='button'
			tabIndex={0}
			onClick={() => onClose()}
			onKeyDown={handleKeyDown}></div>
	);
}
