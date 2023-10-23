import Navbar_Staff from "@/components/navbar_staff";
import axiosConfig from "../../axiosConfig";
import { useState } from "react";
import { useRouter } from "next/router";
import { toast } from "react-toastify";

export default function Anonymization(props) {
  const router = useRouter();

  // Check staff role manually
  if (props.role !== "Anonymity Officer" && props.role !== "Researcher") {
    router.push('/staff/dashboard');
  }

  const [showGraph, setShowGraph] = useState(false);
  const [graphImage, setGraphImage] = useState("");

  const [showKValue, setShowKValue] = useState(false);
  const [kValue, setKValue] = useState("");

  const [showQuery, setShowQuery] = useState(false);
  const [queryValue, setQueryValue] = useState("1");
  const [queryData, setQueryData] = useState({
    utility: null,
    results: {}
  });

  async function regenerateData() {
    try {
      await axiosConfig.get("/staff/anon/calculate_anon");
      toast.success("Data generated successfully.");
    } catch (err) {
      toast.error(err.response.data['non_field_errors'][0]);
    }
  }

  async function renderGraph() {
    try {
      let response = await axiosConfig.get("/staff/anon/view_anon");
      setGraphImage(Buffer.from(response.data, "binary").toString("base64"));
      setShowGraph(true);
    } catch (err) {
      toast.error(err.response.data['non_field_errors'][0]);
    }

  }

  async function updateKValue() {
    try {
      let response = await axiosConfig.post("/staff/anon/set_k", { k_value: kValue });
      toast.success(response.data.success);
    } catch (err) {
      toast.error(err.response.data['non_field_errors'][0]);
    }
  }

  async function queryResult() {
    try {
      let response = await axiosConfig.post("/staff/anon/query_results", { query: queryValue });
      setQueryData(response.data);
    } catch (err) {
      toast.error(err.response.data['non_field_errors'][0]);
    }

  }

  async function downloadData() {
    try {
      let response = await axiosConfig.post("/staff/anon/data", { query: queryValue });

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
      toast.error(err.response.data['non_field_errors'][0]);
    }
  }

  return (
    <>
      <Navbar_Staff role={props.role} />
      <div className="min-h-screen bg-gray-200">
        <div className="mx-auto max-w-7xl divide-y-2 divide-slate-400 px-2 py-8 sm:px-6 lg:px-8">
          <div className="py-8">
            <h1 className="text-5xl">Anonymization Data</h1>
            <div className="my-3">
              {props.role == "Anonymity Officer" &&
                <span>
                  <button className="bg-slate-300 hover:bg-slate-400 text-black py-1 px-2 rounded" onClick={regenerateData}>
                    Regenerate Data
                  </button>
                  <button className="bg-slate-300 hover:bg-slate-400 text-black py-1 px-2 rounded ml-1" onClick={renderGraph}>
                    Show/Refresh Graph
                  </button>
                  <button className="bg-slate-300 hover:bg-slate-400 text-black py-1 px-2 rounded ml-1" onClick={() => setShowKValue(true)}>
                    Set K-Value
                  </button>
                </span>
              }

              {(props.role == "Anonymity Officer" || props.role == "Researcher") &&
                <span>
                  <button className="bg-slate-300 hover:bg-slate-400 text-black py-1 px-2 rounded ml-1" onClick={() => setShowQuery(true)}>
                    Query Result
                  </button>
                </span>
              }
            </div>
            {/* If anony, show graph and K-value */}
            {props.role == "Anonymity Officer" &&
              <div>
                <div className={showKValue ? "block" : "hidden"}>
                  <h2 className="text-lg">K-Value</h2>
                  <div>
                    <input
                      type="text"
                      name="kvalue"
                      id="kvalue"
                      required
                      className="rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      onChange={(e) => {
                        setKValue(e.currentTarget.value);
                      }}
                    />
                    <button
                      type="submit"
                      className="ml-1 rounded-md bg-indigo-600 px-2 py-1.5 text-base font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                      onClick={updateKValue}
                    >
                      Confirm
                    </button>
                    <button
                      type="submit"
                      className="ml-1 rounded-md bg-slate-600 px-2 py-1.5 text-base font-semibold text-white shadow-sm"
                      onClick={() => setShowKValue(false)}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
                <div className={showGraph ? "block" : "hidden"}>
                  <h2 className="text-lg">Graph</h2>
                  <img className="inline" src={`data:image/png;base64,${graphImage}`}></img>
                </div>
              </div>
            }

            {/* If researcher, show query result */}

            <div className={showQuery ? "block" : "hidden"}>
              <div>
                <h2 className="text-lg">Query Result</h2>
                <select
                  className="rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  onChange={(e) => setQueryValue(e.currentTarget.value)}
                >
                  <option value="1">Query Result 1</option>
                  <option value="2">Query Result 2</option>
                </select>
                {props.role == "Researcher" &&
                  <button
                    type="submit"
                    className="ml-1 rounded-md bg-indigo-600 px-2 py-1.5 text-base font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    onClick={queryResult}
                  >
                    Get Query
                  </button>
                }
                <button
                  type="submit"
                  className="ml-1 rounded-md bg-indigo-600 px-2 py-1.5 text-base font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  onClick={downloadData}
                >
                  Download
                </button>
                <button
                  type="submit"
                  className="ml-1 rounded-md bg-slate-600 px-2 py-1.5 text-base font-semibold text-white shadow-sm"
                  onClick={() => setShowQuery(false)}
                >
                  Cancel
                </button>
              </div>
              <div className={queryData.utility != null ? "block mt-4" : "hidden"}>
                <p>Utility value: {queryData.utility}</p>
                <table className="border border-collapse border-slate-500">
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
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
