import api_axiosConfig from "../api_axiosConfig";
import requestIp from "request-ip";

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      let server_req = await api_axiosConfig.post("/customer/login", req.body, {
        headers: {
          "Content-Type": "application/json",
          "Client-IP": requestIp.getClientIp(req),
        },
      });

      server_req.data.type = "customer";

      const cookieHeader = server_req.headers["set-cookie"];
      if (cookieHeader) {
        const cookiesArray = cookieHeader[0].split("; ");

        // Find the "csrftoken" cookie
        const csrfTokenCookie = cookiesArray.find((cookie) => cookie.startsWith("csrftoken="));

        if (csrfTokenCookie) {
          // Extract the csrf token value
          const csrfToken = csrfTokenCookie.split("=")[1];
          // Append to data
          server_req.data.csrftoken = csrfToken;
          console.log("CSRF Token:", csrfToken);
        } else {
          console.log("No CSRF token found in the headers.");
        }
      } else {
        console.log("No set-cookie header found in the response headers.");
      }

      res.status(server_req.status).json(server_req.data);
    } catch (server_req_err) {
      if (server_req_err.response.status === "400") {
        const errorMessage = "Wrong Username/Password";
        res.status(server_req_err.response.status).json({ error: errorMessage });
      } else {
        res.status(server_req_err.response.status).json(server_req_err.response.data);
      }
    }
  } else {
    // Method not allowed
    res.status(405);
  }
}
