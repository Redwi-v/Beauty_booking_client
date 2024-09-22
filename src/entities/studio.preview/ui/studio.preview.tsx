import { FC } from "react";
import s from './studio.preview.module.scss'
import Link from "next/link";
import type { IStudioPreviewInfo } from "../types/types";
import Image from "next/image";
import WebApp from '@twa-dev/sdk';

interface StudioPreviewProps {
  
  href: string
  info: IStudioPreviewInfo

}
 
export const StudioPreview: FC<StudioPreviewProps> = ({ href, info }) => {

  const { address, logo, name } = info

  return (  

    <Link className={ `${ s.link } flex flex-col items-center` } href={ href } >

      <Image className = { s.logo } width = { 80 } height = { 80 } src = { logo } alt = { name } />
      
      <div className = {`${ s.info  } pt-10`}>

        <h1>{ name }</h1>
        <h3>{ address } id:{ WebApp.initDataUnsafe.start_param }</h3>

      </div>

    </Link>

  );

}
 
