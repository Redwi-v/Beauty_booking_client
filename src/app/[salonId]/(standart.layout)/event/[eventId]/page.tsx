'use client';

import { Header } from '@/widgets/header';
import { useParams, useRouter } from 'next/navigation';

import s from './event.page.module.scss';
import { useMutation, useQuery } from 'react-query';
import { BookingApi } from '@/shared/api/booking';
import { useEffect } from 'react';
import PageLoader from 'next/dist/client/page-loader';
import { HashLoader } from 'react-spinners';
import Image from 'next/image';
import { getFileUrl } from '@/shared/api/instance/instance';
import moment from 'moment';
import 'moment/locale/ru';
import { YMaps, Map, Placemark } from '@pbe/react-yandex-maps';
import { Button, buttonTypes } from '@/shared/ui';

moment.locale('ru');

export default function Event({ params }) {
	const urlPrams = useParams();
	const eventId = urlPrams.eventId as string;

	const router = useRouter();

	const { data: eventData, isLoading } = useQuery({
		queryKey: ['BOOKING', eventId],
		queryFn: () => BookingApi.getBookingById(eventId),
	});

	const removeEventMutation = useMutation({
		mutationFn: () => BookingApi.deleteBooking(eventData.data.id),
		onMutate: () => {
			router.push('/' + eventData.data.salonId)
		}
	});

	if (!eventData && isLoading)
		return (
			<HashLoader
				className={s.loader}
				color='#0FA3E2'
			/>
		);
	if (!eventData && !isLoading) router.push('/' + urlPrams.salonId);

	const { master, services, start, duration } = eventData?.data;

	return (
		<>
			<div className={s.content}>
				<div className={`${s.main_info} container`}>
					<h1 className='h1'>Детали записи</h1>

					<div className={`${s.specialist} ${s.border_bottom}`}>
						<div className={s.avatar}>
							<Image
								width={56}
								height={56}
								alt='avatar'
								src={master?.avatar ? getFileUrl(master.avatar) : '/images/no_avatar.jpg'}
							/>
						</div>

						<div className={s.info}>
							<p>
								{master?.name} {master?.lastName}
							</p>
							<p>{master?.speciality}</p>
						</div>
					</div>

					<div className={`${s.price} ${s.border_bottom}`}>
						<h2 className={`${s.sub_title} h2`}>Услуги</h2>

						{services.map(service => (
							<div
								key={service.id}
								className={s.price_item}
							>
								<span>{service.name}</span>
								<span>{service.price} ₽</span>
							</div>
						))}
					</div>

					<div className={s.time}>
						<h2 className={`${s.sub_title} h2`}>Дата и время</h2>

						<div className={`${s.info} flex`}>
							<span className='flex'>
								<Image
									width={24}
									height={24}
									src={'/icons/calendar.svg'}
									alt='calendar'
								/>
								{moment(start).locale('ru').format('DD.MM.YYYY (dd)')}
							</span>

							{start && (
								<span className='flex'>
									<Image
										width={24}
										height={24}
										src={'/icons/time.svg'}
										alt='time'
									/>
									{start.split(' ')[1]} -{' '}
									{moment()
										.hours(+start.split(' ')[1].split(':')[0])
										.minutes(+start.split(' ')[1].split(':')[1])
										.add({ minutes: duration })
										.format('HH:mm')}
								</span>
							)}
						</div>
					</div>

					<YMaps>
						<div className={s.map}>
							{eventData.data && (
								<Map
									width={'100%'}
									height={'400px'}
									defaultState={{
										center: [
											+eventData.data.salonBranch.latitude,
											+eventData.data.salonBranch.longitude,
										],
										zoom: 12,
									}}
								>
									<Placemark
										geometry={[
											eventData.data.salonBranch.latitude,
											eventData.data.salonBranch.longitude,
										]}
									></Placemark>
								</Map>
							)}
						</div>
					</YMaps>

					<Button
						type={buttonTypes.red}
						buttonParams={{
							className: s.cancel_button,
							onClick: () => {
								removeEventMutation.mutate();
							},
						}}
					>
						Отменить запись
					</Button>
				</div>
			</div>
		</>
	);
}
