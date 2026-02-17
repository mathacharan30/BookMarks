'use client'

import { useEffect, useState, useRef } from 'react'
import { createClient } from '@/lib/supabase/client'
import BookmarkItem from './BookmarkItem'

export default function BookmarksList({ initialBookmarks, userId }) {
    const [bookmarks, setBookmarks] = useState(initialBookmarks)
    const [connectionStatus, setConnectionStatus] = useState('connecting')
    const channelRef = useRef(null)

    useEffect(() => {
        const supabase = createClient()

        const {
            data: { subscription },
        } = supabase.auth.onAuthStateChange((event, session) => {
            if (!session) return

            if (channelRef.current) return

            console.log("✅ Starting realtime only once")

            channelRef.current = supabase
                .channel('bookmarks_realtime')
                .on(
                    'postgres_changes',
                    {
                        event: '*',
                        schema: 'public',
                        table: 'bookmarks',
                    },
                    (payload) => {
                        console.log('Realtime event:', payload)

                        if (payload.eventType === 'INSERT') {
                            setBookmarks((current) => {
                                const exists = current.find((b) => b.id === payload.new.id)
                                if (exists) return current
                                return [payload.new, ...current]
                            })
                        }

                        if (payload.eventType === 'DELETE') {
                            setBookmarks((current) =>
                                current.filter((b) => b.id !== payload.old.id)
                            )
                        }

                        if (payload.eventType === 'UPDATE') {
                            setBookmarks((current) =>
                                current.map((b) =>
                                    b.id === payload.new.id ? payload.new : b
                                )
                            )
                        }
                    }

                )
                .subscribe((status) => {
                    console.log('📡 Subscription status:', status)
                    setConnectionStatus(status)
                })
        })

        return () => {
            subscription.unsubscribe()
            if (channelRef.current) {
                supabase.removeChannel(channelRef.current)
                channelRef.current = null
            }
        }
    }, [])




    const handleDelete = async (id) => {
        const supabase = createClient()
        const { error } = await supabase
            .from('bookmarks')
            .delete()
            .eq('id', id)

        if (error) {
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
