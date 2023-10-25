import Navbar_Staff from "@/components/navbar_staff";
import axiosConfig from "../../axiosConfig";
import { useState, useMemo, useCallback } from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Pagination,
} from "@nextui-org/react";
import moment from 'moment';

import "react-datetime/css/react-datetime.css";
import Datetime from 'react-datetime';
import { toast } from "react-toastify";

const log_types = [
  { key: "", label: "Please select" },
  { key: "login_logs", label: "Login" },
  { key: "access_control_logs", label: "Access Control" },
  { key: "conflict_interest_logs", label: "Conflict of Interest" },
];

const log_types_description = {
  "": {
    'header': 'Select a type to show the description.',
    'list': [],
    'description': ''
  },

  "login_logs": {
    'header': 'The Login Logs records all login attempts. Logs are marked with higher severity if:',
    'list': [
      'Login attempt was unsuccessful.',
      'Many unsuccessful attempts were executed within a short timeframe (5 minutes).',
    ],
    'description': "This log aims to identify a bruteforcing attack where an attacker repeatedly attempts to log into a user's account.",
    'columnhelper': ""
  },

  "access_control_logs": {
    'header': 'The Access Control Logs records all unauthorised attempts to access an API. Logs are marked with higher severity if:',
    'list': [
      'Multiple attempts were made by the same user.',
      'Multiple attempts were made by the same IP address.'
    ],
    'description': 'This log aims to identify the situation where an unauthorised user attempts to bypass both the frontend and access control by directly accessing APIs that they are not authorised to.',
    'columnhelper': ""
  },

  "conflict_interest_logs": {
    'header': 'The Conflict of Interest Logs records all approval of customer tickets. Logs are marked with higher severity if for each ticket:',
    'list': [
      'The usernames of the customer and staff are the same.',
      'The IP addresses of the customer and staff are the same.'
    ],
    'description': 'This log aims to identify the misuse of a staff account by a staff who also owns a customer account. Specifically, it identifies the situation where a staff self-approves a ticket that they opened as a customer.',
    'columnhelper': "*Minutes to Approve: Number of minutes after the creation of the ticket before it is approved."
  }
}

const log_severity = [
  { key: "", label: "All" },
  { key: "Information", label: "Info" },
  { key: "Low", label: "Low" },
  { key: "Medium", label: "Medium" },
  { key: "High", label: "High" }
]

const loginColumns = [
  { key: "severity", label: "Severity" },
  { key: "login_type", label: "Type" },
  { key: "username", label: <div>Username<br />(User ID if login success)</div> },
  { key: "timestamp", label: "Timestamp" },
  { key: "is_success", label: "Success" },
  { key: "count", label: "Count" },
  { key: "ip", label: "IP Address" },
];

const accessColumns = [
  { key: "severity", label: "Severity" },
  { key: "api_view_name", label: <div>Page Path & Access Type</div> },
  { key: "user_id", label: <div>User ID & Type<br />Violation Count</div> },
  { key: "ip", label: <div>IP Address & Violation Count</div> },
  { key: "timestamp", label: "Date" },
];

const conflictColumns = [
  { key: "severity", label: "Severity" },
  { key: "ticket_id", label: "Ticket" },
  { key: "customer_username", label: <div>Customer Username & ID<br />IP Address</div> },
  { key: "staff_username", label: <div>Staff Username & ID<br />IP Address</div> },
  { key: "time_to_approve", label: "*Minutes to Approve" },
  { key: "timestamp", label: "Date" },
];

export default function Logs(props) {
  const [page, setPage] = useState(1);
  const [columns, setColumns] = useState([{ key: "", label: "" }]);
  const [data, setData] = useState([]);

  const [logType, setLogType] = useState("");
  const [severity, setSeverity] = useState("");
  const [startDate, setStartDate] = useState(moment().subtract(1, 'day').toDate());
  const [endDate, setEndDate] = useState(moment().toDate());
  const [helpText, setHelpText] = useState(log_types_description[""]);

  // Table render settings
  const renderCell = useCallback((item, columnKey, type) => {
    const cellValue = item[columnKey];

    if (columnKey == "timestamp") {
      return moment(cellValue).format('DD/MM/YYYY HH:mm:ss')
    }

    if (type === "login_logs" && columnKey == "username") {
      if (columnKey == "username") {
        return <div>{cellValue}<br />{item["user_id"] && `(${item["user_id"]})`}</div>;
      } else if (columnKey == "is_success") {
        return cellValue ? "Yes" : "No"
      }
    }

    if (type === "access_control_logs") {
      if (columnKey == "api_view_name") {
        return <div>{cellValue}<br />{item["api_permission_type"]}</div>;
      } else if (columnKey == "user_id") {
        return <div>{cellValue}<br />{item["user_permission_type"]}<br />{item["user_violation_count"]}</div>
      } else if (columnKey == "ip") {
        return <div>{cellValue}<br />{item["ip_violation_count"]}</div>;
      }
    }

    if (type === "conflict_interest_logs") {
      if (columnKey == "customer_username") {
        return <div>{cellValue}<br />{item["customer_id"]}<br />{item["customer_ip"]}</div>
      } else if (columnKey == "staff_username") {
        return <div>{cellValue}<br />{item["staff_id"]}<br />{item["staff_ip"]}</div>
      }
    }

    return cellValue;
  }, []);

  // Table pagination settings
  const rowsPerPage = 10;
  const pages = Math.ceil(data.length / rowsPerPage);

  const items = useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return data.slice(start, end);
  }, [page, data]);

  // Update table data when column changes
  async function updateData() {
    if (logType === "") return;
    try {
      let response = await axiosConfig.get(`/staff/logs/${logType}`, {
        params: {
          severity: severity,
          start: moment(startDate).set('second', 0).format('YYYY-MM-DDTHH:mm'),
          end: moment(endDate).set('minute', endDate.getMinutes + 1).set('second', 0).format('YYYY-MM-DDTHH:mm')
        }
      });
      setData(response.data[logType]);
      console.log(response.data);
    } catch (err) {
      toast.error(err.response.data);
    }
  }

  // Update table data when type of log changes
  function updateColumns() {
    if (logType === "login_logs") {
      setColumns(loginColumns);
    } else if (logType === "access_control_logs") {
      setColumns(accessColumns);
    } else if (logType === "conflict_interest_logs") {
      setColumns(conflictColumns);
    } else {
      setColumns([{ key: "", label: "" }]);
    }

    setHelpText(log_types_description[logType]);
  }

  async function filter() {
    updateColumns();
    await updateData();
  }

  return (
    <>
      <Navbar_Staff role={props.role} />
      <div className="min-h-screen bg-gray-200">
        <div className="mx-auto max-w-7xl px-2 py-8 sm:px-6 lg:px-8">
          <div className="py-8">
            <h1 className="text-5xl">View Logs</h1>
            <h2 className="text-xl">Please select the type of logs you wish to view.</h2>
            <div>
              <span className="inline-block">
                <label htmlFor="logType" className="block text-lg font-medium leading-6 text-gray-900">
                  Type
                </label>
                <select
                  name="logType"
                  id="logType"
                  aria-label="logType"
                  className="rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  onChange={(e) => { setLogType(e.target.value) }}
                >
                  {log_types.map((log) => (
                    <option key={log.key} value={log.key}>
                      {log.label}
                    </option>
                  ))}
                </select>
              </span>
              <span className="inline-block ml-2">
                <label htmlFor="severityType" className="block text-lg font-medium leading-6 text-gray-900">
                  Severity
                </label>
                <select
                  name="severityType"
                  id="severityType"
                  aria-label="severityType"
                  className="rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  onChange={(e) => { setSeverity(e.target.value) }}
                >
                  {log_severity.map((log) => (
                    <option key={log.key} value={log.key}>
                      {log.label}
                    </option>
                  ))}
                </select>
              </span>
              <span className="inline-block ml-2">
                <label htmlFor="startDateTimePicker" className="block text-lg font-medium leading-6 text-gray-900">
                  Start Date
                </label>
                <Datetime name="startDateTimePicker" id="startDateTimePicker" className="py-1.25"
                  value={startDate}
                  onChange={setStartDate}
                />
              </span>
              <span className="inline-block ml-2">
                <label htmlFor="endDateTimePicker" className="block text-lg font-medium leading-6 text-gray-900">
                  End Date
                </label>
                <Datetime name="endDateTimePicker" id="endDateTimePicker" className="py-1.25"
                  value={endDate}
                  onChange={setEndDate}
                />
              </span>
              <span className="inline-block float-right">
                <button
                  type="submit"
                  className="rounded-md bg-indigo-600 px-3 py-2 text-base font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  onClick={filter}
                >
                  Filter
                </button>
              </span>
            </div>
            <div>
              <p>{helpText.header}</p>
              {helpText.list.map((desc, index) => (
                <p key={desc}>{index + 1}. {desc}</p>
              ))}
              <p>{helpText.description}</p>
              {
                helpText.columnhelper &&
                <p><br/>{helpText.columnhelper}</p>
              }
            </div>
          </div>
          <Table
            bottomContent={
              <div className="flex w-full justify-center">
                <Pagination
                  isCompact
                  showControls
                  showShadow
                  color="blue"
                  page={page}
                  total={pages}
                  onChange={(page) => setPage(page)}
                />
              </div>
            }
            classNames={{
              wrapper: "min-h-[222px]",
            }}
          >
            <TableHeader columns={columns}>
              {(column) => <TableColumn key={column.key}>{column.label}</TableColumn>}
            </TableHeader>
            <TableBody items={items}>
              {(item) => (
                <TableRow key={item.id}>
                  {(columnKey) => <TableCell>{(renderCell(item, columnKey, logType))}</TableCell>}
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </>
  );
}