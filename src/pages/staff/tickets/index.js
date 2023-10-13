import Navbar_Staff from "@/components/navbar_staff";
import { useState, useEffect, useMemo, useCallback } from "react";
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Pagination } from "@nextui-org/react";

import axiosConfig from "../../../axiosConfig";

const columns = [
  { key: "status", label: "Status" },
  { key: "ticket_type", label: "Type" },
  { key: "created_date", label: "Created Date" },
  { key: "details", label: "View Details" },
];

export default function Tickets() {
  const [page, setPage] = useState(1);
  const [data, setData] = useState([]);

  // Table render settings
  const renderCell = useCallback((item, columnKey) => {
    const cellValue = item[columnKey];

    if (columnKey == "details") {
      return <a href={`/staff/tickets/${item.ticket}`}>View More</a>;
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

  useEffect(() => {
    async function getData() {
      try {
        let response = await axiosConfig.get(`/staff/get_open_tickets`);
        setData(response.data.tickets);
        console.log(response);
      } catch (err) {
        console.log(err);
      }
    }
    getData();
  }, []);

  return (
    <>
      <Navbar_Staff />
      <div className="h-screen bg-gray-200">
        <div className="mx-auto max-w-7xl divide-y-2 divide-slate-400 px-2 py-8 sm:px-6 lg:px-8">
          <div className="py-8">
            <div>
              <h1 className="inline text-3xl">Tickets</h1>
              <Table
                aria-label="Example table with client side pagination"
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
