-- Create bookmarks table
CREATE TABLE bookmarks (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  url TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()) NOT NULL
);

-- Enable Row Level Security
ALTER TABLE bookmarks ENABLE ROW LEVEL SECURITY;

-- Create policy: Users can only see their own bookmarks
CREATE POLICY "Users can view their own bookmarks"
  ON bookmarks
  FOR SELECT
  USING (auth.uid() = user_id);

-- Create policy: Users can insert their own bookmarks
CREATE POLICY "Users can insert their own bookmarks"
  ON bookmarks
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Create policy: Users can update their own bookmarks
CREATE POLICY "Users can update their own bookmarks"
  ON bookmarks
  FOR UPDATE
  USING (auth.uid() = user_id);

-- Create policy: Users can delete their own bookmarks
CREATE POLICY "Users can delete their own bookmarks"
  ON bookmarks
  FOR DELETE
  USING (auth.uid() = user_id);

-- Create index for faster queries
CREATE INDEX bookmarks_user_id_idx ON bookmarks(user_id);
CREATE INDEX bookmarks_created_at_idx ON bookmarks(created_at DESC);


