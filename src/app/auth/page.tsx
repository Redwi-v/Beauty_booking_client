'use client';
import { FC, useState } from 'react';
import s from './auth.module.scss';
import { Button, buttonTypes } from '@/shared/ui';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Input } from '@/shared/ui/input/ui';
import { useMutation } from 'react-query';
import { UserApi } from '@/shared/api/user';
import { IRegistration } from '@/shared/api/user/types';
import { useRouter } from 'next/navigation';

interface AuthPageProps {}

const AuthPage: FC<AuthPageProps> = () => {
	const [isAuth, setIsAuth] = useState(true);

	return (
		<section className={`${s.content} `}>
			<div className={s.controls}>
				<Button
					type={isAuth ? buttonTypes.blue : null}
					buttonParams={{
						onClick: () => setIsAuth(true),
					}}
				>
					Вход
				</Button>
				<Button
					type={isAuth ? null : buttonTypes.blue}
					buttonParams={{
						onClick: () => setIsAuth(false),
					}}
				>
					Регистарция
				</Button>
			</div>

			<div>{isAuth ? <AuthForm /> : <RegistrationForm />}</div>
		</section>
	);
};

type authInputs = {
	password: string;
	email: string;
};

const AuthForm: FC = () => {
	const {
		register,
		handleSubmit,
		watch,
		formState: { errors },
	} = useForm<authInputs>();

	const onSubmit: SubmitHandler<authInputs> = data => {
		authMutation.mutate({
			email: data.email,
			password: data.password,
		});
	};

	const router = useRouter();

	const authMutation = useMutation({
		mutationFn: (params: { password: string; email: string }) =>
			UserApi.auth(params.password, params.email),
		onSuccess: () => {
			router.push(`/${window.localStorage.getItem('LAST_SALON_ID') || 1}`);
		},
	});

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<Input
				title='email'
				placeholder='Введите ваш email'
				error={errors?.email?.message}
				required
				inputProps={{
					...register('email', { required: { value: true, message: 'Поле обязательное' } }),
				}}
			/>
			<Input
				title='Пароль'
				placeholder='Придумайте пароль'
				error={errors?.password?.message}
				required
				type='password'
				inputProps={{
					...register('password', { required: { value: true, message: 'Поле обязательное' } }),
				}}
			/>
			<Button
				type={buttonTypes.blue}
				buttonParams={{ className: s.next_button }}
			>
				Далее
			</Button>
		</form>
	);
};

type registrationInputs = {
	email: string;
	password: string;
	name: string;
	lastName: string;
	phoneNumber: string;
};

const RegistrationForm: FC = () => {
	const {
		register,
		handleSubmit,
		watch,
		formState: { errors },
	} = useForm<registrationInputs>();

	const onSubmit: SubmitHandler<registrationInputs> = data => {
		authMutation.mutate({
			email: data.email,
			lastName: data.lastName,
			name: data.name,
			password: data.password,
			phoneNumber: data.phoneNumber.replace(' ', ''),
		});
	};

	const router = useRouter();

	const authMutation = useMutation({
		mutationFn: (params: IRegistration) => UserApi.registration(params),
		onSuccess: () => {
			router.push(`/${window.localStorage.getItem('LAST_SALON_ID') || 1}`);
		},
	});

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<Input
				title='email'
				placeholder='ваш email'
				error={errors?.password?.message}
				required
				inputProps={{
					...register('email', { required: { value: true, message: 'Поле обязательное' } }),
				}}
			/>

			<Input
				title='Имя'
				placeholder='Иван'
				error={errors?.password?.message}
				required
				inputProps={{
					...register('name', { required: { value: true, message: 'Поле обязательное' } }),
				}}
			/>

			<Input
				title='Фамилия'
				placeholder='Иванов'
				error={errors?.password?.message}
				required
				inputProps={{
					...register('lastName', { required: { value: true, message: 'Поле обязательное' } }),
				}}
			/>
			<Input
				title='Телефон'
				mask='+7 999 999 99 99'
				placeholder='Номер с кодом страны'
				error={errors?.password?.message}
				required
				inputProps={{
					...register('phoneNumber', { required: { value: true, message: 'Поле обязательное' } }),
				}}
			/>

			<Input
				title='Пароль'
				error={errors?.password?.message}
				required
				placeholder='Придумайте пароль'
				type='password'
				inputProps={{
					...register('password', { required: { value: true, message: 'Поле обязательное' } }),
				}}
			/>

			<Button
				type={buttonTypes.blue}
				buttonParams={{ className: s.next_button }}
			>
				Далее
			</Button>
		</form>
	);
};
export default AuthPage;
