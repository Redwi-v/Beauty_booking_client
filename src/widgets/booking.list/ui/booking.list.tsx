'use client';
import { ClockIcon, DotsIcon } from '@/shared/icons';
import s from './booking.module.scss';

import { FC } from 'react';
import { useMutation, useQuery } from 'react-query';
import { bookingApi } from '@/shared/api';
import WebApp from '@twa-dev/sdk';
import { IGetBookingListRes } from '@/shared/api/booking/types';
import moment from 'moment';
import { Menu, MenuItem } from '@szhsin/react-menu';
moment.locale('ru');
interface IBookingListProps {}

export const BookingList: FC<IBookingListProps> = props => {
	const {} = props;

	const { data, refetch } = useQuery({
		queryKey: ['BookingList'],
		queryFn: () =>
			bookingApi.getListById(typeof window !== 'undefined' && WebApp.initDataUnsafe.user.id),
	});

	const deleteItemMutation = useMutation({
		mutationFn: (id: number) => bookingApi.delete(id),
		onSuccess: () => {
			refetch();
		},
	});

	return (
		<div className={`${s.booking_list} container`}>
			<div className={s.header}>
				<ClockIcon />
				<h2>Мои записи</h2>
			</div>

			<ul className={s.list}>
				{data &&
					data?.data.map(item => (
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

const BookingItem: FC<IGetBookingListRes & { deleteItem: (id: number) => void }> = props => {
	const { master, time, services, id, deleteItem } = props;

	return (
		<li className={s.item}>
			<div className={s.time_block}>
				<span className={s.time}>{moment(time).format('HH:mm')}</span>
				<span className={s.duration}>
					{moment()
						.minutes(0)
						.hours(0)
						.add({ minutes: services.reduce((prev, service) => prev + service.time, 0) })
						.format('HH:mm')}{' '}
					ч
				</span>
			</div>

			<div className={s.info}>
				<span className={s.speciality}>{master?.speciality}</span>
				<span className={s.name}>
					{master?.name} {master?.lastName}
				</span>
				<span className={s.date}>{moment(time).format('DD MMMM YYYY (dd)')}</span>
			</div>

			<div className={s.menu}>
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
				{/* <div className={s.actions}>
					<button>Отменить заказ</button>
					<button>Изменить бронь</button>
				</div> */}
			</div>
		</li>
	);
};
