import type { Metadata } from 'next'
import { Montserrat } from 'next/font/google'
import './globals.css'

const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-montserrat',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'VD Phone Store — iPhone & Samsung Baru dan Second',
  description:
    'Beli iPhone dan Samsung baru maupun second terpercaya. Harga transparan, kondisi teruji, garansi toko.',
  openGraph: {
    title: 'VD Phone Store — iPhone & Samsung Baru dan Second',
    description:
      'Beli iPhone dan Samsung baru maupun second terpercaya. Harga transparan, kondisi teruji, garansi toko.',
    type: 'website',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id" className={`${montserrat.variable} scroll-smooth`}>
      <body className="min-h-screen flex flex-col">{children}</body>
    </html>
  )
}
