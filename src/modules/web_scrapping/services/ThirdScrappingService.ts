import axios from 'axios';
import * as cheerio from 'cheerio';
import { sleep } from '../../../shared/utils/sleep';

interface Job {
  title: string;
  url: string;
}

interface JobWithDescription extends Job {
  description: string;
}

export class ThirdScrappingService {
  private mainUrl: string;

  constructor() {
    this.mainUrl = 'https://braigslist.vercel.app';
  }

  private async scrapeJobsFromIndexPages() {
    const allJobs = [];

    for (let i = 1; i < 14; i++) {
      const jobIndexPage = await axios.get(`${this.mainUrl}/jobs/${i}`);

      console.log('Request fired', `${this.mainUrl}/jobs/${i}`);

      await sleep(1000);

      const $ = cheerio.load(jobIndexPage.data);

      const jobs = $('.title-blob > a')
        .map((_, element) => {
          const title = $(element).text();
          const url = $(element).attr('href');

          return { title, url };
        })
        .get();

      allJobs.push(...jobs);
    }

    return allJobs;
  }

  private async scrapeJobDescriptions(allJobs: Job[]) {
    const allJobsWithDescriptions: JobWithDescription[] = [];

    for (const job of allJobs) {
      const jobDescriptionPage = await axios.get(`${this.mainUrl}/${job.url}`);

      console.log('Request fired', job.url);
      await sleep(1000);

      const $ = cheerio.load(jobDescriptionPage.data);

      const description = $('div').text();

      const jobWithDescription: JobWithDescription = { ...job, description };

      allJobsWithDescriptions.push(jobWithDescription);
    }
  }

  async execute() {
    const allJobs = await this.scrapeJobsFromIndexPages();
    await this.scrapeJobDescriptions(allJobs);
  }
}
