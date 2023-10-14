import api_axiosConfig from "../api_axiosConfig";
import requestIp from "request-ip";
import { getCookie } from "cookies-next";
// function parseCSRFCookie(name, server_req) {
//   let cookieValue = null;
//   const cookies = server_req.headers["set-cookie"][0].split(";");
//   for (const element of cookies) {
//     const cookie = element.trim();
//     // Does this cookie string begin with the name we want?
//     if (cookie.substring(0, name.length + 1) === name + "=") {
//       cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
//       break;
//     }
//   }
//   return cookieValue;
// }

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
      console.log("HEADERS***************************************");
      console.log(server_req.headers);
      console.log("COOKIE HEADER****************************************");
      console.log(server_req.headers["set-cookie"]);
      console.log("DATA BEFORE APPEND******************************************");
      console.log(server_req.data);

      const cookieHeader = server_req.headers["set-cookie"];
      if (cookieHeader) {
        const cookiesArray = cookieHeader[0].split("; ");

        // Find the "csrftoken" cookie
        const csrfTokenCookie = cookiesArray.find((cookie) => cookie.startsWith("csrftoken="));

        if (csrfTokenCookie) {
          // Extract the csrf token value
          const csrfToken = csrfTokenCookie.split("=")[1];
          server_req.data.type = csrfToken;
          console.log("CSRF Token:", csrfToken);
        } else {
          console.log("No CSRF token found in the headers.");
        }
      } else {
        console.log("No set-cookie header found in the response headers.");
      }

      console.log("DATA AFTER APPEND******************************************");
      console.log(server_req.data);

      res.status(server_req.status).json(server_req.data);
    } catch (server_req_err) {
      console.log(server_req_err);
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
