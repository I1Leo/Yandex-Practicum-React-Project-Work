import {
	BurgerIcon,
	ListIcon,
	ProfileIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import s from './app-header-item.module.scss';
import { Dispatch, SetStateAction } from 'react';

type AppHeaderItemType = {
	current: string;
	icon: string;
	text: string;
	onChange: Dispatch<SetStateAction<string>>;
};

export default function AppHeaderItem({
	current,
	icon,
	text,
	onChange,
}: AppHeaderItemType) {
	return (
		<button
			className={`${s.item} pt-4 pr-5 pb-4 pl-5`}
			onClick={() => onChange(text)}>
			{icon === 'burger' ? (
				<BurgerIcon type={current === text ? 'primary' : 'secondary'} />
			) : icon === 'list' ? (
				<ListIcon type={current === text ? 'primary' : 'secondary'} />
			) : (
				<ProfileIcon type={current === text ? 'primary' : 'secondary'} />
			)}
			<p
				className={`text text_type_main-default ${
					current === text ? s.isActive : ''
				}`}>
				{text}
			</p>
		</button>
	);
}
