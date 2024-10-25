'use client';
import { Header } from '@/widgets/header';
export default function Layout({ children }: Readonly<{ children: React.ReactNode }>) {
	return (
		<>
			<>
				<Header />
				<main className='content'>{children}</main>
			</>
		</>
	);
}
