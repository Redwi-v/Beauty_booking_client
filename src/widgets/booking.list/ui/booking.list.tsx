'use client';
import { ClockIcon, DotsIcon } from '@/shared/icons';
import s from './booking.module.scss';

import { FC } from 'react';
import { useMutation, useQuery } from 'react-query';
import moment from 'moment';
import { Menu, MenuItem } from '@szhsin/react-menu';
import 'moment/locale/ru';
import { BookingApi } from '@/shared/api/booking';
import { IBooking } from '@/shared/api/booking/types';
import Link from 'next/link';
import { useParams } from 'next/navigation';
moment.locale('ru');
interface IBookingListProps {
	session: { id: number, email: string, bookingList: IBooking[] }
}

export const BookingList: FC<IBookingListProps> = props => {
	const {session} = props;

	const deleteItemMutation = useMutation({
		mutationFn: (id: number) => BookingApi.deleteBooking(id),

	});

	return (
		<div className={`${s.booking_list} container`}>
			{ session?.id && <div className={s.header}>
				<ClockIcon />
				<h2>Мои записи</h2>
			</div>}

			<ul className={s.list}>
				{session?.id &&
					session?.bookingList?.map(item => (
						<BookingItem
							key={item.id}
							deleteItem={deleteItemMutation.mutate}
							{...item}
						/>
					))}
			</ul>
		</div>
	);
};

const BookingItem: FC<IBooking & { deleteItem: (id: number) => void }> = props => {
	const { master, start, services, id, deleteItem } = props;

	const { salonId } = useParams();


	return (
		<Link href={`${salonId}/event/${id}`} className={s.item}>
			<div className={s.time_block}>
				<span className={s.time}>{moment(start).format('HH:mm')}</span>
				<span className={s.duration}>
					{moment()
						.minutes(0)
						.hours(0)
						.add({ minutes: services.reduce((prev, service) => prev + service.duration, 0) })
						.format('HH:mm')}{' '}
					ч
				</span>
			</div>

			<div className={s.info}>
				<span className={s.speciality}>{master?.speciality}</span>
				<span className={s.name}>
					{master?.name} {master?.lastName}
				</span>
				<span className={s.date}>{moment(start).locale('ru').format('DD MMMM YYYY (dd)')}</span>
			</div>

			{/* <div className={s.menu}>
				<Menu
					menuButton={
						<button className={s.menu_button}>
							<DotsIcon />
						</button>
					}
				>
					<MenuItem
						onClick={() => {
							deleteItem(id);
						}}
					>
						Отменить запись
					</MenuItem>
				</Menu>

			</div> */}
		</Link>
	);
};
