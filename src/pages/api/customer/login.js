import api_axiosConfig from "../api_axiosConfig";
import requestIp from "request-ip";

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      let server_req = await api_axiosConfig.post("/customer/login", req.body, {
        headers: {
          "Content-Type": "application/json",
          "Client-IP": requestIp(req)
        },
      });

      server_req.data.type = "customer";

      res.status(server_req.status).json(server_req.data);
    } catch (server_req_err) {
      const errorMessage = "Wrong Username/Password";
      res.status(server_req_err.response.status).json({ error: errorMessage });
    }
  } else {
    // Method not allowed
    res.status(405);
  }
}
