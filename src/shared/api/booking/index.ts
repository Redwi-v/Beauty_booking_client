import { apiInstance } from "../instance/instance";
import { IBooking, ICreateBookingParams } from "./types";

export const BookingApi = {

  createBooking( params: ICreateBookingParams ) {

    return apiInstance.post<IBooking>('/events', params)

  },
  
  getBookingById (id: string | number) {

    return apiInstance.get<IBooking>(`/events/${ id }`)

  },

  deleteBooking (id: string | number) {

    return apiInstance.delete<IBooking>(`/events/${ id }`)

  },
  

}