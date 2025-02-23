'use client';
import { FC, useState } from 'react';
import s from './specialists.list.module.scss';
import Image from 'next/image';
import Link from 'next/link';
import { CheckBox } from '@/shared/ui/checkbox';
import { Controls } from '@/widgets/controls';
import { useAppointmentStore } from '@/features/appointment/model/appointment.store';
import { useParams, useRouter } from 'next/navigation';
import { Button, buttonTypes } from '@/shared/ui';
import { useQuery } from 'react-query';
import { getFileUrl } from '@/shared/api/instance/instance';
import moment from 'moment';
import { MasterApi } from '@/shared/api';

interface SpecialistsListProps {}

export const SpecialistsList: FC<SpecialistsListProps> = () => {
	const { setMasterId, date, time, masterId, services, branch } = useAppointmentStore(
		state => state,
	);

	const router = useRouter();

	const { salonId } = useParams();

	const { data } = useQuery({
		queryKey: ['masters', date, time, masterId, services],
		queryFn: () =>
			MasterApi.getMastersList({
				salonBranchId: branch.id,
				salonId: +salonId,
				search: '',
				skip: 0,
				take: 100,
				date,
				time,
			}),
	});

	const clickHandler = () => {
		if (!masterId) setMasterId(data.list?.[0].id);

		if (services.length === 0) return router.push('choice.service');
		if (!time && !date && services.length !== 0) return router.push('choice.date');

		router.push('entry.confirm');
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

				{data?.list &&
					data.list.map((item, index) => (
						<li
							className={`${s.item} flex gap-20`}
							key={index}
							onClick={() => setMasterId(item.id)}
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

						{data?.list.length !== 0 && (
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
