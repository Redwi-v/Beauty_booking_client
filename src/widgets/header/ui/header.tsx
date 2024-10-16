
'use client'
import { FC } from "react";
import s from './header.module.scss'
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useQuery } from 'react-query';
import { salonApi } from '@/shared/api/salon';
import WebApp from '@twa-dev/sdk';
import { getFileUrl } from '@/shared/api/instance/instance';
import { useAppointmentStore } from '@/features/appointment/model/appointment.store';

interface HeaderProps {
	withBack?: boolean;
}

export const Header: FC<HeaderProps> = ({ withBack }) => {
	const router = useRouter();

	const { data } = useQuery({
		queryKey: ['SalonData'],
		queryFn: () =>
			salonApi.getSalonById(typeof window !== 'undefined' && +WebApp.initDataUnsafe.start_param),
	});

	const branch = useAppointmentStore(store => store.branch);

	return (
		<>
			{
				<header className={`${s.header} container`}>
					<div className={s.top}>
						{withBack && (
							<button
								className={s.back}
								onClick={() => router.back()}
							>
								<Image
									alt='back'
									width={30}
									height={40}
									src={'/icons/arrow.svg'}
								/>
							</button>
						)}
					</div>

					<div className={`${s.main} ${withBack && s.withTop}`}>
						<div className={s.info}>
							<h1 className='h1'>{data?.data.name}</h1>
							<h3 className='h3'>{branch?.address?.address}</h3>
						</div>

						<div className={s.avatar}>
							<Image
								alt='avatar'
								src={getFileUrl(data?.data?.logoUrl)}
								width={48}
								height={48}
							/>
						</div>
					</div>
				</header>
			}
		</>
	);
};
 