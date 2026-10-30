import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

const currentDir = import.meta.dirname;

const packageJson = JSON.parse(fs.readFileSync(path.join(currentDir, 'package.json'), 'utf8'));

const getVersion = (pkg: string) => packageJson.dependencies?.[pkg] || packageJson.devDependencies?.[pkg] || 'Not Found';

const versions = {
  node: process.version,
  npm: execSync('npm -v').toString().trim(),
  typescript: getVersion('typescript'),
  angular: getVersion('@angular/core'),
  ionic: getVersion('@ionic/angular')
};

const content = `export const versions = ${JSON.stringify(versions, null, 2)};\n`;

fs.writeFileSync(path.join(currentDir, 'src', 'app', 'versions.ts'), content);
console.log('✅ Versions generated at src/app/versions.ts');
