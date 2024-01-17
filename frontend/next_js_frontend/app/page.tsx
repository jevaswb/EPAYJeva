import HomeForm from '@/components/Startpage/HomeForm'
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import React from 'react'

const Home = async () => {
  const session = await getServerSession()
  if (session) {
    redirect('/dashboard')
  }
  return <>
    <HomeForm />
  </>
}

export default Home