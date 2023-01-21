import axios from "axios";
import { config } from 'dotenv';
import { readFileSync, writeFileSync, existsSync } from 'fs';
import dayjs from 'dayjs';
config();

const apiTwitter = axios.create({
    baseURL: `https://api.twitter.com/2/`,
    headers: { Authorization: `Bearer ${process.env.ACCESS_TOKEN}` }
});

interface ITweetSearcRecentResponse {
    data: ITweetSearcRecent[],
    meta: {
        newest_id: string,
        oldest_id: string,
        result_count: number,
        next_token: string,
    }
}

interface ITweetSearcRecent {
    id: string,
    text: string,
}

const fetchTweetSearcRecent = async (filePath: string, keyword: string, count: number = 100) => {
    const tweetSearcRecents: ITweetSearcRecent[] = existsSync(filePath) ? JSON.parse(readFileSync(filePath).toString()) : [];

    let nextToken: string = '';
    for await (const i of Array.from({ length: count / 100 }, (_, i) => i)) {
        const response = await apiTwitter.get<ITweetSearcRecentResponse>(`tweets/search/recent?query=${keyword}&max_results=100${nextToken != '' ? `&next_token=${nextToken}` : ''}`);
        nextToken = response.data.meta.next_token;
        for (const data of response.data.data) {
            if (!tweetSearcRecents.find((tweetSearcRecent) => tweetSearcRecent.id == data.id)) tweetSearcRecents.push(data);
        }
    }
    return tweetSearcRecents;
}

// main
(async () => {
    try {
        const filePath = `assets/${dayjs().valueOf()}-tweet-search-recent.json`;
        const keyword = 'anies baswedan';
        const tweetSearcRecents = await fetchTweetSearcRecent(filePath, keyword, 500)
        // create file
        writeFileSync(filePath, JSON.stringify(tweetSearcRecents));
    } catch (error: any) {
        return console.log(error);
    }
})();