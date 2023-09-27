import axios from "axios";

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      let server_req = await axios.post('https://ifs4205-23s1-1-1.comp.nus.edu.sg:8000/customer/register', req.body, {
        headers: {
          'Content-Type': 'application/json'
        }
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