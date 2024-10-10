import AppHeaderItem from '../app-header-item/app-header-item';
import s from './app-header-nav.module.scss';
import { Logo } from '@ya.praktikum/react-developer-burger-ui-components';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAppSelector } from '../../../hooks';

export default function AppHeaderNav() : JSX.Element {
	
	let user = useAppSelector(state => state.root.auth.user);

	const navigate = useNavigate();

	return (
		<nav className={s.nav}>
			<ul className={s.list}>
				<li>
					<NavLink to="/" >
						{({ isActive }) => (
							<AppHeaderItem
								isActive={isActive}
								icon='burger'
								text='Конструктор'
							/>
						)}
					</NavLink>
				</li>
				<li>
					<NavLink to="/orders">
						{({ isActive }) => (
							<AppHeaderItem
								isActive={isActive}
								icon='list'
								text='Лента заказов'
							/>
						)}
					</NavLink>

				</li>
				<li className={s.logo_item}>
					<button onClick={() => navigate("/")}>
						<Logo />
					</button>
				</li>
				<li> 
					<NavLink to="/profile">
						{({ isActive }) => (
							<AppHeaderItem
								isActive={isActive}
								icon='profile'
								text={user ? user.name : 'Личный кабинет'}
							/>
						)}

					</NavLink>

				</li>
			</ul>
		</nav>
	);
}
