import { TPaginationResponse } from "../types/global.types";

export interface IAuthRegister {
	fullName: string;
	phone: string;
	password: string;
	role_id: number;
}

export interface IAuthLogin {
	phone: string;
	password: string;
}

export interface IAuthResponse {
	data: {
		token: string;
		user: {
			id: number;
			role_id: number;
			name: string;
			phone: string;
			created_at: Date;
			updated_at: Date;
			role: {
				id: number;
				name: string;
				created_at: Date;
				updated_at: Date;
			};
		};
	};
}

export interface IAuthGetAllResponse {
	data: {
		id: number;
		name: string;
		phone: string;
		role: {
			id: number;
			name: string;
		};
	}[];
}

export interface TUserUpdate {
	id?: number;
	name: string;
	phone: string;
	password?: string;
	role_id: number;
}

export type TUserResponse = {
	data: TUser[];
	meta: TPaginationResponse;
};

export type TUser = {
	id: number;
	name: string;
	phone: string;
	role: {
		id: number;
		name: string;
	};
};
