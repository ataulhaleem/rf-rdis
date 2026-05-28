/**
 * Returns the FAIRness object for a given RDI id, or undefined if not found.
 */
export function getFairnessById(id: string): any | undefined {
  const rdi = getRdiById(id);
  return rdi ? rdi.FAIRness : undefined;
}
import * as fs from 'fs';
import * as path from 'path';

// Type for a single RDI (can be extended with more specific fields)
export interface Rdi {
  [key: string]: any;
}

const dataDir = path.join(__dirname, '../data');

// Load all JSON files in the data directory
function loadAllRdis(): Rdi[] {
  const files = fs.readdirSync(dataDir).filter(f => f.endsWith('.json'));
  return files.map(f => {
    const filePath = path.join(dataDir, f);
    const raw = fs.readFileSync(filePath, 'utf-8');
    const obj = JSON.parse(raw);
    obj.__id = f.replace(/\.json$/, '');
    return obj;
  });
}

const allRdis: Rdi[] = loadAllRdis();

export function getAllRdis(): Rdi[] {
  return allRdis;
}

export function getRdiById(id: string): Rdi | undefined {
  return allRdis.find(rdi => rdi.__id === id);
}

export function searchRdis(predicate: (rdi: Rdi) => boolean): Rdi[] {
  return allRdis.filter(predicate);
}
