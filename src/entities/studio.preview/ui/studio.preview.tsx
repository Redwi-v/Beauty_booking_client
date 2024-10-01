import { FC, useEffect, useState } from 'react';
import s from './studio.preview.module.scss';
import Link from 'next/link';
import type { IStudioPreviewInfo } from '../types/types';
import Image from 'next/image';
import WebApp from '@twa-dev/sdk';
import { IGetSalonRes } from '@/shared/api/salon/types';
import { getFileUrl } from '@/shared/api/instance/instance';
import Select from '@/shared/ui/select/ui/select';
import { useAppointmentStore } from '@/features/appointment/model/appointment.store';

interface StudioPreviewProps {
	data: IGetSalonRes;
}

export const StudioPreview: FC<StudioPreviewProps> = props => {
	const { data } = props;

	const { branch, setSalonBranch } = useAppointmentStore();

	const branches = data
		? data.branches.map(branch => ({
				label: branch?.address?.city + ' ' + branch?.address?.address,
				value: branch?.id,
		  }))
		: [];

	useEffect(() => {
		if (!data || branch) return;
		setSalonBranch(data.branches[0]);
	}, [data]);

	return (
		<div className={`${s.link} flex flex-col items-center`}>
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
