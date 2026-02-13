import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import BookmarksList from '@/components/BookmarksList'
import AddBookmarkForm from '@/components/AddBookmarkForm'
import SignOutButton from '@/components/SignOutButton'

export default async function Dashboard() {
  const supabase = await createClient()
  
  const { data: { user } } = await supabase.auth.getUser()
  
  if (!user) {
    redirect('/')
  }

  const { data: bookmarks } = await supabase
    .from('bookmarks')
    .select('*')
    .order('created_at', { ascending: false })

  return (
    <main className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3 sm:gap-4">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center shadow-md">
                <svg className="w-6 h-6 sm:w-7 sm:h-7 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M5 4a2 2 0 012-2h6a2 2 0 012 2v14l-5-2.5L5 18V4z" />
                </svg>
              </div>
              <div>
                <h1 className="text-xl sm:text-2xl font-bold text-gray-900 flex items-center gap-2">
                  My Bookmarks
                </h1>
                <p className="text-xs sm:text-sm text-gray-500 truncate max-w-[200px] sm:max-w-none">{user.email}</p>
              </div>
            </div>
            <SignOutButton />
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-6">
        {/* Add Bookmark Section */}
        <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl shadow-lg p-4 sm:p-6 text-white">
          <h2 className="text-lg sm:text-xl font-semibold mb-4 flex items-center gap-2">
            <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Add New Bookmark
          </h2>
          <AddBookmarkForm userId={user.id} />
        </div>

        {/* Bookmarks Count */}
        <div className="flex items-center justify-between">
          <h2 className="text-lg sm:text-xl font-semibold text-gray-700">
            Your Collection <span className="text-xs sm:text-sm font-normal text-gray-500">({bookmarks?.length || 0})</span>
          </h2>
        </div>

        {/* Bookmarks Grid */}
        <BookmarksList initialBookmarks={bookmarks || []} userId={user.id} />
      </div>
    </main>
  )
}
