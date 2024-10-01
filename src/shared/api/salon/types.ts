export interface IGetSalonRes {
	salonId: number;
	salonOwnerAccountId: number;
	name: string;
	logoUrl: string;
	isOpen: boolean;
	description: string;
	createdAt: string;
	updatedAt: string;
	branches: Branch[];
}

export interface Branch {
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
