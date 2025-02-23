import { AxiosResponse } from "axios"
import { apiInstance } from "../instance/instance"
import { ISalon } from "./types"

export const SalonApi = {

  async getSalonById ( id: number ): Promise<ISalon>{

    const data = await apiInstance.get< ISalon >(`/salon/${id}`, {
      params: {
        onlyActiveBranches: true
      }
    })
    
    return data.data

  }


} 