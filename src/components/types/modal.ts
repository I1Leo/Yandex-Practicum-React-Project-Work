import { ReactNode } from 'react';

export type TModal = {
	children: ReactNode;
	title?: string;
	isOrder?: boolean;
	onClose: () => void;
};

export type TModalOverlay = {
	onClose: () => void;
};
