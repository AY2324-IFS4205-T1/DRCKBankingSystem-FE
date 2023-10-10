import { HttpStatusCode } from "axios";
import api_axiosConfig from "./api_axiosConfig";

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      let server_req = await api_axiosConfig.post("/auth_check", req.body, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${req.headers.authorization}`,
        },
      });

      // If user is not logged in, send 401
      if (server_req.status == HttpStatusCode.Unauthorized) {
        res.status(HttpStatusCode.Unauthorized);
        return;
      }

      // Send 200 back if user is authenticated and authorised. Else, send 403 Forbidden
      if (server_req.data.authenticated && server_req.data.authorised) {
        res.status(HttpStatusCode.Ok).json();
        return;
      } else {
        res.status(HttpStatusCode.Forbidden).json(server_req.data);
      }

    } catch (server_req_err) {
      res.status(server_req_err.response.status).json(server_req_err.response.data);
    }
  } else {
    // Method not allowed
    res.status(405);
  }
}
