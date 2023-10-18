import api_axiosConfig from "./api_axiosConfig";
import requestIp from "request-ip";

export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      let server_req = await api_axiosConfig.get("/setup_2FA", {
        headers: {
          "Content-Type": "image/png",
          "Client-IP": requestIp.getClientIp(req),
          Authorization: req.headers.authorization,
        },
        responseType: "arraybuffer",
      });
      res.status(server_req.status).json(server_req.data);
    } catch (err) {
      res.status(err.response.status).json(err.response.data);
    }
  } else {
    // Method not allowed
    res.status(405).json();
  }
}
