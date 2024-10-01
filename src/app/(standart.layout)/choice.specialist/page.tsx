import { ChoiceSpecialistView } from '@/views/choice.specialists';
import { NextPage } from 'next';

interface ChoseSpecialPageProps {}

const ChoseSpecialPage: NextPage<ChoseSpecialPageProps> = () => {
	const isClient = typeof window !== 'undefined';
	return <>{isClient && <ChoiceSpecialistView />}</>;
};

export default ChoseSpecialPage;
