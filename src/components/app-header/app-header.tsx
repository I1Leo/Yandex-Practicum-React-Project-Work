import AppHeaderNav from './app-header-nav/app-header-nav';
import s from './app-header.module.scss';
import { useState } from 'react';

export default function AppHeader() {
	const [activeItem, setActiveItem] = useState('Конструктор');

	return (
		<header className={`${s.header} pt-4 pb-4`}>
			<div className={s.container}>
				<AppHeaderNav current={activeItem} onChange={setActiveItem} />
			</div>
		</header>
	);
}
