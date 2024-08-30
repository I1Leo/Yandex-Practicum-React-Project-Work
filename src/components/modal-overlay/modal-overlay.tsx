import { Dispatch, KeyboardEvent, SetStateAction } from 'react';
import s from './modal-overlay.module.scss';

type ModalOverlayType = {
	onChange: Dispatch<SetStateAction<boolean>>;
};

export default function ModalOverlay({ onChange }: ModalOverlayType) {
	const handleClick = () => onChange(false);
	const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
		if (event.key === 'Enter' || event.key === ' ') {
			handleClick();
		}
	};

	return (
		<div
			className={s.modal_overlay}
			role='button'
			tabIndex={0}
			onClick={handleClick}
			onKeyDown={handleKeyDown}></div>
	);
}
