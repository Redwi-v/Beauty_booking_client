export interface ISalon {
  id: number
  adminAccountUserId: number
  name: string
  logoUrl: string
  isOpen: boolean
  description: string
  createdAt: string
  updatedAt: string

  branches: ISalonBranch[]
  
}

export interface ISalonBranch {
  id: number
  salonId: number
  createdAt: string
  updatedAt: string
  isOpen: boolean
  address: string
  latitude: string
  longitude: string
}
