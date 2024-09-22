'use client'
import { Header } from '@/widgets/header';
import { FC, useState } from 'react';
import s from './entry.confirm.view.module.scss'
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Controls } from '@/widgets/controls';
import buttonStyles from '@/widgets/controls/ui/controls.module.scss';
import { Button, buttonTypes } from '@/shared/ui';
import { useAppointmentStore } from '@/features/appointment/model/appointment.store';
import moment from 'moment';
import 'moment/locale/ru'
moment.locale('ru')

interface IEntryConfirmViewProps {

}

export const EntryConfirmView: FC<IEntryConfirmViewProps> = ( props ) => {

  const { } = props

  const router = useRouter()
  const { clear, date, masterId, services, time } = useAppointmentStore(state => state)


  return (

    <div className={ `${ s.wrapper }` }>

      <Header withBack />

      <div className={ `${ s.main_info } container` }>

        <h1 className='h1'>Детали записи</h1>

        <div className={ `${ s.specialist } ${ s.border_bottom }` }>

          <div className={ s.avatar }>

            <Image width={ 56 } height={ 56 } alt='avatar' src={ 'https://n1s1.hsmedia.ru/dd/a9/55/dda955801664f0d32e431f3e7daacc2e/728x548_1_a25baf3ed4ffe2d0525fcf293895a22f@1232x928_0xac120004_12353968101687205012.png' } />

          </div>

          <div className={ s.info }>
            <p>Екатерина Петровна id = { masterId }</p>
            <p>Стилист - парикмахер</p>
          </div>

          <Edit to={ 'choice.specialist' } />

        </div>

        <div className={ `${ s.price } ${ s.border_bottom }` }>

          <Edit to='choice.service' />

          <h2 className={ `${ s.sub_title } h2` }>Услуги</h2>

          { services.map( service => (

            <div key={service} className={ s.price_item }>
              <span>Стрижка id = { service }</span>
              <span>700 ₽</span>
            </div>

          ))

          }

        </div>

        <div className={ s.time }>

          <h2 className={ `${ s.sub_title } h2` }>Дата и время</h2>

          <div className={ `${ s.info } flex` }>

            <Edit to='choice.date' />

            <span className='flex'>
              <Image width={ 24 } height={ 24 } src={ '/icons/calendar.svg' } alt='calendar' />
              { moment(date).locale('ru').format('DD.MM.YYYY (dd)') }
            </span>

            { time && <span className='flex'>
              <Image width={ 24 } height={ 24 } src={ '/icons/time.svg' } alt='time' />
              { time } - { moment().set({ hour: +time.split(':')[0], minute: +time.split(':')[1], second: 0 }).add(50, 'minute').format('hh:mm') }
            </span>}

          </div>

        </div>

      </div>

      <form className={ `${ s.form } container` }>

        <h2 className='h2'> Личные данные</h2>

        <span className={ `${ s.form_title } ${ s.required }` }>Имя</span>
        <input placeholder='Введите ваше имя' />

        <span className={ `${ s.form_title } ${ s.required }` }>Телефон</span>
        <input placeholder='Номер с кодом страны' />

        <span className={ `${ s.form_title }` }>E-mail</span>
        <input placeholder='Введите данные' />

        <span className={ `${ s.form_title }` }>Комментарий</span>
        <input placeholder='Комментарий к записи' />

        <CheckBox />

      </form>

      <Controls >
        <Button buttonParams={{
          onClick:  () => {
            clear()
            router.push( '/' )
          } 
        }} type = { buttonTypes.blue }>Подтвердить запись</Button>
      </Controls>

    </div>

  )

}

const CheckBox = () => {

  const [ isActive, setIsActive ] = useState( false )

  return (


    <div onClick={ () => setIsActive( prev => !prev ) } className={ `${ s.checkbox }` } >

      <div className={ `${ s.mark } ${ isActive && s.active }` }>

        { isActive && <Image width={ 14 } height={ 14 } src={ '/icons/ok.svg' } alt='checkbox mark' /> }

      </div>

      <p>Я принимаю <a href="/">Условия предоставления услуг</a> и
        <a href="/"> Политика конфиденциальности.</a>
      </p>

    </div>
  )

}

const Edit: FC<{ to: string }> = ( { to } ) => (

  <Link href={ to } className={ s.edit } >
    <Image width={ 24 } height={ 24 } src={ '/icons/pencil.svg' } alt='edit' />
  </Link>

)

