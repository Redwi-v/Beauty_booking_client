import { apiInstance } from '../instance/instance';
import { ICreateBookingData, IGetBookingListRes } from './types';

export const bookingApi = {
	getListById(telegramId: string | number) {
		return apiInstance.get<IGetBookingListRes[]>('/booking', { params: { telegramId } });
	},

	create(data: ICreateBookingData) {
		return apiInstance.post('/booking', data);
	},
};
