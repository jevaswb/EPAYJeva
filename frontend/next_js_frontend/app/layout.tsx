import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { getServerSession } from 'next-auth'
import './globals.css'
import './styles.css'
import NavFormNoAuth from '@/components/NavForms/NavFormNoAuth'
import Sidenav from '@/components/Sidenav/sidenav'
import FooterForm from '@/components/Footer/FooterForm'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'EventPay',
  description: 'A website to plan events',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await getServerSession()

  return (
    <html lang="en">
      <body className={inter.className}>

        {/* Chooses the Right Nav */}
        <nav>

          {/* {!session && <>
            <NavFormNoAuth />
          </>} */}

          {!session && <>
            <Sidenav />
          </>}

        </nav>

        {children}

        {/* <footer>
          {!session &&
            <FooterForm />
          }
        </footer> */}
      </body>
    </html>
  )
}