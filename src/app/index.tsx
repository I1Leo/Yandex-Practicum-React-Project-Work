import { Routes, Route, useLocation } from 'react-router-dom';
import LoginPage from '../pages/login-page/login-page';
import RegisterPage from '../pages/register-page/register-page';
import ForgotPasswordPage from '../pages/forgot-password-page/forgot-password-page';
import ResetPasswordPage from '../pages/reset-password-page/reset-password-page';
import ProfilePage from '../pages/profile-page/profile-page';
import NotFoundPage from '../pages/not-found-page/not-found-page';
import { OnlyAuth, OnlyUnAuth } from '../components/protected-route/protected-route';
import { useEffect } from 'react';
import { checkUserAuth } from '../services/api';
import { useAppDispatch } from '../hooks';
import OrderPage from '../pages/order-page/order-page';
import AppHeader from '../components/app-header/app-header';
import Main from '../components/main/main';
import IngredientDetails from '../components/ingredient-details/ingredient-details';

export const App = () : JSX.Element => {

   const dispatch = useAppDispatch();

	useEffect(() => {
		dispatch(checkUserAuth());
	}, []);

	const location = useLocation();
	const background = location.state && location.state.background;

	return (
		<>
			<AppHeader />
			<Routes location={background || location}>
				<Route path="/" element={<Main />} />
				<Route path="/ingredients/:ingredientId" element={<IngredientDetails />} />
				<Route path="/login" element={<OnlyUnAuth element={<LoginPage />} />} />
				<Route path="/register" element={<OnlyUnAuth element={<RegisterPage />} />} />
				<Route path="/forgot-password" element={<OnlyUnAuth element={<ForgotPasswordPage />} />} />
				<Route path="/reset-password" element={<OnlyUnAuth element={<ResetPasswordPage />} />} />
				<Route path="/profile" element={<OnlyAuth element={<ProfilePage />} />}>
					<Route path="order" element={<OrderPage />} />
				</Route>
				<Route path="*" element={<NotFoundPage />} />
			</Routes>

		</>
	);
};
