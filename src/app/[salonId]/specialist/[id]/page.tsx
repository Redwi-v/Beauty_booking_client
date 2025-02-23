'use client';
import { NextPage } from 'next';

import s from './specialist.module.scss';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { useQuery } from 'react-query';
import { MasterApi } from '@/shared/api';
import { getFileUrl } from '@/shared/api/instance/instance';

interface SpecialistPageProps {}

const SpecialistPage: NextPage<SpecialistPageProps> = () => {
	const router = useRouter();
	const params = useParams();

	const { data } = useQuery({
		queryKey: ['Master', params.id],
		queryFn: () => MasterApi.getOne(+params.id),
	});

	return (
		<div className={`${s.content}`}>
			<Link
				className={s.back}
				href={'/'}
			>
				<Image
					width={40}
					height={40}
					alt='back'
					src={'/icons/arrow.svg'}
				/>
			</Link>

			<div className={s.profile}>
				<div className={s.avatar}>
					<Image
						width={80}
						height={80}
						src={getFileUrl(data.data.avatar)}
						alt='avatar'
					/>
				</div>

				<h1 className={s.name}>
					{data?.data.name} {data?.data.lastName}
				</h1>

				<span className={s.direction}>{data?.data.speciality}</span>

				<div className={s.reviews}>
					<div className={s.stars}>
						<Image
							src={'/icons/star.svg'}
							alt='star'
							width={24}
							height={24}
						/>
						<Image
							src={'/icons/star.svg'}
							alt='star'
							width={24}
							height={24}
						/>
						<Image
							src={'/icons/star.svg'}
							alt='star'
							width={24}
							height={24}
						/>
						<Image
							src={'/icons/star.svg'}
							alt='star'
							width={24}
							height={24}
						/>
						<Image
							src={'/icons/star.svg'}
							alt='star'
							width={24}
							height={24}
						/>
					</div>

					<span className={s.count}>20 Отзывов</span>
				</div>
			</div>

			<div className={`${s.sub_info} container`}>

				<h2>О специалисте</h2>

				<p className={s.sub_info__text}>
				{data?.data.about}
				</p>
			</div>
		</div>
	);
};

export default SpecialistPage;
