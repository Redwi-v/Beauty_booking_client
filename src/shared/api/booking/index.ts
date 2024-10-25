import { apiInstance } from '../instance/instance';
import { ICreateBookingData, IGetBookingListRes } from './types';

export const bookingApi = {
	getListById(telegramId: string | number) {
		return apiInstance.get<IGetBookingListRes[]>('/booking', { params: { telegramId } });
	},

	create(data: ICreateBookingData) {
		return apiInstance.post<{
			id: number;
			createdAt: string;
			updatedAt: string;
			time: string;
			masterAccountId: number;
			status: string;
			clientTelegramId: string;
			clientName: string;
			clientPhone: string;
			clientComment: string;
			masterComment: any;
			adminComment: any;
			salonId: number;
			salonBranchId: number;
			clientAccountId: any;
			master: {
				id: number;
				name: string;
				lastName: string;
				email: string;
				salonId: number;
				salonBranchId: number;
				rating: number;
				speciality: string;
				about: any;
				avatar: any;
				canChangeSchedule: boolean;
				telegramId: string;
				startShift: string;
				endShift: string;
				freeTimeIntervals: Array<any>;
				workingDays: Array<string>;
			};
			client: any;
		}>('/booking', data);
	},

	getAllById(idArray: number[]) {
		return apiInstance.post('/booking/find/byIdArray', {idArray} )
	},

	delete(id: number) {
		return apiInstance.delete(`/booking/${id}`);
	},
};
