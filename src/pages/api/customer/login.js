import api_axiosConfig from "../api_axiosConfig";
import requestIp from "request-ip";
import { getCookie } from "cookies-next";

async function getCsrfToken() {
  try {
    const response = await axios.get(`${process.env.NEXT_BASE_API_URL}/csrf`);
    console.log(response);
    //setCookie("csrftoken", response.data.csrftoken);
  } catch (isError) {
    console.log(isError.message);
  }
}

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const csrfToken = getCsrfToken();

      // console.log("COOKIE SENT TO BACKEND: " + getCookie("csrftoken", { req, res }));
      console.log("COOKIE SENT TO BACKEND: " + csrfToken.data.csrftoken);
      let server_req = await api_axiosConfig.post("/customer/login", req.body, {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
          "Client-IP": requestIp.getClientIp(req),
          "X-CSRFToken": csrfToken.data.csrftoken,
          Referer: "https://ifs4205-23s1-1-1-i.comp.nus.edu.sg",
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
      res.status(server_req_err.response.status).json(server_req_err.response.data);
      console.log("ERRMSG: " + server_req_err.response.data);
      // if (server_req_err.response.status === 400) {
      //   const errorMessage = "Wrong Username/Password";
      //   res.status(server_req_err.response.status).json({ error: errorMessage });
      // } else {
      //   res.status(server_req_err.response.status).json(server_req_err.response.data);
      // }
    }
  } else {
    // Method not allowed
    res.status(405);
  }
}
