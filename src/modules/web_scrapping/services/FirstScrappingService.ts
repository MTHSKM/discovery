import axios from 'axios';
import { writeFile } from 'fs/promises';
import { join } from 'path';
import { TMP_FILES_PATH } from '../../../config/path/temp';
import * as cheerio from 'cheerio';

export class FirstScrappingService {
  private mainUrl: string;

  constructor() {
    this.mainUrl = 'https://books.toscrape.com';
  }

  async execute() {
    const html = await axios.get(this.mainUrl);

    const filePath = join(TMP_FILES_PATH, '/test.html');

    await writeFile(filePath, html.data);

    const $ = cheerio.load(html.data);

    // const theText = $('h1').text();

    $('a').each((_, element) => {
      console.log($(element).text());
    });

    // console.log(theText);
  }
}
