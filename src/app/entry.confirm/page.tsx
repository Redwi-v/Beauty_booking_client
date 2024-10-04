'use client';
import { EntryConfirmView } from '@/views/entry.confirm.view';
import { NextPage } from 'next';
import { FC } from 'react';

interface EntryConfirmProps {}

const EntryConfirm: FC<EntryConfirmProps> = () => {
	return (
		<>
			<EntryConfirmView />
		</>
	);
};

export default EntryConfirm;
