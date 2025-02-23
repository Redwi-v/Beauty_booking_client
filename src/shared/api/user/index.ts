import { IBooking } from '../booking/types';
import { apiInstance } from '../instance/instance';
import { IRegistration } from './types';

export const UserApi = {
	registration(data: IRegistration) {
		return apiInstance.post('auth/sign-up-client', data);
	},

	auth(password: string, email: string) {
		return apiInstance.post('auth/sign-in', { password, email });
	},

	getSession() {
		return apiInstance.get<{ id: number; email: string, bookingList: IBooking[], name: string, lastName: string, phoneNumber: string }>('auth/session');
	},

	getProfile() {
		return apiInstance.get('users/profile');
	},
};
