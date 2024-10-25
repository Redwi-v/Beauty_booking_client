'use client';
import { UserApi } from '@/shared/api/user';
import { HomeView } from '@/views/home';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useQuery } from 'react-query';

export default function Home({ params }) {
	const { data: user, isFetching } = useQuery({
		queryFn: () => UserApi.getSession(),
		queryKey: ['SESSION'],
		retry: false,
	});

	const { data: profile, isFetching: profileFetching } = useQuery({
		queryFn: () => UserApi.getProfile(),
		queryKey: ['PROFILE'],
		retry: false,
	});

	const router = useRouter();

	// useEffect(() => {
	// 	window.localStorage.setItem('LAST_SALON_ID', params.salonId);
	// }, [params?.salonId]);

	useEffect(() => {
		if ((!isFetching && !user) || (!profileFetching && profile?.data)) {
			router.push('/auth');
		}
	}, [user, isFetching, profileFetching, profile]);

	if (isFetching || profileFetching) return <></>;

	return (
		<>
			<HomeView salonId={params?.salonId} />
		</>
	);
}
