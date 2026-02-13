'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'

export default function AddBookmarkForm({ userId }) {
  const [title, setTitle] = useState('')
  const [url, setUrl] = useState('')
  const [loading, setLoading] = useState(false)
  const supabase = createClient()

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!title.trim() || !url.trim()) {
      alert('Please fill in both fields')
      return
    }

    setLoading(true)

    const { error } = await supabase
      .from('bookmarks')
      .insert([
        {
          user_id: userId,
          title: title.trim(),
          url: url.trim(),
        },
      ])

    if (error) {
      console.error('Error adding bookmark:', error)
      alert('Failed to add bookmark')
    } else {
      setTitle('')
      setUrl('')
    }

    setLoading(false)
  }

  return (
    <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
      <div className="sm:col-span-2 lg:col-span-1">
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Bookmark Title"
          className="w-full px-3 sm:px-4 py-2.5 text-sm sm:text-base bg-white/90 backdrop-blur text-gray-900 placeholder-gray-500 border-0 rounded-lg focus:ring-2 focus:ring-white outline-none"
          disabled={loading}
        />
      </div>

      <div className="sm:col-span-2 lg:col-span-1">
        <input
          type="url"
          id="url"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="https://example.com"
          className="w-full px-3 sm:px-4 py-2.5 text-sm sm:text-base bg-white/90 backdrop-blur text-gray-900 placeholder-gray-500 border-0 rounded-lg focus:ring-2 focus:ring-white outline-none"
          disabled={loading}
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full sm:col-span-2 lg:col-span-1 px-4 py-2.5 bg-white text-blue-600 text-sm sm:text-base font-semibold rounded-lg hover:bg-gray-50 disabled:bg-gray-200 disabled:text-gray-400 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
      >
        {loading ? (
          'Adding...'
        ) : (
          <>
            <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Add Bookmark
          </>
        )}
      </button>
    </form>
  )
}
