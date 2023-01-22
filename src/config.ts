import axios from "axios";
import { config } from 'dotenv';
config();

export const apiTwitter = axios.create({
    baseURL: `https://api.twitter.com/2/`,
    headers: { Authorization: `Bearer ${process.env.ACCESS_TOKEN}` }
});