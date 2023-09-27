const fs = require('fs');
const https = require('https');
import axios from "axios";

const httpsAgent = new https.Agent({
  ca: fs.readFileSync(`${process.env.NEXT_PUBLIC_CA}`),        
  cert: fs.readFileSync(`${process.env.NEXT_PUBLIC_CLIENT_CERT}`),
  key: fs.readFileSync(`${process.env.NEXT_PUBLIC_CLIENT_KEY}`), 
})

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      let server_req = await axios.post('https://ifs4205-23s1-1-2-i.comp.nus.edu.sg:8000/customer/login', req.body, {
        headers: {
          'Content-Type': 'application/json'
        },
        httpsAgent: httpsAgent
      })
      res.status(200).json(server_req.data);
    } catch (err) {
      res.status(err.response.status).json(err.response.data);
    }

  } else {
    // Method not allowed
    res.status(405);
  }
}