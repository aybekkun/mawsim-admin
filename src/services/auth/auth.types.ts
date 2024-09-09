export interface IAuthRegister {
	fullName: string;
	email: string;
	password: string;
}

export interface IAuthLogin {
	email: string;
	password: string;
}

export interface IAuthResponse {
	token: string;
	data: {
		id: string | number;
		fullName: string;
		email: string;
	};
}
