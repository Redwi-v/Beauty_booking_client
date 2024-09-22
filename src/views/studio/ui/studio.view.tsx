'use client'
import { BackButton } from "@/shared/ui";
import { FC } from "react";

import s from './studio.view.module.scss'
import Image from "next/image";
import { YMaps, Map } from '@pbe/react-yandex-maps';

const studioInfo = {

  name: 'студия маникюра',
  address: 'ул. Яна-полуяна д. 43',
  logo: 'https://f1.dikidi.net/c2/v1088/4egq9ai4gi.jpg',
  id: 1,
  workTime: 'пн.-вс.: 09:00-21:00',
  contacts: [
    {
      name: 'Сайт',
      link: 'www.instagram.com/maniq___/',
    }
  ]

}

interface StudioViewProps {
  
}
 
export const StudioView: FC<StudioViewProps> = () => {

  return (

    <div className = { s.container }>
      <BackButton />

      <div className={s.main}>

        <Image className = { s.logo } width={104} height={104}  src={ studioInfo.logo } alt="logo"/>
        <h1 className="h1">{studioInfo.name}</h1>

      </div>

      <div className={`${ s.sub_info } mt-20`}>
        <h3 className="h3">Время Работы</h3>
        <p className="p">{ studioInfo.workTime }</p>
      </div>

      <div className={`${ s.sub_info } mt-20`}>
        <h3 className="h3">Адрес</h3>
        <p className="p">{ studioInfo.address }</p>
      </div>

      <YMaps>

        <div  className = {`${ s.map } mt-30`} >

          <Map  width="100%" height="100%" defaultState={{ center: [55.75, 37.57], zoom: 9 }} />

        </div>

      </YMaps>

      <div className={`${ s.contacts } mt-30`}>
        <h1 className="h1">Контакты</h1>

        {

          studioInfo.contacts.map(( contact, index ) => (

            <div key = { index } className="mt-20">
              <p className="h2">{ contact.name }</p>
              <a href={ contact.link } className="p">{ contact.link }</a>
            </div>

          ))

        }
      </div>

    </div>

  );

}
 