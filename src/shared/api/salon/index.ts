import { apiInstance } from '../instance/instance';
import { IGetSalonRes } from './types';

export const salonApi = {
	getSalonById(salonId: number) {
		return apiInstance.get<IGetSalonRes>(`/salons/${salonId}`);
	},
};
