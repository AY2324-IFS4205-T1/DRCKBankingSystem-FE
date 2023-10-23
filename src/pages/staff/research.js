import Navbar_Staff from "@/components/navbar_staff";
import axiosConfig from "../../axiosConfig";
import { useState } from "react";
import { toast } from "react-toastify";

export default function Anonymization(props) {
  const [queryValue, setQueryValue] = useState("1");
  const [queryData, setQueryData] = useState({
    utility: null,
    results: {}
  });

  async function queryResult() {
    try {
      let response = await axiosConfig.post("/staff/anon/query_results", { query: queryValue });
      setQueryData(response.data);
    } catch (err) {
      toast.error(err.response.data);
    }
  }

  async function downloadData() {
    try {
      let response = await axiosConfig.get("/staff/anon/data");

      // create "a" HTML element with href to file & click
      const href = URL.createObjectURL(new Blob([response.data], { type: "text/csv" }));
      const link = document.createElement('a');
      link.href = href;
      link.setAttribute('download', 'output.csv');
      link.click();

      // clean up "a" element & remove ObjectURL
      link.remove();
      URL.revokeObjectURL(href);
    } catch (err) {
      toast.error(err.response.data);
    }
  }

  return (
    <>
      <Navbar_Staff role={props.role} />
      <div className="min-h-screen bg-gray-200">
        <div className="mx-auto max-w-7xl divide-y-2 divide-slate-400 px-2 py-8 sm:px-6 lg:px-8">
          <div className="py-8">
            <h1 className="text-5xl">Research</h1>
            <div className="mt-2">
              <div>
                <h2 className="text-lg font-black">Query</h2>
                <p className="text-sm">
                  Utility value and data from the Query can be shown here.
                </p>
                <select
                  className="rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  onChange={(e) => setQueryValue(e.currentTarget.value)}
                >
                  <option value="1">Average withdrawal amount of Singaporeans in the past 5 years</option>
                  <option value="2">Average balance based on different account types of Singaporeans</option>
                </select>
                <button className="bg-slate-300 hover:bg-slate-400 text-black py-1 px-2 rounded ml-1" onClick={queryResult}>
                  Get Query
                </button>
              </div>

              <div className={queryData.utility != null ? "block mt-2" : "hidden"}>
                <p>Utility value: {Number(queryData.utility).toFixed(2)}%</p>
                <table className="border border-collapse border-slate-500">
                  <tbody>
                    {
                      Object.entries(queryData.results).map(([key, value]) => {
                        return (
                          <tr key={key}>
                            <td className="border border-slate-500">{key}</td>
                            <td className="border border-slate-500">{value}</td>
                          </tr>
                        );
                      })
                    }
                  </tbody>
                </table>
              </div>

              <div className="mt-2">
                <h2 className="text-lg font-black">Download Data</h2>
                <p className="text-sm">
                  Anonymised Data will be downloaded in .csv format.
                </p>
                <button className="bg-slate-300 hover:bg-slate-400 text-black py-1 px-2 rounded" onClick={downloadData}>
                  Download
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
