const { createClient } = require('@supabase/supabase-js');

const c = createClient(
  'https://scjptltrknigahwflgkp.supabase.co',
  process.env.SUPABASE_SERVICE_ROLE_KEY || 'YOUR_SUPABASE_SERVICE_ROLE_KEY'
);

(async () => {
  // Test if sortOrder column already exists by trying to select it
  const { data, error } = await c.from('podcasts').select('id, sortOrder').limit(1);
  
  if (error && error.message.includes('sortOrder')) {
    console.log('sortOrder column does not exist yet. You need to add it via Supabase Dashboard SQL editor.');
    console.log('Run this SQL:');
    console.log('ALTER TABLE public.podcasts ADD COLUMN "sortOrder" INTEGER NOT NULL DEFAULT 0;');
  } else if (data) {
    console.log('sortOrder column already exists! Current data:', JSON.stringify(data));
    
    // If exists but all are 0, let's set initial order based on existing rows
    const { data: allPodcasts } = await c.from('podcasts').select('id, title, sortOrder');
    console.log('\nAll podcasts with sortOrder:');
    allPodcasts.forEach((p, i) => {
      console.log(`  ${i+1}. [${p.id}] ${p.title} — sortOrder: ${p.sortOrder}`);
    });
    
    // Set initial sort orders if all are 0
    const allZero = allPodcasts.every(p => p.sortOrder === 0 || p.sortOrder === null);
    if (allZero && allPodcasts.length > 0) {
      console.log('\nAll sortOrders are 0. Setting initial order (10, 20, 30...)...');
      for (let i = 0; i < allPodcasts.length; i++) {
        const newOrder = (i + 1) * 10;
        const { error: updateErr } = await c
          .from('podcasts')
          .update({ sortOrder: newOrder })
          .eq('id', allPodcasts[i].id);
        if (updateErr) {
          console.log(`  Error updating ${allPodcasts[i].id}:`, updateErr.message);
        } else {
          console.log(`  Updated ${allPodcasts[i].id} -> sortOrder: ${newOrder}`);
        }
      }
      console.log('Done! Initial sort orders set.');
    }
  } else {
    console.log('Unexpected result:', error?.message);
  }
})();
