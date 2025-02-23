import { FC, useEffect } from 'react';
import s from './studio.preview.module.scss';
import Image from 'next/image';
import { getFileUrl } from '@/shared/api/instance/instance';
import Select from '@/shared/ui/select/ui/select';
import { useAppointmentStore } from '@/features/appointment/model/appointment.store';
import { ISalon } from '@/shared/api';
import Link from 'next/link';

interface StudioPreviewProps {
	data: ISalon;
	session: any
}

export const StudioPreview: FC<StudioPreviewProps> = props => {
	const { data, session } = props;

	const { branch, setSalonBranch } = useAppointmentStore();

	const branches = data
		? data.branches.map(branch => ({
				label: branch?.address,
				value: branch?.id,
		  }))
		: [];

	console.log(data);

	useEffect(() => {
		if (!data?.branches || branch) return;
		setSalonBranch(data.branches[0]);
	}, [data]);

	return (
		<div className={`${s.link} flex flex-col items-center`}>
			<div className={s.auth_link}>
				<Link href={'/auth'}>{ session? 'Выйти': "Войти"  }</Link>
			</div>
			<Image
				className={s.logo}
				width={80}
				height={80}
				src={getFileUrl(data?.logoUrl)}
				alt={data?.name}
			/>

			<div className={`${s.info} pt-10`}>
				<h1>{data?.name}</h1>
				<Select
					activeValue={branch?.id}
					setActiveValue={id => setSalonBranch(data.branches.find(branch => branch.id === id))}
					className={s.select_address}
					label='hello'
					options={branches}
				/>
			</div>
		</div>
	);
};
