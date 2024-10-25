'use client';
import { UserApi } from '@/shared/api/user';
import { HomeView } from '@/views/home';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useQuery } from 'react-query';

export default function Home({ params }) {
	return (
		<>
			<HomeView salonId={params?.salonId} />
		</>
	);
}
