import api_axiosConfig from "./api_axiosConfig";
import requestIp from "request-ip";

export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      let server_req = await api_axiosConfig.get("/csrf", {
        headers: {
          "Content-Type": "application/json",
          "Client-IP": requestIp.getClientIp(req),
        },
      });

      const cookieHeader = server_req.headers["set-cookie"];
      const cookiesArray = cookieHeader[0].split("; ");

      // Find the "csrftoken" cookie
      const csrfTokenCookie = cookiesArray.find((cookie) => cookie.startsWith("csrftoken="));

      // Extract the csrf token value
      const csrfToken = {
        csrftoken: csrfTokenCookie.split("=")[1],
      };
      // Append to data
      //server_req.data.csrftoken = csrfToken;
      console.log("CSRF Token:", csrfToken);
      res.status(server_req.status).json(csrfToken);
    } catch (server_req_err) {
      res.status(server_req_err.status).json(server_req_err.data);
    }
  } else {
    // Method not allowed
    res.status(405);
  }
}
