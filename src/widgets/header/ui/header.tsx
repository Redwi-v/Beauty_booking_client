
'use client'
import { FC } from "react";
import s from './header.module.scss'
import Image from "next/image";
import { useRouter } from "next/navigation";

interface HeaderProps {

  withBack?: boolean,

}


export const Header: FC<HeaderProps> = ( { withBack } ) => {

  const router = useRouter()

  return (
    <>

      {

        <header className={ `${ s.header } container` }>

          <div className={ s.top }>
            { withBack
              && <button className={ s.back } onClick={ () => router.back() }>

                <Image alt="back" width={ 30 } height={ 40 } src={ '/icons/arrow.svg' } />

              </button> 
            }
          </div>

          <div className={ `${ s.main } ${ withBack && s.withTop }` }>

            <div className={ s.info }>
              <h1 className="h1">Бьюти салон Cucu</h1>
              <h3 className="h3">ул. Яна-полуяна д. 43</h3>
            </div>

            <div className={ s.avatar }>

              <Image alt="avatar" src={ 'https://f1.dikidi.net/c2/v1088/4egq9ai4gi.jpg' } width={ 48 } height={ 48 } />

            </div>

          </div>

        </header> 

      }

    </>

  );

}
 