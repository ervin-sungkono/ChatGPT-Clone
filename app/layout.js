import './globals.css'
import { Noto_Sans } from "next/font/google"

import Providers from './components/Providers'

const notoSans = Noto_Sans({ 
  subsets: ['latin'],
  weight: ['400','500','600','700']
})

export const metadata = {
  title: 'ChatGPT Clone',
  description: 'A clone of ChatGPT\'s website UI',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={notoSans.className}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  )
}
