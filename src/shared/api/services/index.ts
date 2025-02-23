import { apiInstance } from "../instance/instance"
import { IGetListRes } from "./types"

export const ServicesApi = {

  getServicesList( params: {salonId: number, masterId: number, search: string} ) {

    const {masterId, salonId, search} = params

    return apiInstance.get<IGetListRes>('/services', {
      params: {
        masterId,
        salonId,
        search,

        take: 1000,
        skip: 0
      }
    })

  }

}