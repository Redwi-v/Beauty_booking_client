import { FC, PropsWithChildren } from 'react';
interface ITelegramLoginHocProps {}

const TelegramLoginHoc: FC<ITelegramLoginHocProps & PropsWithChildren> = props => {
	const { children } = props;


	return children;
};

export default TelegramLoginHoc;
