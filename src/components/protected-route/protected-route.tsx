import { Navigate, useLocation } from 'react-router-dom';
import { ReactNode } from 'react';
import { useAppSelector } from '../../hooks';
import Preload from '../preload/preload';

type TProtected = {
	onlyUnAuth?: boolean;
	element: ReactNode;
};

const Protected = ({ onlyUnAuth = false, element }: TProtected): ReactNode => {
	const isAuthChecked = useAppSelector(
		(state) => state.root.auth.isAuthChecked
	);
	const user = useAppSelector((state) => state.root.auth.user);
	const location = useLocation();

	if (!isAuthChecked) {
		return <Preload />;
	}

	if (onlyUnAuth && user) {
		const { from } = location.state || { from: { pathname: '/' } };
		return <Navigate to={from} />;
	}

	if (!onlyUnAuth && !user) {
		return <Navigate to='/login' state={{ from: location }} />;
	}

	return element;
};

export const OnlyAuth = Protected;
export const OnlyUnAuth = ({ element }: TProtected): ReactNode => (
	<Protected onlyUnAuth={true} element={element} />
);
