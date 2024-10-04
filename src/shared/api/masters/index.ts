import { apiInstance } from '../instance/instance';
import { IGetFreeTimeParams, IGetMastersParams, IGetMastersRes, Master } from './types';

export const mastersApi = {
	async getList(params: IGetMastersParams) {
		return apiInstance.get<IGetMastersRes>('/master', { params: { ...params, search: '' } });
	},


	async getFreeTime(params: IGetFreeTimeParams) {
		return apiInstance.get<{ freeTime: string[] }>('/master/time/freeTime', { params });
	},

	async getOne(id: number) {
		return apiInstance.get<Master>(`/master/${id}`);
	},
};
