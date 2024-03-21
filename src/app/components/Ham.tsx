"use client";
import { usePathname } from "next/navigation"
import  Link  from "next/link"


export const Ham = () => {
    const pathname = usePathname()
  return (
    <div id='side-ham' className='bg-sky-900 z-[100] w-[10em] h-screen '>
    <div className='flex flex-col items-center justify-center gap-5 [&>*]:underline [&>*]:underline-offset-8  py-10'>
    <Link href='/' className={`${pathname === '/'? "text-yellow-500 ": "text-white "}text-2xl font-bold`}>Home</Link>
      <Link href='/earnings' className={`${pathname === '/earnings'? "text-yellow-500 ": "text-white "}text-2xl font-bold`}>Earnings</Link>
      <Link href='/attainment' className={`${pathname === '/attainment'? "text-yellow-500 ": "text-white "}text-2xl font-bold`}>Attainment</Link>
      <Link href='/deals' className={`${pathname === '/deals'? "text-yellow-500 ": "text-white "}text-2xl font-bold`}>Deals</Link>
      </div>
      </div>
  )
}
