'use client';
import { FC, useState } from 'react';
import s from './specialists.list.module.scss';
import Image from 'next/image';
import Link from 'next/link';
import { CheckBox } from '@/shared/ui/checkbox';
import { Controls } from '@/widgets/controls';
import { useAppointmentStore } from '@/features/appointment/model/appointment.store';
import { useRouter } from 'next/navigation';
import { Button, buttonTypes } from '@/shared/ui';
import WebApp from '@twa-dev/sdk';
import { useQuery } from 'react-query';
import { mastersApi } from '@/shared/api/masters';
import { getFileUrl } from '@/shared/api/instance/instance';
import moment from 'moment';

interface SpecialistsListProps {}

export const SpecialistsList: FC<SpecialistsListProps> = () => {
	const { setMasterId, date, time, masterId, services } = useAppointmentStore(state => state);

	const router = useRouter();

	const { data } = useQuery({
		queryKey: ['masters', date, time, masterId, services],
		queryFn: () =>
			mastersApi.getList({
				salonId: typeof window !== 'undefined' && +WebApp.initDataUnsafe.start_param,
				date: date ? new Date(date) : undefined,
				servicesIdList: services,
				time: time && moment().hours(+time.split(':')[0]).minutes(+time.split(':')[1]).toDate(),
			}),
	});

	const clickHandler = () => {
		if (!masterId) setMasterId(data.data.masters[0].id);

		if (services.length === 0) return router.push('/choice.service');
		if (!time && !date && services.length !== 0) return router.push('/choice.date');

		router.push('/entry.confirm');
	};

	const isEndStep = date && time && services.length !== 0;

	return (
		<section className={`${s.section} container`}>
			<h1 className='h1'>Выбрать специалиста</h1>

			<ul className={`${s.list} flex flex-col gap-20`}>
				<li className={`${s.item} ${s.all_items} flex`}>
					<Image
						alt='peoples'
						src={'/icons/peoples_full_grey.svg'}
						width={32}
						height={32}
					/>

					<p className='p'>Любой специалист</p>

					<CheckBox
						isActive={masterId === null}
						onClick={() => setMasterId(null)}
						className={s.checkbox}
					/>
				</li>

				{data?.data?.masters &&
					data.data.masters.map((item, index) => (
						<li
							className={`${s.item} flex gap-20`}
							key={index}
						>
							<Image
								className={s.avatar}
								width={56}
								style={{ objectFit: 'cover' }}
								height={56}
								alt={item.name}
								src={item.avatar ? getFileUrl(item.avatar) : '/images/no_avatar.jpg'}
							/>

							<div className={s.info}>
								<p className={`${s.name}  p`}>
									{item.name}

									<Link
										onClick={e => e.stopPropagation()}
										className={s.link}
										href={`/specialist/${item.id}`}
									>
										{' '}
										i{' '}
									</Link>
								</p>
								<div className={`${s.main_info} flex`}>
									<p>
										<Image
											className='mr-5'
											width={24}
											height={24}
											src='/icons/star.svg'
											alt={'star'}
										/>
										<Image
											className='mr-5'
											width={24}
											height={24}
											src='/icons/star.svg'
											alt={'star'}
										/>
										<Image
											className='mr-5'
											width={24}
											height={24}
											src='/icons/star.svg'
											alt={'star'}
										/>
										<Image
											className='mr-5'
											width={24}
											height={24}
											src='/icons/star.svg'
											alt={'star'}
										/>
										<Image
											className='mr-5'
											width={24}
											height={24}
											src='/icons/star.svg'
											alt={'star'}
										/>
									</p>
									<p>{20} отзывов</p>
								</div>
							</div>

							<CheckBox
								isActive={masterId === item.id}
								onClick={() => setMasterId(item.id)}
								className={s.checkbox}
							/>
						</li>
					))}
			</ul>

			<Controls>
				{isEndStep ? (
					<Button
						buttonParams={{
							onClick: clickHandler,
						}}
						type={buttonTypes.blue}
					>
						Оформить запись
					</Button>
				) : (
					<>
						<Button
							buttonParams={{
								onClick: () => router.back(),
							}}
						>
							Назад
						</Button>

						{data?.data.masters.length !== 0 && (
							<Button
								buttonParams={{
									onClick: clickHandler,
								}}
								type={buttonTypes.blue}
							>
								Далее
							</Button>
						)}
					</>
				)}
			</Controls>
		</section>
	);
};
