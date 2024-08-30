import { Dispatch, SetStateAction } from 'react';
import AppHeaderItem from '../app-header-item/app-header-item';
import s from './app-header-nav.module.scss';
import { Logo } from '@ya.praktikum/react-developer-burger-ui-components';

type AppHeaderNavType = {
	current: string;
	onChange: Dispatch<SetStateAction<string>>;
};

export default function AppHeaderNav({ current, onChange }: AppHeaderNavType) {
	return (
		<nav className={s.nav}>
			<ul className={s.list}>
				<li>
					<AppHeaderItem
						current={current}
						icon='burger'
						text='Конструктор'
						onChange={onChange}
					/>
				</li>
				<li>
					<AppHeaderItem
						current={current}
						icon='list'
						text='Лента заказов'
						onChange={onChange}
					/>
				</li>
				<li className={s.logo_item}>
					<Logo />
				</li>
				<li>
					<AppHeaderItem
						current={current}
						icon='profile'
						text='Мой аккаунт'
						onChange={onChange}
					/>
				</li>
			</ul>
		</nav>
	);
}
