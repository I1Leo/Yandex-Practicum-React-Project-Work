import { TFeedOrder } from "./feed"
import { TIngredients } from "./ingredients"

export type TUserResponse = {
   email: string
   password: string
}

export type TRegisterResponse = {
   success: boolean,
   user: {
      email: string
      name: string
   },
   accessToken: string
   refreshToken: string
}

export type TApiResponse = {
	success: boolean;
	data: TIngredients[] | TRegisterResponse | TFeedOrder;
	[key: string]: any;
};