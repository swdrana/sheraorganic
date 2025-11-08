const fs = require('fs');
const path = require('path');

const distDir = path.join(__dirname, '..', '.next');
const prerenderManifestPath = path.join(distDir, 'prerender-manifest.json');

function ensurePrerenderManifest() {
  try {
    if (!fs.existsSync(distDir)) {
      console.error('Postbuild: .next directory not found. Build may have failed.');
      process.exit(1);
    }

    if (fs.existsSync(prerenderManifestPath)) {
      console.log('Postbuild: prerender-manifest.json already exists.');
      return;
    }

    const manifest = {
      version: 3,
      routes: {},
      dynamicRoutes: {},
      notFoundRoutes: [],
      preview: {
        previewModeId: '00000000000000000000000000000000',
        previewModeSigningKey: '00000000000000000000000000000000',
        previewModeEncryptionKey: '00000000000000000000000000000000'
      }
    };

    fs.writeFileSync(prerenderManifestPath, JSON.stringify(manifest));
    console.log('Postbuild: Created missing prerender-manifest.json');
  } catch (err) {
    console.error('Postbuild: Failed to create prerender-manifest.json', err);
    process.exit(1);
  }
}

ensurePrerenderManifest();