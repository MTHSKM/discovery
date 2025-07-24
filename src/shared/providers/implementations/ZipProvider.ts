import path = require('path');
import { IZipProvider } from '../models/IZipProvider';
import { RESOURCES_PATH } from '../../../config/path/resources';
import { existsSync, readdirSync, readFileSync, statSync } from 'fs';
const pdf = require('pdf-parse');

export class ZipProvider implements IZipProvider {
  constructor() {}

  async loadPDFsFromFolder(folder: string) {
    const folderPath = path.join(RESOURCES_PATH, folder);

    if (!existsSync(folderPath)) {
      throw new Error(`O caminho não existe: ${folderPath}`);
    }

    const stats = statSync(folderPath);

    if (!stats.isDirectory()) {
      throw new Error(`O caminho fornecido não é uma pasta: ${folderPath}`);
    }

    const files = readdirSync(folderPath);

    const documents = [];

    for (const filename of files) {
      const filePath = path.join(folderPath, filename);

      const fileStats = statSync(filePath);
      if (fileStats.isFile() && filename.toLowerCase().endsWith('.pdf')) {
        const buffer = readFileSync(filePath);

        try {
          const result = await pdf(buffer);
          documents.push({
            filename,
            text: result.text,
          });
        } catch (err) {
          console.error(`Erro ao processar ${filename}:`, err.message);
        }
      }
    }

    return documents;
  }
}
