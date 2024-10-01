export interface IGetMastersParams {
	salonId: number;
	time?: Date;
	date?: Date;
	servicesIdList?: string[];
}

export interface IGetMastersRes {
	masters: Master[];
	mastersCount: number;
}

export interface Master {
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
	workingDays: string[];
	salonBranch: SalonBranch;
	Booking: Booking[];
	masterService: MasterService[];
}

export interface SalonBranch {
	id: number;
	salonId: number;
	masterServiceId: any;
	address: Address;
}

export interface Address {
	id: number;
	city: string;
	address: string;
	salonBranchId: number;
}

export interface Booking {
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
	salonId: number;
	salonBranchId: number;
	services: Service[];
}

export interface Service {
	id: number;
	price: number;
	time: number;
	name: string;
	tagName: string;
	salonId: number;
	bookingId: number;
}

export interface MasterService {
	id: number;
	price: number;
	time: number;
	name: string;
	tagName: string;
	salonId: number;
	bookingId: number;
}

export interface IGetFreeTimeParams {
	date: Date;
	masterId: number | string;
	servicesIdList: string[];
}
