'use client'

import { Button, buttonTypes } from "@/shared/ui";
import { FC, useState } from "react";
import s from './choice.service.view.module.scss'
import Image from "next/image";
import { Controls } from "@/widgets/controls";
import { CheckBox } from "@/shared/ui/checkbox";
import { useAppointmentStore } from "@/features/appointment/model/appointment.store";
import { useRouter } from "next/navigation";

interface ChoiceServiceViewProps {
  
}
 
export const ChoiceServiceView: FC<ChoiceServiceViewProps> = () => {

  const { toggleServices, date, time, masterId, services } = useAppointmentStore(state => state)

  
  const router = useRouter()

  const clickHandler = () => {

    
    if ( !masterId ) return router.push('/choice.specialist')
    if ( !time && !date && masterId  ) return router.push('/choice.date')

    router.push('/entry.confirm')

  }

  const isEndStep = date && time && masterId

  return ( 

    <div className="container">
      
      <h1 className="h1 pt-25">Выбрать услуги</h1>
      <ListWithTabs  />
    
      <Controls >
        
        { isEndStep
        
          ? <Button

              buttonParams={{

                disabled: !services.length,
                onClick: clickHandler,

              }}

              type = { buttonTypes.blue }
          
        
            > Оформить запись </Button>

          : <>

            <Button

              buttonParams={ {

                onClick: () => router.back(),

              } }

            > Назад </Button>

            <Button

              buttonParams={ {

                onClick: clickHandler,
                disabled: !services.length

              } }

              type={ buttonTypes.blue }


            > Далее </Button>

            </>

        }
        
      </Controls> 

    </div>

  );

}

const listData = [
  {

    tab: 'Оформление бровей',
    id: '12333',

    services: [

      {

        id: 1,
        name: 'корекция',
        time: '30 мин',
        price: '700',

      },

      {

        id:2,
        name: 'корекция1',
        time: '30 мин',
        price: '700',

      },

      {

        id: 3,
        name: 'корекция2',
        time: '30 мин',
        price: '700',

      },

      {

        id: 4,
        name: 'корекция3',
        time: '30 мин',
        price: '700',

      },

      {

        id: 5,
        name: 'корекция4',
        time: '30 мин',
        price: '700',

      },

      {

        id: 6,
        name: 'корекция5',
        time: '30 мин',
        price: '700',

      },

      {

        id: 7,
        name: 'корекция6',
        time: '30 мин',
        price: '700',

      },

    ]
    

  },

  {

    tab: 'Оформление бровей1',
    id: '123331',

    services: [

      {

        id: 8,
        name: 'корекция',
        time: '30 мин',
        price: '700',

      },

      {

        id:9,
        name: 'корекция1',
        time: '30 мин',
        price: '700',

      },

      {

        id: 10,
        name: 'корекция2',
        time: '30 мин',
        price: '700',

      },

      {

        id: 11,
        name: 'корекция3',
        time: '30 мин',
        price: '700',

      },

      {

        id: 12,
        name: 'корекция4',
        time: '30 мин',
        price: '700',

      },

      {

        id: 13,
        name: 'корекция5',
        time: '30 мин',
        price: '700',

      },

      {

        id: 14,
        name: 'корекция6',
        time: '30 мин',
        price: '700',

      },

    ]
    

  },



]

const ListWithTabs = () => {

  const { toggleServices, services } = useAppointmentStore(state => state)


  return (

    <div className={ `${ s.content }` }>

      <div className={ s.top_section }>

        <div className="">
          <div className={ s.input_wrapper }>
            <div className={ s.icon }>
              <Image alt="search" src={ '/icons/search.svg' } width={ 18 } height={ 18 } />
            </div>
            <input placeholder="Поиск по услугам" className={ s.input } type="text" />
          </div>

          <div className={ s.tabs_wrapper }>

            <div className={ s.tabs }>

              { listData.map( ( item ) => (

                <a href={ '#' + item.id } key={ item.id } className={ s.tab }>{ item.tab }</a>

              ) ) }

            </div>

          </div>
        </div>

      </div>

      <div className={ s.list }>

          { listData.map(( item, topIndex ) => (

            <>
              
              <div key = {item.id}>
                
                <h1 className = "h1" id = { item.id }>{ item.tab }</h1>
                
              </div>

              <ul className = "mt-20">

                { item.services.map((service, index) => (

                  <li className={ `${ s.item }` } key={ index }>

                    <p className={ `${ s.name } p` }>{ service.name }</p>

                    <div className={ s.item_characteristics }>
                      <p className="p">
                        <Image src={ '/icons/time.svg' } width={ 24 } height={ 24 } alt="time" />
                        { service.time }
                      </p>
                      <p className="p">
                        <Image src={ '/icons/ruble.svg' } width={ 24 } height={ 24 } alt="time" />
                        { service.price }р
                      </p>
                    </div>

                    <CheckBox isActive = { services.includes( service.id ) } onClick = { () => toggleServices( service.id ) } />

                  </li>

                ))}

              </ul>

            </>

          ))}

      </div>


    </div>

  )

}

