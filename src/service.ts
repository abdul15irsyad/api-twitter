import { apiTwitter } from "./config";
import { ITweetSearcRecent, ITweetSearcRecentResponse } from "./interface";

export const fetchTweetSearcRecent = async (keyword: string, count: number = 100) => {
    const tweetSearcRecents: ITweetSearcRecent[] = [];

    let nextToken: string = '';
    for await (const i of Array.from({ length: count / 100 }, (_, i) => i)) {
        const response = await apiTwitter.get<ITweetSearcRecentResponse>(`tweets/search/recent?query=${keyword}&max_results=100${nextToken != '' ? `&next_token=${nextToken}` : ''}`);
        nextToken = response.data.meta.next_token;
        for (const data of response.data.data) {
            if (!tweetSearcRecents.find((tweetSearcRecent) => tweetSearcRecent.id == data.id)) tweetSearcRecents.push({ id: data.id, text: data.text });
        }
    }
    return tweetSearcRecents;
}