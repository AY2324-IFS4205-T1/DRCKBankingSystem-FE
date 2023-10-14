import api_axiosConfig from "../api_axiosConfig";
import requestIp from "request-ip";
import { getCookie } from "cookies-next";

export default async function handler(req, res) {
  if (req.method === "POST") {
    console.log("CSRF TOKEN: " + getCookie("csrftoken"));
    try {
      let server_req = await api_axiosConfig.post("/customer/deposit", req.body, {
        headers: {
          "Content-Type": "application/json",
          "Client-IP": requestIp.getClientIp(req),
          "X-CSRFToken": getCookie("csrftoken"),
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
