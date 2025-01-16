import fs from 'fs';
import path from 'path';

export const loadTranslations = (lang) => {
  const dir = path.join(process.cwd(), 'data', `data_${lang}`);
  const files = fs.readdirSync(dir);
  const translations = {};

  files.forEach((file) => {
    const filePath = path.join(dir, file);
    const jsonData = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
    translations[file.replace('.json', '')] = jsonData;
  });

  return translations;
};


