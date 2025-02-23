
'use client'
import { FC } from "react";
import s from './header.module.scss'
import Image from "next/image";
import { useParams, useRouter } from 'next/navigation';
import { useQuery } from 'react-query';
import { getFileUrl } from '@/shared/api/instance/instance';
import { useAppointmentStore } from '@/features/appointment/model/appointment.store';
import { SalonApi } from "@/shared/api";
import Link from "next/link";

interface HeaderProps {
	withBack?: boolean;
}

export const Header: FC<HeaderProps> = ({ withBack }) => {
	const router = useRouter();

	const { salonId } = useParams();

	const { data } = useQuery({
		queryKey: ['SalonData'],
		queryFn: () => SalonApi.getSalonById(+salonId),
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

					<Link href={'/' + salonId} className={`${s.main} ${withBack && s.withTop}`}>
						<div className={s.info}>
							<h1 className='h1'>{data?.name}</h1>
							<h3 className='h3'>{branch?.address}</h3>
						</div>

						<div className={s.avatar}>
							<Image
								alt='avatar'
								src={getFileUrl(data?.logoUrl)}
								width={100}
								height={100}
								quality={100}
							/>
						</div>
					</Link>
				</header>
			}
		</>
	);
};
 