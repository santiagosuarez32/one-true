const { execSync } = require('child_process');

const files = [
  'src/app/blog/preempleo-rutina-investigacion/page.tsx',
  'src/app/blog/verdad-o-mentira/page.tsx',
  'src/app/blog/garantiza-la-verdad/page.tsx'
];

files.forEach(filePath => {
  console.log(`=== HISTORY FOR ${filePath} ===`);
  try {
    // Find the last commit that had this file before it was deleted
    const commitHash = execSync(`git log -n 1 --format="%H" -- "${filePath}"`, { encoding: 'utf8' }).trim();

    if (commitHash) {
      console.log(`Last commit: ${commitHash}`);
      // Show content of the file at that commit or its parent if deleted in that commit
      let fileContent = '';
      try {
        fileContent = execSync(`git show ${commitHash}:${filePath}`, { encoding: 'utf8', stdio: ['pipe', 'pipe', 'ignore'] });
      } catch (e) {
        // If it was deleted in commitHash, get it from parent commit (commitHash~1)
        fileContent = execSync(`git show ${commitHash}~1:${filePath}`, { encoding: 'utf8', stdio: ['pipe', 'pipe', 'ignore'] });
      }
      console.log(`File Content (first 3000 chars):`);
      console.log(fileContent.slice(0, 3000));
      console.log(`File Content (rest of it if longer):`);
      if (fileContent.length > 3000) {
        console.log(fileContent.slice(3000));
      }
    } else {
      console.log("No commit found for this file path.");
    }
  } catch (err) {
    console.error("Error retrieving file history:", err.message);
  }
  console.log("=====================================\n");
});
