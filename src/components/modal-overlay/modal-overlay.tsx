import s from './modal-overlay.module.scss';
import { KeyboardEvent } from 'react';

type TModalOverlay = {
	onClose: () => void;
};

export default function ModalOverlay({ onClose }: TModalOverlay) : JSX.Element {
	const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) : void => {
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
