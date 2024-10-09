import AppHeaderNav from './app-header-nav/app-header-nav';
import s from './app-header.module.scss';

export default function AppHeader() : JSX.Element {

	return (
		<header className={`${s.header} pt-4 pb-4`}>
			<div className={s.container}>
				<AppHeaderNav  />
			</div>
		</header>
	);
}
