import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import GoogleSignInButton from '@/components/GoogleSignInButton'

export default async function Home() {
  const supabase = await createClient()
  
  const { data: { user } } = await supabase.auth.getUser()
  
  if (user) {
    redirect('/dashboard')
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100 relative overflow-hidden">
      {/* Grid Background */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.15]" style={{
        backgroundImage: `linear-gradient(to right, rgb(59, 130, 246) 2px, transparent 2px),
                         linear-gradient(to bottom, rgb(59, 130, 246) 2px, transparent 2px)`,
        backgroundSize: '30px 30px'
      }}></div>
      
      {/* Hero Section */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20 relative z-10">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl shadow-lg mb-6">
            <svg className="w-12 h-12 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path d="M5 4a2 2 0 012-2h6a2 2 0 012 2v14l-5-2.5L5 18V4z" />
            </svg>
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-4">
            LinkVault
          </h1>
          <p className="text-lg sm:text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Your personal cloud storage for web links. Save, organize, and access your favorite websites from anywhere with real-time sync.
          </p>
          <div className="max-w-md mx-auto">
            <GoogleSignInButton />
          </div>
        </div>
        <div className="mt-16 text-center">
          <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl p-8 sm:p-12 text-white shadow-xl">
            <h2 className="text-2xl sm:text-3xl font-bold mb-4">Ready to organize your web?</h2>
            <p className="text-blue-100 mb-6 max-w-xl mx-auto">
              Join now and start building your personal bookmark collection. It's free and takes just seconds to get started!
            </p>
            <div className="flex flex-wrap gap-4 justify-center items-center">
              <div className="flex items-center gap-2 text-sm">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                Free Forever
              </div>
              <div className="flex items-center gap-2 text-sm">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                No Credit Card
              </div>
              <div className="flex items-center gap-2 text-sm">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                Instant Setup
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
