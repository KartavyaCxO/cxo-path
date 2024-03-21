"use client";
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { Ham } from './components/Ham';
export default function Home() {
  const pathname = usePathname()
  return (
    <main className="flex min-h-screen justify-between">
        HOME
    </main>
  )
}
