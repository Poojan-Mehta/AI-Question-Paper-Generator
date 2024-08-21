import * as fs from 'fs';
import * as path from 'path';

export const readTextFile = (filename: string): string => {
  try {
    const filePath = path.join(__dirname, '../../', filename);    
    const data = fs.readFileSync(filePath, 'utf-8');
    return data;
  } catch (error) {
    console.error(`Error reading file ${filename}:`, error);
    throw error;
  }
};
