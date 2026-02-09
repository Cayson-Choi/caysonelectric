-- Truncate all tables to clear data
truncate table applications restart identity cascade;
truncate table book_orders restart identity cascade;
truncate table leads restart identity cascade;
truncate table posts restart identity cascade;

-- Optional: If you want to delete users (requires more permission usually, but for record)
-- delete from auth.users; -- This usually requires admin rights not always available via SQL editor in all contexts without caution. 
-- We will stick to app data.
