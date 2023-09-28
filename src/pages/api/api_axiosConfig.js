// Axios config for front end API to back end
// This provides the default configuration for base URL and
// placing the httpsAgent for SSL connection

import axios from 'axios';
const fs = require('fs');
const https = require('https');

const httpsAgent = new https.Agent({
    ca: fs.readFileSync(`${process.env.NEXT_PUBLIC_CA}`),
    cert: fs.readFileSync(`${process.env.NEXT_PUBLIC_CLIENT_CERT}`),
    key: fs.readFileSync(`${process.env.NEXT_PUBLIC_CLIENT_KEY}`),
});

const instance = axios.create({
    baseURL: `${process.env.DJANGO_BASE_URL}`,
    httpsAgent: httpsAgent
})

export default instance;