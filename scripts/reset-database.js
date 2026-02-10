const { createClient } = require('@supabase/supabase-js')
require('dotenv').config({ path: '.env.local' })

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY // Service role key needed for admin operations
)

async function resetDatabase() {
  console.log('🗑️  Starting database reset...\n')

  try {
    // 1. Delete all leads (contact form submissions)
    console.log('📧 Deleting all leads...')
    const { error: leadsError, count: leadsCount } = await supabase
      .from('leads')
      .delete()
      .neq('id', 0) // Delete all (dummy condition)

    if (leadsError) {
      console.error('❌ Error deleting leads:', leadsError.message)
    } else {
      console.log(`✅ Deleted ${leadsCount || 'all'} lead(s)\n`)
    }

    // 2. Delete all profiles
    console.log('📋 Deleting all profiles...')
    const { error: profilesError, count: profilesCount } = await supabase
      .from('profiles')
      .delete()
      .neq('id', '00000000-0000-0000-0000-000000000000') // Delete all (dummy condition)

    if (profilesError) {
      console.error('❌ Error deleting profiles:', profilesError.message)
    } else {
      console.log(`✅ Deleted ${profilesCount || 'all'} profile(s)\n`)
    }

    // 2. Delete all users (requires service role key)
    console.log('👤 Fetching all users...')
    const { data: { users }, error: listError } = await supabase.auth.admin.listUsers()

    if (listError) {
      console.error('❌ Error listing users:', listError.message)
      return
    }

    console.log(`Found ${users.length} user(s) to delete`)

    if (users.length === 0) {
      console.log('✅ No users to delete\n')
    } else {
      for (const user of users) {
        console.log(`  Deleting user: ${user.email} (${user.id})`)
        const { error: deleteError } = await supabase.auth.admin.deleteUser(user.id)

        if (deleteError) {
          console.error(`  ❌ Error deleting user ${user.email}:`, deleteError.message)
        } else {
          console.log(`  ✅ Deleted ${user.email}`)
        }
      }
      console.log(`\n✅ Deleted ${users.length} user(s)\n`)
    }

    console.log('🎉 Database reset complete!')
    console.log('\n📊 Summary:')
    console.log(`  - Leads deleted: ${leadsCount || 0}`)
    console.log(`  - Profiles deleted: ${profilesCount || 0}`)
    console.log(`  - Users deleted: ${users.length}`)

  } catch (error) {
    console.error('❌ Unexpected error:', error.message)
  }
}

resetDatabase()
