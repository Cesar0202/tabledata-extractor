const fs = require('fs');
const path = require('path');
const archiver = require('archiver');

// Ensure public directory exists for the landing page
const outputDir = path.join(__dirname, '../landing/public');
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// Target zip file in the landing page public folder
const outputPath = path.join(outputDir, 'tabledata-extractor.zip');
const output = fs.createWriteStream(outputPath);
const archive = archiver('zip', {
  zlib: { level: 9 } // Maximum compression
});

output.on('close', function() {
  console.log('✅ Extension packed successfully!');
  console.log(`Total size: ${archive.pointer()} bytes`);
  console.log(`Saved to: ${outputPath}`);
});

archive.on('error', function(err) {
  throw err;
});

archive.pipe(output);

// ONLY pack the dist folder
const distPath = path.join(__dirname, '../extension/dist');

if (!fs.existsSync(distPath)) {
  console.error('❌ Error: dist/ folder not found. Run `npm run build:extension` first.');
  process.exit(1);
}

// Append files from a sub-directory, putting its contents at the root of archive
archive.directory(distPath, false);

// Finalize the archive
archive.finalize();
