const fs = require('fs');
let file = fs.readFileSync('src/lib/storage.ts', 'utf-8');

const target1 = `        if (toUpdate.length > 0) {`;
const replacement1 = `        localStorage.setItem('LAST_WRITE_TIME', Date.now().toString());
        if (toUpdate.length > 0) {`;

file = file.replace(target1, replacement1);

const target2 = `  deleteIntegrado: async (id: string, visitIds?: string[]) => {`;
const replacement2 = `  deleteIntegrado: async (id: string, visitIds?: string[]) => {
    localStorage.setItem('LAST_WRITE_TIME', Date.now().toString());`;

file = file.replace(target2, replacement2);

const target3 = `  deleteVisit: async (id: string) => {`;
const replacement3 = `  deleteVisit: async (id: string) => {
    localStorage.setItem('LAST_WRITE_TIME', Date.now().toString());`;

file = file.replace(target3, replacement3);

fs.writeFileSync('src/lib/storage.ts', file);
console.log('patched storage write time');
