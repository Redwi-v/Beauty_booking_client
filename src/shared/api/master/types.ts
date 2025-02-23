export interface IGetMasterListParams {
	skip: number;
	take: number;
	search: string;
	salonBranchId: number;
	salonId: number;
	date?: string,
	time?: string
}

export interface IMaster {
	id: number;
	salonBranchId: number;
	rating: number;
	speciality: string;
	about: string;
	name: string;
	lastName: string;
	avatar: string;
	canChangeSchedule: boolean;
	canChangeBookingTime: boolean;
	telegramId: string;

	masterService: IMasterService[];
	workingsDays: IWorkingsDay[];
}

export interface IMasterService {
	id: number;
	serviceTagId: number;
	name: string;
	price: number;
	duration: number;
	bookingId: any;
	eventsId: number;
}

export interface IWorkingsDay {
	id: number;
	day: string;
	masterAccountId: number;
	start: string;
	end: string;
	freeTime: string[];
	allowedRecordingTime: number[];
}


// schedule 

export interface ISchedule {
  id: number
  day: string
  masterAccountId: number
  start: string
  end: string
  freeTime: string[]
  allowedRecordingTime: number[]
}
