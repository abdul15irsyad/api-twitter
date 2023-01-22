import dayjs from 'dayjs';
import ObjectsToCsv from 'objects-to-csv';
import { writeFileSync } from 'fs';
import { fetchTweetSearcRecent } from './service';

// main
(async () => {
    try {
        const filePath = (format: 'json' | 'csv') => `assets/${format}/${dayjs().valueOf()}-tweet-search-recent.${format}`;
        const keyword = 'kucing'; // according to the keywords we want to find
        const countData = 100;
        const tweetSearcRecents = await fetchTweetSearcRecent(keyword, countData);

        // output file as json
        writeFileSync(filePath('json'), JSON.stringify(tweetSearcRecents));

        // output file as csv
        await (new ObjectsToCsv(tweetSearcRecents)).toDisk(filePath('csv'));
    } catch (error: any) { return console.log(error) }
})();