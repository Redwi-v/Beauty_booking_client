import { ChoiceSpecialistView } from '@/views/choice.specialists';
import { NextPage } from 'next';

interface ChoseSpecialPageProps {}

const ChoseSpecialPage: NextPage<ChoseSpecialPageProps> = () => {
	return <>{<ChoiceSpecialistView />}</>;
};

export default ChoseSpecialPage;
