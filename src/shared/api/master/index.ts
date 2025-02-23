import { apiInstance } from '../instance/instance';
import { IGetMasterListParams, IMaster, ISchedule } from './types';

export const MasterApi = {
	async getMastersList(params: IGetMasterListParams) {
		const data = await apiInstance.get<{ list: IMaster[]; count: number }>('/master', {
			params,
		});

		return data.data;
	},


  async getOne(masterId: number) {

    return apiInstance.get<IMaster>(`/master/${masterId}` ) 

  },

  async getSchedule ( masterId: number, date: Date, salonBranchId: number, salonId: number ) {

    return apiInstance.get<string[]>(`/master.schedule/freetime/${ masterId }`, {
      params: {
        date,
        salonBranchId,
        salonId,
      }
    })

  }

};
