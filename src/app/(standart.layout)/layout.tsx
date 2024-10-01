import { Header } from '@/widgets/header';

export default function Layout({ children }: Readonly<{ children: React.ReactNode }>) {
	const isClient = typeof window !== 'undefined';

	return (
		<>
			<>
				{isClient && <Header />}

				<main className='content'>{children}</main>
			</>
		</>
	);
}
