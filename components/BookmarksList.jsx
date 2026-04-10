'use client'

import { supabase } from '@/lib/supabase/client'
import BookmarkItem from './BookmarkItem'

export default function BookmarksList({ bookmarks }) {
    const handleDelete = async (id) => {
        try {
            const { error } = await supabase.from('bookmarks').delete().eq('id', id)
            if (error) throw error
        } catch (error) {
            console.error('Error deleting bookmark:', error)
            alert('Failed to delete bookmark')
        }
    }

    if (bookmarks.length === 0) {
        return (
            <>
                <div className="text-center py-12 sm:py-16 bg-white rounded-lg border-2 border-dashed border-gray-300">
                    <div className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 bg-blue-50 rounded-2xl mb-4">
                      <svg className="w-10 h-10 sm:w-12 sm:h-12 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M5 4a2 2 0 012-2h6a2 2 0 012 2v14l-5-2.5L5 18V4z" />
                      </svg>
                    </div>
                    <p className="text-gray-500 text-base sm:text-lg font-medium mb-1">No bookmarks yet</p>
                    <p className="text-gray-400 text-xs sm:text-sm">Add your first bookmark using the form</p>
                </div>
            </>
        )
    }

    return (
        <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {bookmarks.map((bookmark) => (
                    <BookmarkItem
                        key={bookmark.id}
                        bookmark={bookmark}
                        onDelete={handleDelete}
                    />
                ))}
            </div>
        </>
    )
}
