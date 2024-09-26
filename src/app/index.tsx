import { BrowserRouter as Router, Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import LoginPage from '../pages/login-page/login-page';
import RegisterPage from '../pages/register-page/register-page';
import ForgotPasswordPage from '../pages/forgot-password-page/forgot-password-page';
import ResetPasswordPage from '../pages/reset-password-page/reset-password-page';
import ProfilePage from '../pages/profile-page/profile-page';
import NotFoundPage from '../pages/not-found-page/not-found-page';
import { OnlyAuth, OnlyUnAuth } from '../components/protected-route/protected-route';
import { useEffect } from 'react';
import { checkUserAuth, getIngredients } from '../services/api';
import { useAppDispatch, useAppSelector } from '../hooks';
import OrderPage from '../pages/order-page/order-page';
import AppHeader from '../components/app-header/app-header';
import Main from '../components/main/main';
import IngredientDetails from '../components/ingredient-details/ingredient-details';
import Modal from '../components/modal/modal';
import { BASE_URL } from '../constants';

export const App = () => {

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

   const handleCloseIngredientsDetails = () => {
      navigate("/");
   };

	return (
		<>
			<AppHeader />
			<Routes location={background || location}>
				<Route path="/" element={<Main />} />
				<Route path="/ingredients/:ingredientId" element={<IngredientDetails />} />
				<Route path="/login" element={<OnlyUnAuth component={<LoginPage />} />} />
				<Route path="/register" element={<OnlyUnAuth component={<RegisterPage />} />} />
				<Route path="/forgot-password" element={<OnlyUnAuth component={<ForgotPasswordPage />} />} />
				<Route path="/reset-password" element={<OnlyUnAuth component={<ResetPasswordPage />} />} />
				<Route path="/profile" element={<OnlyAuth component={<ProfilePage />} />}>
					<Route path="order" element={<OrderPage />} />
				</Route>
				<Route path="*" element={<NotFoundPage />} />
			</Routes>
			{
				background && (
					<Routes>
						<Route path="/ingredients/:ingredientId" element={<Modal title='Детали ингредиента' onClose={handleCloseIngredientsDetails}><IngredientDetails /></Modal>} />
					</Routes>
				)
			}
		</>
	);
};
