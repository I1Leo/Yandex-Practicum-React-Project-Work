import AppHeaderNav from './app-header-nav/app-header-nav';
import s from './app-header.module.scss';
import { useState } from 'react';

export default function AppHeader() : JSX.Element {
	const [activeItem, setActiveItem] = useState<string>('Конструктор');

	return (
		<header className={`${s.header} pt-4 pb-4`}>
			<div className={s.container}>
				<AppHeaderNav onChange={setActiveItem} />
			</div>
		</header>
	);
}
