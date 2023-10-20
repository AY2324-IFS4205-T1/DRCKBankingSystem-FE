import api_axiosConfig from "../../api_axiosConfig";
import requestIp from "request-ip";

export default async function handler(req, res) {
  const { severity, start, end } = req.query;

  if (req.method === "GET") {
    try {
      let server_req = await api_axiosConfig.post("/staff/access_control_logs",
        {
          severity: severity,
          start: start,
          end: end
        },
        {
          headers: {
            "Content-Type": "application/json",
            "Client-IP": requestIp.getClientIp(req),
            Authorization: req.headers.authorization,
          },
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