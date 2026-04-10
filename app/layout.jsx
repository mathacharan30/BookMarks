import { Montserrat } from 'next/font/google'
import './globals.css'
import Footer from '@/components/Footer'
import { AuthProvider } from '@/lib/supabase/auth-context'

const montserrat = Montserrat({ 
  weight: ['300', '400', '500', '600', '700', '800'],
  subsets: ['latin'],
  display: 'swap',
})

export const metadata = {
  title: 'Smart Bookmarks',
  description: 'Manage your bookmarks with real-time sync',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${montserrat.className} flex flex-col min-h-screen`}>
        <AuthProvider>
          {children}
          <Footer />
        </AuthProvider>
      </body>
    </html>
  )
}
