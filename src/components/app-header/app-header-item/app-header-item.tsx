import {
	BurgerIcon,
	ListIcon,
	ProfileIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import s from './app-header-item.module.scss';
import { Dispatch, SetStateAction } from 'react';

type TAppHeaderItem= {
	isActive: boolean
	icon: string;
	text: string;
	onChange: Dispatch<SetStateAction<string>>;
};

export default function AppHeaderItem({
	isActive,
	icon,
	text,
	onChange,
}: TAppHeaderItem) : JSX.Element {
	return (
		<button
			className={`${s.item} pt-4 pr-5 pb-4 pl-5`}
			onClick={() => onChange(text)}>
			{icon === 'burger' ? (
				<BurgerIcon type={isActive ? 'primary' : 'secondary'} />
			) : icon === 'list' ? (
				<ListIcon type={isActive ? 'primary' : 'secondary'} />
			) : (
				<ProfileIcon type={isActive ? 'primary' : 'secondary'} />
			)}
			<p
				className={`text text_type_main-default ${
					isActive ? s.isActive : ''
				}`}>
				{text}
			</p>
		</button>
	);
}
