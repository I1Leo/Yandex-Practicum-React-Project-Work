import {
	Button,
	Input,
	PasswordInput,
} from '@ya.praktikum/react-developer-burger-ui-components';
import s from './login-page.module.scss';
import { useNavigate } from 'react-router';
import { NavLink } from 'react-router-dom';
import { FormEvent, useState } from 'react';
import { login } from '../../services/api';
import { useAppDispatch } from '../../hooks';

export default function LoginPage() {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const dispatch = useAppDispatch();
	const navigate = useNavigate();

	const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
		e.preventDefault();

		const form = {
			email: email,
			password: password,
		};

		await dispatch(login(form));
		navigate('/');
	};

	return (
		<main className={s.main}>
			<form action='' className={`${s.form} pb-20`} onSubmit={handleSubmit}>
				<p className='text text_type_main-medium'>Вход</p>
				<Input
					type={'text'}
					value={email}
					onChange={(e) => setEmail(e.target.value)}
					placeholder={'E-mail'}
					size={'default'}
					extraClass='ml-1'
				/>
				<PasswordInput
					value={password}
					onChange={(e) => setPassword(e.target.value)}
					extraClass='mb-2'
				/>
				<Button htmlType='submit' type='primary' size='large'>
					Войти
				</Button>
			</form>
			<p className={`text text_type_main-default pb-4 ${s.text}`}>
				Вы — новый пользователь?{' '}
				<NavLink to='/register'>Зарегистрироваться</NavLink>
			</p>
			<p className={`text text_type_main-default ${s.text}`}>
				Забыли пароль?{' '}
				<NavLink to='/forgot-password'>Восстановить пароль</NavLink>
			</p>
		</main>
	);
}
