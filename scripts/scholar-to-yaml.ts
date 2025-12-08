#!/usr/bin/env tsx
/**
 * Convert Google Scholar JSON output to YAML
 *
 * Usage:
 *   npm run scholar-to-yaml [input.json] [output.yml]
 *   npm run scholar-to-yaml scholar-data.json src/data/publications.yml
 */

import * as fs from 'fs';
import * as path from 'path';
import * as yaml from 'js-yaml';

function main() {
  const args = process.argv.slice(2);
  const inputPath = args[0] || 'scholar-data.json';
  const outputPath =
    args[1] || path.join(__dirname, '../src/data/publications.yml');

  console.log('Converting JSON to YAML...');
  console.log(`Input: ${inputPath}`);
  console.log(`Output: ${outputPath}`);

  try {
    // Read JSON
    const jsonData = JSON.parse(fs.readFileSync(inputPath, 'utf-8'));

    // Convert to YAML
    const yamlStr = yaml.dump(jsonData, {
      indent: 2,
      lineWidth: 100,
      noRefs: true,
      sortKeys: false,
    });

    // Write YAML
    fs.writeFileSync(outputPath, yamlStr, 'utf-8');

    console.log(`✓ Successfully converted to YAML`);
    console.log(`  Publications: ${jsonData.publications?.length || 0}`);
    console.log(`  Citations: ${jsonData.profile?.citations || 0}`);
    console.log(`  h-index: ${jsonData.profile?.h_index || 0}`);
  } catch (error: any) {
    console.error(`✗ Error: ${error.message}`);
    process.exit(1);
  }
}

if (require.main === module) {
  main();
}
