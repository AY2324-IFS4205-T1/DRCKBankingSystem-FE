import Navbar_Staff from "@/components/navbar_staff";
import { useState, useEffect, useMemo, useCallback } from "react";
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Pagination } from "@nextui-org/react";
import moment from 'moment';
import axiosConfig from "../../../axiosConfig";
import { toast } from "react-toastify";

const columns = [
  { key: "status", label: "Status" },
  { key: "ticket_type", label: "Type" },
  { key: "created_date", label: "Created Date" },
  { key: "details", label: "View Details" },
];

export default function Tickets(props) {
  const [openPage, setOpenPage] = useState(1);
  const [openData, setOpenData] = useState([]);

  const [closedPage, setClosedPage] = useState(1);
  const [closedData, setClosedData] = useState([]);

  // Table render settings
  const renderCell = useCallback((item, columnKey) => {
    const cellValue = item[columnKey];

    if (columnKey == "details") {
      return <a href={`/staff/tickets/${item.ticket}`}>View More</a>;
    } else if (columnKey == "created_date") {
      return moment(cellValue).format('DD/MM/YYYY HH:mm:ss')
    }

    return cellValue;
  }, []);

  // Table pagination settings
  const rowsPerPage = 10;
  const openPages = Math.ceil(openData.length / rowsPerPage);
  const closedPages = Math.ceil(closedData.length / rowsPerPage);

  const openItems = useMemo(() => {
    const start = (openPage - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return openData.slice(start, end);
  }, [openPage, openData]);

  const closedItems = useMemo(() => {
    const start = (closedPage - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return closedData.slice(start, end);
  }, [closedPage, closedData]);

  useEffect(() => {
    async function getData() {
      try {
        let openResponse = await axiosConfig.get(`/staff/get_open_tickets`);
        setOpenData(openResponse.data.tickets);

        let closedResponse = await axiosConfig.get(`/staff/get_closed_tickets`);
        setClosedData(closedResponse.data.tickets);
      } catch (err) {
        toast.error(err.response.data);
      }
    }
    getData();
  }, []);

  return (
    <>
      <Navbar_Staff role={props.role} />
      <div className="min-h-screen bg-gray-200">
        <div className="mx-auto max-w-7xl divide-y-2 divide-slate-400 px-2 py-8 sm:px-6 lg:px-8">
          <div className="py-8">
            <div className="my-2">
              <h1 className="inline text-3xl">Open Tickets</h1>
              <Table
                aria-label="Example table with client side pagination"
                bottomContent={
                  <div className="flex w-full justify-center">
                    <Pagination
                      isCompact
                      showControls
                      showShadow
                      color="blue"
                      page={openPage}
                      total={openPages}
                      onChange={(page) => setOpenPage(page)}
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
                <TableBody items={openItems}>
                  {(item) => (
                    <TableRow key={item.ticket}>
                      {(columnKey) => <TableCell>{renderCell(item, columnKey)}</TableCell>}
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>

            <div className="my-2">
              <h1 className="inline text-3xl">Closed Tickets</h1>
              <Table
                aria-label="Example table with client side pagination"
                bottomContent={
                  <div className="flex w-full justify-center">
                    <Pagination
                      isCompact
                      showControls
                      showShadow
                      color="blue"
                      page={closedPage}
                      total={closedPages}
                      onChange={(page) => setClosedPage(page)}
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
                <TableBody items={closedItems}>
                  {(item) => (
                    <TableRow key={item.ticket}>
                      {(columnKey) => <TableCell>{renderCell(item, columnKey)}</TableCell>}
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
