import * as fs from 'node:fs/promises';

// Render db out into separate files for each entity type for prod

var file = await fs.readFile(
  './dist/mhwbgcampaign-tracker/assets/db.json',
  'utf-8'
);

var db = JSON.parse(file);

const { materials, equipment } = db;

await fs.writeFile(
  './dist/mhwbgcampaign-tracker/assets/materials.json',
  JSON.stringify(materials),
  'utf-8'
);
await fs.writeFile(
  './dist/mhwbgcampaign-tracker/assets/equipment.json',
  JSON.stringify(equipment),
  'utf-8'
);
