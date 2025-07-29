import axios from 'axios';
import * as cheerio from 'cheerio';

export class SecondScrappingService {
  private mainUrl: string;

  constructor() {
    this.mainUrl = 'https://www.codingwithstefan.com';
  }

  async execute() {
    const result = await axios.get(`${this.mainUrl}/table-example`);

    const $ = cheerio.load(result.data);

    // $('body > table > tbody > tr > td').each((index, element) => {
    //   console.log(index, $(element).text());
    // });

    // const scrapedRows = [];

    // $('body > table > tbody > tr').each((index, element) => {
    //   if (index === 0) return true;
    //   const tds = $(element).find('td');
    //   const company = $(tds[0]).text();
    //   const contact = $(tds[1]).text();
    //   const country = $(tds[2]).text();

    //   // console.log($($(element).find('td')[0]).text());

    //   scrapedRows.push({ company, contact, country });
    // });

    // console.log(scrapedRows);

    const scrapedRows = [];
    const tableHeaders = [];

    $('body > table > tbody > tr').each((index, element) => {
      if (index === 0) {
        const ths = $(element).find('th');
        ths.each((_, thsElement) => {
          tableHeaders.push($(thsElement).text().toLowerCase());
        });

        return true;
      }

      const tds = $(element).find('td');

      const tableRow = {};

      tds.each((tdIndex, tdsElement) => {
        tableRow[tableHeaders[tdIndex]] = $(tdsElement).text();
      });

      scrapedRows.push(tableRow);
    });

    console.log(scrapedRows);
  }
}
