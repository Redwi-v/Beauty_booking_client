'use client'
import { NextPage } from "next";

import s from './specialist.module.scss'
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

interface SpecialistPageProps {
  
}
 
const SpecialistPage: NextPage<SpecialistPageProps> = () => {

  const router = useRouter()

  return ( 

    <div className={ `${ s.content }` }>

      <Link className={ s.back } href={ '/' } >
        <Image width={ 40 } height={ 40 } alt="back" src={ '/icons/arrow.svg' } />
      </Link>

      <div className={ s.profile }>

        <div className={ s.avatar }>

          <Image width={ 80 } height={ 80 } src={ 'https://n1s1.hsmedia.ru/dd/a9/55/dda955801664f0d32e431f3e7daacc2e/728x548_1_a25baf3ed4ffe2d0525fcf293895a22f@1232x928_0xac120004_12353968101687205012.png' } alt="avatar" />

        </div>

        <h1 className={ s.name }>Екатерина Петровна</h1>

        <span className={ s.direction }>Стилист-парикмахер</span>

        <div className={ s.reviews }>

          <div className={ s.stars }>
            <Image src={ '/icons/star.svg' } alt="star" width={ 24 } height={ 24 } />
            <Image src={ '/icons/star.svg' } alt="star" width={ 24 } height={ 24 } />
            <Image src={ '/icons/star.svg' } alt="star" width={ 24 } height={ 24 } />
            <Image src={ '/icons/star.svg' } alt="star" width={ 24 } height={ 24 } />
            <Image src={ '/icons/star.svg' } alt="star" width={ 24 } height={ 24 } />
          </div>

          <span className={ s.count } >20 Отзывов</span>

        </div>

      </div>

      <div className={ `${ s.sub_info } container` }>

        <div className={ s.title }>
          Образование
        </div>

        <ul className={ s.list }>

          <li>Lorem ipsum dolor sit amet consectetur</li>
          <li>Adipiscing libero turpis</li>
          <li>Nulla donec elit nisl congue in libero </li>
          <li>Elit id id pulvinar malesuada dictum imperdiet. Sit ut quis neque viverra non euismod. Eget  sagittis.</li>

        </ul>

      </div>

    </div>

  );
}
 
export default SpecialistPage;