import Navbar_Staff from "@/components/navbar_staff";
import axiosConfig from "../../axiosConfig";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { HttpStatusCode } from "axios";

export default function Anonymization(props) {
  useEffect(() => {
    async function getInitial() {
      // Get both graph and current k-value
      await renderGraph();

      try {
        let response = await axiosConfig.get("/staff/anon/k_val");
        setKValue(response.data.k_value);
      } catch (err) {
        if (err.response.status === HttpStatusCode.BadRequest) {
          toast.warning(err.response.data);
        } else {
          toast.error(err.response.data);
        }
      }
    }
    getInitial();
  }, []);

  const [graphImage, setGraphImage] = useState("");
  const [kValue, setKValue] = useState("");

  const [generateMessage, setGenerateMessage] = useState("Regenerate Data");

  async function regenerateData() {
    try {
      setGenerateMessage("Loading...");
      let response = await axiosConfig.get("/staff/anon/calculate_anon");
      await renderGraph();
      toast.success(response.data.success);
    } catch (err) {
      toast.error(err.response.data);
    } finally {
      setGenerateMessage("Regenerate Data");
    }
  }

  async function renderGraph() {
    try {
      let response = await axiosConfig.get("/staff/anon/view_anon");
      setGraphImage(Buffer.from(response.data, "binary").toString("base64"));
    } catch (err) {
      toast.error(err.response.data);
    }

  }

  async function updateKValue() {
    try {
      let response = await axiosConfig.post("/staff/anon/k_val", { k_value: kValue });
      toast.success(response.data.success);
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
            <h1 className="text-5xl">Anonymization Data</h1>
            <div className={graphImage ? "block my-3" : "hidden"}>
              <img className="inline" src={`data:image/png;base64,${graphImage}`}></img>
            </div>
            <div className="my-3 mt-2">
              <div>
                <h2 className="text-lg font-black">Regenerate Data</h2>
                <p className="text-sm">
                  If it has been a while since the statistics were last updated, click "Regenerate Data" below to derive new statistics. <br />
                  You should do this so that new transaction data will be added into the anonymity dataset and statistics.
                </p>
                <button className="bg-slate-300 hover:bg-slate-400 text-black py-1 px-2 rounded" onClick={regenerateData}
                  disabled={generateMessage === "Loading..."}
                >
                  {generateMessage}
                </button>
              </div>
              <div className="mt-2">
                <h2 className="text-lg font-black">K-Value</h2>
                <p className="text-sm">
                  If you wish to modify this value, set the k-value below.<br/>
                  <p>The current k-value is shown when you load the page.</p>
                </p>
                <input type="text" name="kvalue" id="kvalue" required
                  className="rounded-md border-0 w-10 py-1.5 px-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  onChange={(e) => {
                    setKValue(e.currentTarget.value);
                  }}
                  value={kValue}
                />
                <button className="bg-slate-300 hover:bg-slate-400 text-black py-1 px-2 rounded ml-1.5" onClick={updateKValue}>
                  Update K-Value
                </button>
              </div>
              <div className="mt-2">
                <h2 className="text-lg font-black">Download K-Anonymous Data</h2>
                <p className="text-sm">
                  Anonymised Data based on the current k-value will be downloaded in .csv format.
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
