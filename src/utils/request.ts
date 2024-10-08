import { BASE_URL } from '../constants';
import { TIngredients } from '../services/burger-ingredients';
import { TRegisterResponse} from './api';

export const checkResponse = (res: Response) => {
	if (res.ok) {
		return res.json();
	}
	return Promise.reject(`${res.status}`);
};

export type TApiResponse = {
	success: boolean;
	data: TIngredients[] | TRegisterResponse;
	[key: string]: any;
};

export const checkSuccess = (res: TApiResponse) => {
	if (res.success) {
		return res;
	}
	return Promise.reject(`${res}`);
};

export const refreshToken = () => {
	return fetch(`${BASE_URL}/auth/token`, {
	  method: "POST",
	  headers: {
		 "Content-Type": "application/json",
	  },
	  body: JSON.stringify({
		 token: localStorage.getItem("refreshToken"),
	  }),
	})
	.then(checkResponse)
	.then((refreshData) => {
	  if (!refreshData.success) {
			return Promise.reject(refreshData);
		 }
	  localStorage.setItem("refreshToken", refreshData.refreshToken); 
	  localStorage.setItem("accessToken", refreshData.accessToken);
	  return refreshData;
	});
 };
 
 export const fetchWithRefresh = async (url : string, options: RequestInit) => {
	try {
	  const res = await fetch(url, options);
	  return await checkResponse(res);
	} catch (err: unknown) {
	  if (err instanceof Error && err.message === "jwt expired") {
		 const refreshData = await refreshToken(); 
		 options.headers = {
			...options.headers,
			authorization: refreshData.accessToken,
		};
		 const res = await fetch(url, options); 
		 return await checkResponse(res);
	  } else {
		 return Promise.reject(err);
	  }
	}
 };