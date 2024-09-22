'use client'
import s from './back.button.module.scss'
import { useRouter } from "next/navigation"


export const BackButton = () => {

  const router = useRouter()

  return (
    
    <button className = { s.button } type="button" onClick={() => router.back()}>
      ◀
    </button>

  )

}