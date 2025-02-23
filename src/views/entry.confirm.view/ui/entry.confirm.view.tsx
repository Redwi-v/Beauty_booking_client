'use client';
import { Header } from '@/widgets/header';
import { FC, useEffect, useState } from 'react';
import s from './entry.confirm.view.module.scss';
import Image from 'next/image';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { Button, buttonTypes } from '@/shared/ui';
import { useAppointmentStore } from '@/features/appointment/model/appointment.store';
import moment from 'moment';
import 'moment/locale/ru';
import { useMutation, useQuery } from 'react-query';
import { getFileUrl } from '@/shared/api/instance/instance';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Store } from 'react-notifications-component';
import { Input } from '@/shared/ui/input/ui';
import { IMasterService, MasterApi } from '@/shared/api';
import { ServicesApi } from '@/shared/api/services';
import { BookingApi } from '@/shared/api/booking';
import { ICreateBookingParams } from '@/shared/api/booking/types';
import { UserApi } from '@/shared/api/user';
moment.locale('ru');

interface IEntryConfirmViewProps {}

type Inputs = {
	clientComment: string;
	clientName: string;
	clientLastName: string;
	clientPhone: string;
};

export const EntryConfirmView: FC<IEntryConfirmViewProps> = props => {
	const {} = props;

	const router = useRouter();

	const { data: session } = useQuery({
		queryKey: ['SESSION'],
		queryFn: () => UserApi.getSession(),
	});

	const { salonId } = useParams();

	const { clear, date, masterId, services, time, branch } = useAppointmentStore(state => state);

	const { data: activeMaster } = useQuery({
		queryKey: ['activeMaster', masterId],
		queryFn: () => MasterApi.getOne(masterId),
		enabled: !!masterId,
	});

	const { data: servicesData } = useQuery({
		queryKey: ['Services'],
		queryFn: () =>
			ServicesApi.getServicesList({
				masterId: masterId,
				salonId: +salonId,
				search: '',
			}),
	});

	const {
		register,
		handleSubmit,
		watch,
		setValue,
		formState: { errors },
	} = useForm<Inputs>({
		mode: 'onChange',
	});

	useEffect(() => {

		if ( session ) {
			setValue('clientName', session.data.name)
			setValue('clientLastName', session.data.lastName)
			setValue('clientPhone', session.data.phoneNumber)
		}

	}, [ session ])

	const onSubmit: SubmitHandler<Inputs> = data => {
		const form: ICreateBookingParams = {
			clientComment: data.clientComment || 'нет',
			clientName: data.clientName,
			clientNumber: data.clientPhone,
			clientLastName: data.clientLastName,
			masterId: +masterId,
			salonBranch: branch.id,
			servicesIdArr: services,
			duration: services.reduce((prevValue, serviceId) => {
				const serviceInArr = servicesData.data.list.find(service => service.id === serviceId);
				if (!serviceInArr) return prevValue;
				const time = serviceInArr.duration + prevValue;

				return time;
			}, 0),
			title: 'Запись ' + data.clientName,
			description: '',
			start: moment(date)
				.hours(+time.split(':')[0])
				.minutes(+time.split(':')[1])
				.format('YYYY.MM.DD HH:mm'),
		};

		createBookingMutation.mutate(form);
	};

	const createBookingMutation = useMutation({
		mutationFn: (data: ICreateBookingParams) => BookingApi.createBooking(data),
		onSuccess: booking => {
			clear();
			router.push('/' + salonId + `/event/${booking.data.id}`);

			const bookingArray = JSON.parse(window.localStorage.getItem('BOOKING')) || [];
			window.localStorage.setItem('BOOKING', JSON.stringify([...bookingArray, booking.data.id]));
		},
		onError: (error: any) => {
			Store.addNotification({
				title: 'Ошибка',
				message: error.message[0],
				type: 'danger',
				insert: 'top',
				container: 'top-full',
				animationIn: ['animate__animated', 'animate__fadeIn'],
				animationOut: ['animate__animated', 'animate__fadeOut'],
				dismiss: {
					duration: 5000,
					onScreen: true,
				},
			});
		},
	});

	let selectedServices: IMasterService[] = [];
	servicesData?.data?.list?.forEach(item => {
		if (services.includes(item.id)) selectedServices.push(item);
	});

	const master = activeMaster?.data;
	const totalMinutes = selectedServices.reduce((value, service) => {
		return (value += service.duration);
	}, 0);

	return (
		<div className={`${s.wrapper}`}>
			<Header withBack />

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

					<Edit to={'choice.specialist'} />
				</div>

				<div className={`${s.price} ${s.border_bottom}`}>
					<Edit to='choice.service' />

					<h2 className={`${s.sub_title} h2`}>Услуги</h2>

					{selectedServices.map(service => (
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
						<Edit to='choice.date' />

						<span className='flex'>
							<Image
								width={24}
								height={24}
								src={'/icons/calendar.svg'}
								alt='calendar'
							/>
							{moment(date).locale('ru').format('DD.MM.YYYY (dd)')}
						</span>

						{time && (
							<span className='flex'>
								<Image
									width={24}
									height={24}
									src={'/icons/time.svg'}
									alt='time'
								/>
								{time} -{' '}
								{moment()
									.hours(+time.split(':')[0])
									.minutes(+time.split(':')[1])
									.add({ minutes: totalMinutes })
									.format('HH:mm')}
							</span>
						)}
					</div>
				</div>
			</div>

			<form className={`${s.form} container`}>
				<h2 className='h2'> Личные данные</h2>

				<Input
					title='Имя'
					placeholder='Введите ваше имя'
					error={errors?.clientName?.message}
					required
					inputProps={{
						...register('clientName', { required: { value: true, message: 'Поле обязательное' } }),
					}}
				/>

				<Input
					title='Фамилия'
					placeholder='Введите вашу фимилию'
					error={errors?.clientLastName?.message}
					required
					inputProps={{
						...register('clientLastName', {
							required: { value: true, message: 'Поле обязательное' },
						}),
					}}
				/>
				<Input
					title='Телефон'
					mask='+7 999 999 99 99'
					placeholder='Номер с кодом страны'
					error={errors?.clientPhone?.message}
					required
					inputProps={{
						...register('clientPhone', { required: { value: true, message: 'Поле обязательное' } }),
					}}
				/>

				<Input
					title='E-mail'
					placeholder='Введите данные'
				/>
				<Input
					title='Комментарий'
					placeholder='Комментарий к записи'
					inputProps={{ ...register('clientComment') }}
				/>

				<CheckBox />
				<div className={s.controls}>
					<Button
						buttonParams={{ onClick: handleSubmit(onSubmit) }}
						type={buttonTypes.blue}
					>
						Подтвердить запись
					</Button>
				</div>
			</form>
		</div>
	);
};

const CheckBox = () => {
	const [isActive, setIsActive] = useState(false);

	return (
		<div
			onClick={() => setIsActive(prev => !prev)}
			className={`${s.checkbox}`}
		>
			<div className={`${s.mark} ${isActive && s.active}`}>
				{isActive && (
					<Image
						width={14}
						height={14}
						src={'/icons/ok.svg'}
						alt='checkbox mark'
					/>
				)}
			</div>

			<p>
				Я принимаю <a href='/'>Условия предоставления услуг</a> и
				<a href='/'> Политика конфиденциальности.</a>
			</p>
		</div>
	);
};

const Edit: FC<{ to: string }> = ({ to }) => (
	<Link
		href={to}
		className={s.edit}
	>
		<Image
			width={24}
			height={24}
			src={'/icons/pencil.svg'}
			alt='edit'
		/>
	</Link>
);
