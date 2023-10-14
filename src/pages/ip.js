import axios from 'axios';
import { useState, useEffect } from "react";

export default function IpTest() {
  const [data, setData] = useState();

  useEffect(() => {
    async function getData() {
      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_BASE_API_URL}/ip`);
        console.log(response);
        setData(JSON.stringify(response.data))
      } catch (err) { console.log(err) }
    }
    getData();
  }, []);

  return (
    <>
      <div>
        { data }
      </div>
    </>
  );
}
