'use client';
import { FC, useEffect, useState } from 'react';
import s from './auth.module.scss';
import { Button, buttonTypes } from '@/shared/ui';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Input } from '@/shared/ui/input/ui';
import { useMutation } from 'react-query';
import { UserApi } from '@/shared/api/user';
import { IRegistration } from '@/shared/api/user/types';
import { useRouter } from 'next/navigation';
import { apiInstance } from '@/shared/api/instance/instance';
import axios from 'axios';

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
	phoneNumber: string;
	messageKey: string
};

const AuthForm: FC = () => {
	const {
		register,
		handleSubmit,
		watch,
		setValue,
		formState: { errors },
	} = useForm<authInputs>();

	const onSubmit: SubmitHandler<authInputs> = data => {
		confirmPhone();
		authMutation.mutate({
			phoneNumber: data.phoneNumber,
			password: data.password,
		});
	};

	const confirmPhone = () => {
		//@ts-ignore
		if (!window.directIsReady) return;

		console.log(watch('phoneNumber').replaceAll(' ', ''));

		//@ts-ignore
		window.VerifyWidget.mount(
			'#phone',
			{
				destination: watch('phoneNumber').replaceAll(' ', ''),
				widgetId: 'R2shLA',
				captchaSiteKey: '2c8ef686-d204-4faa-b12c-823e55a8d4e8',
			},
			key => {
				setValue('messageKey', key);
				return axios.post(`${process.env.API_URL}/auth/key/send`, { key }).then(res => {
					console.log(res);
				});
			},
			() => {
				return axios
					.post(`${process.env.API_URL}/auth/client/sign-in`, {
						password: watch('password'),
						phoneNumber: watch('phoneNumber'),
						messageKey: watch('messageKey'),
					}, {
						withCredentials: true,

						headers: {
							appType: 'CLIENT'
						}
					})
					.then(res => {
						console.log(res);
						const lastSalonId = window.localStorage.getItem('lastSalon');

						if (lastSalonId) {
							router.push('/' + lastSalonId);
						}
					});
			},
		);
	};

	useEffect(() => {
		return () => {
			//@ts-ignore
			window.VerifyWidget.unmount();
		};
	}, []);

	const router = useRouter();

	const authMutation = useMutation({
		mutationFn: (params: { password: string; phoneNumber: string }) =>
			UserApi.auth(params.password, params.phoneNumber),
		onSuccess: () => {
			router.push(`/${window.localStorage.getItem('LAST_SALON_ID') || 1}`);
		},
	});

	return (
		<>
			<form onSubmit={handleSubmit(onSubmit)}>
				<Input
					title='email'
					placeholder='Введите ваш номер телефона'
					error={errors?.phoneNumber?.message}
					required
					mask='+7 999 999 99 99'
					inputProps={{
						...register('phoneNumber', { required: { value: true, message: 'Поле обязательное' } }),
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
			<div id='phone'></div>
		</>
	);
};

type registrationInputs = {
	password: string;
	name: string;
	lastName: string;
	phoneNumber: string;
	messageKey: string;
};

const RegistrationForm: FC = () => {
	const {
		register,
		handleSubmit,
		watch,
		setValue,
		formState: { errors },
	} = useForm<registrationInputs>();

	const onSubmit: SubmitHandler<registrationInputs> = data => {
		confirmPhone();
		// authMutation.mutate({
		// 	email: data.email,
		// 	lastName: data.lastName,
		// 	name: data.name,
		// 	password: data.password,
		// 	phoneNumber: data.phoneNumber.replace(' ', ''),
		// });
	};

	const confirmPhone = () => {
		//@ts-ignore
		if (!window.directIsReady) return;

		//@ts-ignore
		window.VerifyWidget.mount(
			'#phone',
			{
				destination: watch('phoneNumber').replaceAll(' ', ''),
				widgetId: 'R2shLA',
				captchaSiteKey: '2c8ef686-d204-4faa-b12c-823e55a8d4e8',
			},
			key => {
				return axios
					.post<{ messageUuid: string }>(`${process.env.API_URL}auth/key/send`, { key })
					.then(res => {
						res.data.messageUuid;
						setValue('messageKey', key);
					});
			},
			() => {
				return axios
					.post(`${process.env.API_URL}/auth/client/sign-up`, {
						password: watch('password'),
						name: watch('name'),
						lastName: watch('lastName'),
						phoneNumber: watch('phoneNumber'),
						messageKey: watch('messageKey'),
					}, {
						withCredentials: true,
						headers: {
							
							appType: 'CLIENT'
						}
					})
					.then(res => {
						console.log(res);

						const lastSalonId = window.localStorage.getItem('lastSalon');

						if (lastSalonId) {
							router.push('/' + lastSalonId);
						}
					});
			},
		);
	};

	useEffect(() => {
		return () => {
			//@ts-ignore
			window.VerifyWidget.unmount();
		};
	}, []);

	const router = useRouter();

	const authMutation = useMutation({
		mutationFn: (params: IRegistration) => UserApi.registration(params),
		onSuccess: () => {
			router.push(`/${window.localStorage.getItem('LAST_SALON_ID') || 1}`);
		},
	});

	return (
		<>
			<form onSubmit={handleSubmit(onSubmit)}>
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

			<div id='phone'></div>
		</>
	);
};
export default AuthPage;
