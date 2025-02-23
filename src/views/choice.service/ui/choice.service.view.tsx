'use client';

import { Button, buttonTypes } from '@/shared/ui';
import { FC, useEffect, useState } from 'react';
import s from './choice.service.view.module.scss';
import Image from 'next/image';
import { Controls } from '@/widgets/controls';
import { CheckBox } from '@/shared/ui/checkbox';
import { useAppointmentStore } from '@/features/appointment/model/appointment.store';
import { useParams, useRouter } from 'next/navigation';
import { useQuery } from 'react-query';
import moment from 'moment';
import useDebounce from '@/shared/scripts/hooks/use.debounce';
import { Rethink_Sans } from 'next/font/google';
import { ServicesApi } from '@/shared/api/services';
import { IMasterService, MasterApi } from '@/shared/api';
import { IServiceTag } from '@/shared/api/services/types';

interface ChoiceServiceViewProps {}

export const ChoiceServiceView: FC<ChoiceServiceViewProps> = () => {
	const { toggleServices, date, time, masterId, services } = useAppointmentStore(state => state);

	const router = useRouter();

	const { salonId } = useParams();

	const clickHandler = () => {
		if (!masterId) return router.push('choice.specialist');
		if (!time && !date && masterId) return router.push('choice.date');

		router.push('entry.confirm');
	};

	const isEndStep = date && time && masterId;

	return (
		<div className='container'>
			<h1 className='h1 pt-25'>Выбрать услуги</h1>
			<ListWithTabs />

			<Controls>
				{isEndStep ? (
					<Button
						buttonParams={{
							disabled: !services.length,
							onClick: clickHandler,
						}}
						type={buttonTypes.blue}
					>
						{' '}
						Оформить запись{' '}
					</Button>
				) : (
					<>
						<Button
							buttonParams={{
								onClick: () => router.back(),
							}}
						>
							{' '}
							Назад{' '}
						</Button>

						<Button
							buttonParams={{
								onClick: clickHandler,
								disabled: !services.length,
							}}
							type={buttonTypes.blue}
						>
							{' '}
							Далее{' '}
						</Button>
					</>
				)}
			</Controls>
		</div>
	);
};

const ListWithTabs = () => {
	const { toggleServices, services, masterId, time, date, branch } = useAppointmentStore(
		state => state,
	);

	const [search, setSearch] = useState('');
	const debounceSearch = useDebounce(search, 1000)

	const { salonId } = useParams();

	const { data: servicesData } = useQuery({
		queryKey: ['SERVICES', masterId, branch.id, debounceSearch],
		queryFn: () =>
			ServicesApi.getServicesList({
				masterId,
				salonId: Array.isArray(salonId) ? undefined : +salonId,
				search: search || undefined,
			}),
	});

	const filteredTags: [IServiceTag, IMasterService[]][] = [];

	servicesData?.data?.list?.forEach(item => {
		const haveTabInFilterIndex = filteredTags.findIndex(filterItem => {
			if (filterItem[0].id === item.serviceTag.id) return true;
		});

		
		if (haveTabInFilterIndex !== -1) {
			filteredTags[haveTabInFilterIndex][1].push(item);
		} else {
			filteredTags.push([item.serviceTag, [item]]);
		}
	});

	const { data: masterData } = useQuery({
		queryKey: ['MasterData', masterId],
		queryFn: () => MasterApi.getOne(masterId),
		enabled: !!masterId,
	});




	return (
		<div className={`${s.content}`}>
			<div className={s.top_section}>
				<div className=''>
					<div className={s.input_wrapper}>
						<div className={s.icon}>
							<Image
								alt='search'
								src={'/icons/search.svg'}
								width={18}
								height={18}
							/>
						</div>
						<input
							placeholder='Поиск по услугам'
							className={s.input}
							type='text'
							value={search}
							onChange={e => setSearch(e.target.value)}
						/>
					</div>

					<div className={s.tabs_wrapper}>
						<div className={s.tabs}>
							{filteredTags &&
								filteredTags.map(item => (
									<a
										href={'#' + item[0].name}
										key={item[0].id}
										className={s.tab}
									>
										{item[0].name}
									</a>
								))}
						</div>
					</div>
				</div>
			</div>

			<div className={s.list}>
				{servicesData?.data?.list &&
					filteredTags.map((item, topIndex) => (
						<>
							<div key={item[0].id}>
								<h1
									className='h1'
									id={item[0].name}
								>
									{item[0].name}
								</h1>
							</div>

							<ul className='mt-20'>
								{item[1].map((service, index) => (
									<li
										className={`${s.item}`}
										key={index}
									>
										<p className={`${s.name} p`}>{service.name}</p>

										<div className={s.item_characteristics}>
											<p className='p'>
												<Image
													src={'/icons/time.svg'}
													width={24}
													height={24}
													alt='time'
												/>
												{moment().hours(0).minutes(service.duration).format('HH:mm')} ч
											</p>
											<p className='p'>
												<Image
													src={'/icons/ruble.svg'}
													width={24}
													height={24}
													alt='time'
												/>
												{service.price}р
											</p>
										</div>

										<CheckBox
											isActive={services.includes(service.id)}
											onClick={() => toggleServices(service.id)}
										/>
									</li>
								))}
							</ul>
						</>
					))}
			</div>
		</div>
	);
};
