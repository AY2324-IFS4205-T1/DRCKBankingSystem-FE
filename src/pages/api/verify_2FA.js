import api_axiosConfig from "./api_axiosConfig";

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      let server_req = await api_axiosConfig.post("/verify_2FA", req.body, {
        headers: {
          "Content-Type": "application/json",
          Authorization: req.headers.authorization,
        },
      });
      res.status(server_req.status).json(server_req.data);
    } catch (err) {
      res.status(err.response.status).json(err.response.data);
    }
  } else {
    // Method not allowed
    res.status(405);
  }
}