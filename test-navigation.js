// Simple test to verify navigation setup
console.log('Testing navigation setup...');

// Check if key files exist
const fs = require('fs');
const path = require('path');

const filesToCheck = [
  'src/screens/wedding/Services2.tsx',
  'src/screens/home/service.tsx',
  'app/services2.tsx',
  'app/_layout.tsx'
];

filesToCheck.forEach(file => {
  const filePath = path.join(__dirname, file);
  if (fs.existsSync(filePath)) {
    console.log(`✓ ${file} exists`);
  } else {
    console.log(`✗ ${file} missing`);
  }
});

console.log('Navigation setup test completed.');
