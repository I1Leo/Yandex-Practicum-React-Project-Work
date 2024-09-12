import { IngredientsType } from '../services/burger-ingredients';

export const checkResponse = (res: Response) => {
	if (res.ok) {
		return res.json();
	}
	return Promise.reject(`${res.status}`);
};

type ApiResponse = {
	success: boolean;
	data: IngredientsType[];
	[key: string]: any;
};

export const checkSuccess = (res: ApiResponse) => {
	if (res.success) {
		return res;
	}
	return Promise.reject(`${res}`);
};
