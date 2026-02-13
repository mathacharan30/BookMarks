'use client'

import { useState } from 'react'

export default function BookmarkItem({ bookmark, onDelete }) {
  const [deleting, setDeleting] = useState(false)

  const handleDelete = async () => {
    if (!confirm('Are you sure you want to delete this bookmark?')) {
      return
    }

    setDeleting(true)
    await onDelete(bookmark.id)
    setDeleting(false)
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    })
  }

  return (
    <div className="bg-white border border-gray-200 rounded-lg hover:shadow-lg transition-all duration-200 overflow-hidden group">
      {/* Header with delete button */}
      <div className="bg-gradient-to-r from-gray-50 to-white px-3 sm:px-4 py-2.5 sm:py-3 border-b border-gray-100 flex items-center justify-between">
        <h3 className="text-sm sm:text-base font-semibold text-gray-900 truncate flex-1 pr-2">
          {bookmark.title}
        </h3>
        <button
          onClick={handleDelete}
          disabled={deleting}
          className="flex-shrink-0 p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-md disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          title="Delete bookmark"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
        </button>
      </div>

      {/* Content */}
      <div className="p-3 sm:p-4 space-y-3">
        <div className="flex items-start gap-2">
          <svg className="w-4 h-4 text-gray-400 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
          </svg>
          <a
            href={bookmark.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs sm:text-sm text-blue-600 hover:text-blue-800 hover:underline truncate flex-1 break-all"
          >
            {bookmark.url}
          </a>
        </div>
        
        <div className="flex items-center justify-between pt-2 border-t border-gray-100">
          <p className="text-xs text-gray-500">
            {formatDate(bookmark.created_at)}
          </p>
          <a
            href={bookmark.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 px-2.5 sm:px-3 py-1 bg-blue-500 text-white text-xs font-medium rounded-md hover:bg-blue-600 transition-colors"
          >
            Visit
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </a>
        </div>
      </div>
    </div>
  )
}
