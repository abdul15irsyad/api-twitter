# Fetch Search Tweets From Twitter API

fetch tweets from twitter api v2 (https://developer.twitter.com/en/docs/twitter-api)

## Before Installation

if you dont have any account at https://developer.twitter.com, please create it first to get authentication token for this project

## Installation

1. clone repo
```bash
git clone git@github.com:abdul15irsyad/api-twitter.git
cd api-twitter
```
2. install dependencies
```bash
npm install
```

3. create `.env` file from `.env.example` : open twitter api credential on https://developer.twitter.com/en/portal/dashboard, and open the project (create if you dont have one) and then copy authentication token and other credential, paste it on `.env` file

4. run project
```bash
npm run start
```
5. get the file result in folder `assets` with format `.json` & `.csv`