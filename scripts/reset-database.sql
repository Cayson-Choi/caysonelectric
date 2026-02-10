-- ============================================================================
-- Database Reset Script
-- ============================================================================
-- WARNING: This script will DROP all tables and data!
-- Use this only for development/testing purposes.
-- ============================================================================

-- Drop all tables in correct order (respecting foreign key dependencies)
DROP TABLE IF EXISTS book_orders CASCADE;
DROP TABLE IF EXISTS applications CASCADE;
DROP TABLE IF EXISTS course_sessions CASCADE;
DROP TABLE IF EXISTS courses CASCADE;
DROP TABLE IF EXISTS posts CASCADE;
DROP TABLE IF EXISTS leads CASCADE;
DROP TABLE IF EXISTS profiles CASCADE;

-- Drop trigger function
DROP FUNCTION IF EXISTS update_updated_at_column() CASCADE;

-- ============================================================================
-- After running this script, execute the unified schema:
-- Run: db/migrations/000_unified_schema.sql
-- ============================================================================
