Challenges Faced During Development

1. Supabase Realtime Connection Closing (WebSocket CLOSED / CHANNEL_ERROR)
At first, the realtime subscription failed due to WebSocket errors. This occurred because the subscription started before the OAuth session was completely restored on the client.

Solution:
I listened for onAuthStateChange and initialized the realtime channel only after a valid session was established. I also prevented duplicate subscriptions caused by multiple auth events like INITIAL_SESSION and SIGNED_IN.

2. Realtime Filter Causing Channel Rejection
I initially added a realtime filter:
filter: user_id=eq.${userId}
This caused the channel to close since the filter value did not match the JWT identity used by Supabase Realtime.

Solution:
I removed the filter and relied on Supabase Row Level Security (RLS) policies to ensure per-user privacy, which is the recommended approach.

3. OAuth Session Not Attaching to Realtime Socket
Realtime connections failed even though authentication was successful. The problem stemmed from an incorrect Supabase client setup.

Solution:
I switched to createBrowserClient from @supabase/ssr, which correctly attaches the OAuth JWT to realtime connections in the Next.js App Router.

4. State Not Updating After Realtime Events
Realtime events were received in the console, but the UI did not refresh.

Solution:
I implemented explicit state updates using setBookmarks inside the realtime callback for INSERT, UPDATE, and DELETE events.

5. Duplicate Realtime Subscriptions
Supabase triggers multiple auth events during startup, leading to duplicate realtime channels.

Solution:
I added a guard to ensure the realtime channel is created only once.