const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const files = [
  { path: 'src/app/blog/preempleo-rutina-investigacion/page.tsx', out: 'restored_blog_preempleo.tsx' },
  { path: 'src/app/blog/verdad-o-mentira/page.tsx', out: 'restored_blog_verdad.tsx' },
  { path: 'src/app/blog/garantiza-la-verdad/page.tsx', out: 'restored_blog_garantiza.tsx' }
];

files.forEach(f => {
  try {
    const commitHash = execSync(`git log -n 1 --format="%H" -- "${f.path}"`, { encoding: 'utf8' }).trim();
    if (commitHash) {
      let content = '';
      try {
        content = execSync(`git show ${commitHash}:${f.path}`, { encoding: 'utf8', stdio: ['pipe', 'pipe', 'ignore'] });
      } catch (e) {
        content = execSync(`git show ${commitHash}~1:${f.path}`, { encoding: 'utf8', stdio: ['pipe', 'pipe', 'ignore'] });
      }
      const outPath = path.join(__dirname, '../scratch', f.out);
      fs.writeFileSync(outPath, content, 'utf8');
      console.log(`✅ Saved ${f.out} (${content.length} chars).`);
    } else {
      console.log(`❌ No git log for ${f.path}`);
    }
  } catch (err) {
    console.error(`Error for ${f.path}:`, err.message);
  }
});
