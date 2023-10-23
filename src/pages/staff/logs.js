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
  getKeyValue,
} from "@nextui-org/react";
import moment from 'moment';

import "react-datetime/css/react-datetime.css";
import Datetime from 'react-datetime';

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
      'An unsuccessful attempt were made after a successful login from a different IP address.'
    ],
    'description': "This log aims to identify two situations. The first situation is a bruteforcing attack where an attacker repeatedly attempts to log into a user's account. The other situation is a replay attack where an attacker attempts to log into a user's account relatively immediately after the legitimately login."
  },

  "access_control_logs": {
    'header': 'The Access Control Logs records all unauthorised attempts to access an API. Logs are marked with higher severity if:',
    'list': [
      'Multiple attempts were made by the same user.',
      'Multiple attempts were made by the same IP address.'
    ],
    'description': 'This log aims to identify the situation where an unauthorised user attempts to bypass both the frontend and access control by directly accessing APIs that they are not authorised to.'
  },

  "conflict_interest_logs": {
    'header': 'The Conflict of Interest Logs records all approval of customer tickets. Logs are marked with higher severity if for each ticket:',
    'list': [
      'The usernames of the customer and staff are the same.',
      'The IP addresses of the customer and staff are the same.'
    ],
    'description': 'This log aims to identify the misuse of a staff account by a staff who also owns a customer account. Specifically, it identifies the situation where a staff self-approves a ticket that they opened as a customer.'
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
  { key: "severity", label: "Severity"},
  { key: "login_type", label: "Type" },
  { key: "username", label: "User" },
  { key: "timestamp", label: "Timestamp" },
  { key: "is_success", label: "Success" },
  { key: "count", label: "Count" },
  { key: "ip", label: "IP Address" },
];

const accessColumns = [
  { key: "severity", label: "Severity"},
  { key: "user", label: "User" },
  { key: "user_permission_type", label: "User type" },
  { key: "api_permission_type", label: "API type" },
  { key: "api_view_name", label: "View" },
  { key: "user_violation_count", label: "User violation" },
  { key: "ip", label: "IP Address" },
  { key: "ip_violation_count", label: "IP violation" },
  { key: "timestamp", label: "Date" },
];

const conflictColumns = [
  { key: "severity", label: "Severity" },
  { key: "ticket_id", label: "Ticket" },
  { key: "customer_username", label: "Customer Username" },
  { key: "customer_ip", label: "IP" },
  { key: "staff_username", label: "Staff Username" },
  { key: "staff_ip", label: "IP" },
  { key: "time_to_approve", label: "Time to Approve" },
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
  const renderCell = useCallback((item, columnKey) => {
    const cellValue = item[columnKey];

    if (columnKey == "is_success") {
      return cellValue ? "Yes" : "No"
    } else if (columnKey == "timestamp") {
      return moment(cellValue).format('DD/MM/YYYY HH:mm:ss')
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
          start: moment(startDate).format('YYYY-MM-DDTHH:mm'),
          end: moment(endDate).format('YYYY-MM-DDTHH:mm')
        }
      });
      setData(response.data[logType]);
    } catch (err) {
      console.log(err);
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
                  aria-label="log Type"
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
                  aria-label="severity Type"
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
                <p key={desc}>{index+1}. {desc}</p> 
              ))}
              <p>{helpText.description}</p>
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
                  {(columnKey) => <TableCell>{getKeyValue(renderCell(item, columnKey), columnKey)}</TableCell>}
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </>
  );
}