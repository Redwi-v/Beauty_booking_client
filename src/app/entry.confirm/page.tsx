import { EntryConfirmView } from '@/views/entry.confirm.view';
import { NextPage } from 'next';
import { FC } from 'react';

interface EntryConfirmProps {}

const EntryConfirm: FC<EntryConfirmProps> = () => {
	const isClient = typeof window !== 'undefined';

	return <>{isClient && <EntryConfirmView />}</>;
};

export default EntryConfirm;
