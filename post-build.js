import * as fs from 'node:fs/promises';

// Render db out into separate files for each entity type for prod

let file = await fs.readFile(
  './dist/mhwbgcampaign-tracker/browser/assets/db.json',
  'utf-8'
);

let db = JSON.parse(file);

const { materials, equipment, monsters } = db;

await fs.writeFile(
  './dist/mhwbgcampaign-tracker/browser/assets/materials',
  JSON.stringify(materials),
  'utf-8'
);
await fs.writeFile(
  './dist/mhwbgcampaign-tracker/browser/assets/equipment',
  JSON.stringify(equipment),
  'utf-8'
);
