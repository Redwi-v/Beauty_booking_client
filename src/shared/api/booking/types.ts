import { IMasterService } from '../master/types';
import { ISalon, ISalonBranch } from '../salon/types';
import { IMasterAccount } from '../services/types';

export interface ICreateBookingParams {
	// 2024.12.17 12:00
	start: string;
	duration: number;
	salonBranch: number;
	title: string;
	description?: string;
	masterId: number;
	servicesIdArr: number[];

	clientNumber: string;
	clientName: string;
	clientLastName: string;
	clientComment: string;

}

export interface IBooking {
	id: number;
	start: string;
	duration: number;
	title: string;
	description: string;
	masterAccountId: number;
	salonId: number;
	salonBranchId: number;
	clientNumber: string;
	clientName: string;
	clientLastName: string;
	clientComment: string;

	master: IMasterAccount;

	services: IMasterService[];
	salon: ISalon;
  salonBranch: ISalonBranch
}

