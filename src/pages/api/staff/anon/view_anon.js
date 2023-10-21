import api_axiosConfig from "../../api_axiosConfig";
import requestIp from "request-ip";

export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      let server_req = await api_axiosConfig.get("/staff/view_anon_stats",
        {
          headers: {
            "Content-Type": "application/json",
            "Client-IP": requestIp.getClientIp(req),
            Authorization: req.headers.authorization,
          },
          responseType: "arraybuffer",
        });
      res.status(server_req.status).json(server_req.data);
    } catch (server_req_err) {
      res.status(server_req_err.response.status).json(server_req_err.response.data);
    }
  } else {
    // Method not allowed
    res.status(405);
  }
}