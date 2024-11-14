export type TForm = {
	email: string;
	password: string;
	name: string;
};

export type TResetPasswordForm = Pick<TForm, 'password'> & {
	token: string;
};

export type TLoginForm = Pick<TForm, 'email' | 'password'>;

export type TUser = Pick<TForm, 'name' | 'email'>;
