import api_axiosConfig from "./api_axiosConfig";
import requestIp from "request-ip";

export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      console.log("?");
      const detectedIp = requestIp.getClientIp(req);
      console.log(detectedIp);

      let server_req = await api_axiosConfig.get("/ip", {});

      const combinedData = {
        clientIp: detectedIp,
        backendData: server_req.response.data,
      };

      res.status(server_req.status).json(combinedData);
    } catch (server_req_err) {
      res.status(server_req_err.response.status).json(server_req_err.response.data);
    }
  } else {
    // Method not allowed
    res.status(405);
  }
}
