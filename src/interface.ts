export interface ITweetSearcRecentResponse {
    data: ITweetSearcRecent[],
    meta: {
        newest_id: string,
        oldest_id: string,
        result_count: number,
        next_token: string,
    }
}

export interface ITweetSearcRecent {
    id: string,
    text: string,
}