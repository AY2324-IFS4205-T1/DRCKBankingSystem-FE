import api_axiosConfig from "./api_axiosConfig";

export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      let server_req = await api_axiosConfig.get("/auth_check", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${req.headers.authorization}`,
          Type: req.headers.usertype,
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
