import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import LoginPage from '../pages/login-page/login-page';
import RegisterPage from '../pages/register-page/register-page';
import ForgotPasswordPage from '../pages/forgot-password-page/forgot-password-page';
import ResetPasswordPage from '../pages/reset-password-page/reset-password-page';
import ProfilePage from '../pages/profile-page/profile-page';
import NotFoundPage from '../pages/not-found-page/not-found-page';
import { OnlyAuth, OnlyUnAuth } from '../components/protected-route/protected-route';
import { useEffect, useState } from 'react';
import { checkUserAuth, getIngredients } from '../services/api';
import { useAppDispatch, useAppSelector } from '../hooks';
import OrderPage from '../pages/order-page/order-page';
import AppHeader from '../components/app-header/app-header';
import Main from '../components/main/main';
import IngredientDetails from '../components/ingredient-details/ingredient-details';
import Modal from '../components/modal/modal';
import { BASE_URL, FEED_SERVER_URL, ORDERS_SERVER_URL } from '../constants';
import FeedPage from '../pages/feed-page/feed-page';
import { wsFeedConnect } from '../services/feed/actions';
import OrderInfo from '../components/order-info/order-info';


export const App = (): JSX.Element => {

	const dispatch = useAppDispatch();

	useEffect(() => {
		dispatch(checkUserAuth());
	}, []);

	useEffect(() => {
		dispatch(getIngredients(`${BASE_URL}/ingredients`));
	}, [dispatch]);

	const location = useLocation();
	const background = location.state && location.state.background;

	const navigate = useNavigate();

	const handleClose = (): void => {
		navigate(-1);
	};

	return (
		<>
			<AppHeader />
			<Routes location={background || location}>
				<Route path="/" element={<Main />} />
				<Route path="/ingredients/:ingredientId" element={<IngredientDetails isTitle={true} />} />
				<Route path="/feed" element={<FeedPage />} />
				<Route path="/feed/:orderNumber" element={<OrderInfo type="feed" />} />
				<Route path="/login" element={<OnlyUnAuth element={<LoginPage />} />} />
				<Route path="/register" element={<OnlyUnAuth element={<RegisterPage />} />} />
				<Route path="/forgot-password" element={<OnlyUnAuth element={<ForgotPasswordPage />} />} />
				<Route path="/reset-password" element={<OnlyUnAuth element={<ResetPasswordPage />} />} />
				<Route path="/profile" element={<OnlyAuth element={<ProfilePage />} />}>
					<Route path="order" element={<OrderPage />} />
				</Route>
				<Route path="/profile/orders/:orderNumber" element={<OnlyAuth element={<OrderInfo type="profile" />} />} />
				<Route path="*" element={<NotFoundPage />} />
			</Routes>
			{
				background && (
					<Routes>
						<Route path="/ingredients/:ingredientId" element={<Modal title='Детали ингредиента' onClose={handleClose}><IngredientDetails /></Modal>} />
						<Route path="/feed/:orderNumber" element={<Modal isOrder onClose={handleClose}><OrderInfo type="feed" isModal /></Modal>} />
						<Route path="/profile/orders/:orderNumber" element={<Modal isOrder onClose={handleClose}><OrderInfo type="profile" isModal /></Modal>} />
					</Routes>
				)
			}
		</>
	);
};
