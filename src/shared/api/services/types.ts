export interface IGetListRes {
  count: number
  list: List[]
}

export interface List {
  id: number
  serviceTagId: number
  name: string
  price: number
  duration: number
  bookingId: any
  eventsId: number
  bookingList: any[]
  masterAccounts: IMasterAccount[]
  serviceTag: IServiceTag
}

export interface IMasterAccount {
  id: number
  salonBranchId: number
  rating: number
  speciality: string
  about: string
  name: string
  lastName: string
  avatar: string
  canChangeSchedule: boolean
  canChangeBookingTime: boolean
  telegramId: string
}

export interface IServiceTag {
  id: number
  salonId: number
  name: string
}
