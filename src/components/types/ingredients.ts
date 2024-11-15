import { RefObject } from 'react';

export type TIngredients = {
	_id: string;
	name: string;
	type: string;
	proteins: number;
	fat: number;
	carbohydrates: number;
	calories: number;
	price: number;
	image: string;
	image_mobile: string;
	image_large: string;
	__v: number;
};

export type TBurgerIngredientsSection = {
	ingredient: Array<TIngredients>;
	sectionRef: RefObject<HTMLDivElement>;
};

export type TBurgerIngredientsItem = {
	ingredient: TIngredients;
};

export type TConstructorIngredient = TIngredients & {
	key?: string;
};

export type TBurgerConstructorItem = {
	type?: 'top' | 'bottom' | undefined;
	ingredient: TConstructorIngredient;
	index?: number;
	moveIngredient?: (dragIndex: number, hoverIndex: number) => void;
};

export type TIngredientDetails = {
	isTitle?: boolean;
};

export type IngredientCircle = {
	ingredient?: TIngredients;
	index?: number;
	restIngredients?: number;
};
