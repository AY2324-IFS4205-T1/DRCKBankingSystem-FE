import Navbar from "@/components/navbar";
import { useState, useEffect, useMemo, useCallback } from "react";
import { useRouter } from "next/router";
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

import axiosConfig from "../../../axiosConfig";

const columns = [
  { key: "transaction", label: "Id" },
  { key: "transaction_type", label: "Type" },
  { key: "sender_id", label: "Sender" },
  { key: "recipient_id", label: "Recipient" },
  { key: "description", label: "Description" },
  { key: "date", label: "Date" },
  { key: "amount", label: "Amount" },
];

export default function AccountId() {
  const router = useRouter();

  const [page, setPage] = useState(1);
  const [acctid, setAccid] = useState(null);
  const [data, setData] = useState([]);

  // Table render settings
  const renderCell = useCallback((item, columnKey) => {
    const cellValue = item[columnKey];

    if (columnKey == "amount") {
      return Number(cellValue).toFixed(2);
    } else if (columnKey == "date") {
      return moment(cellValue).format('DD/MM/YYYY HH:mm:ss');
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

  // Get data when the router is ready to get query param
  useEffect(() => {
    if (!router.isReady) return;

    setAccid(router.query.accountid);
    async function getData() {
      try {
        let response = await axiosConfig.get(`/customer/account/${router.query.accountid}`);
        setData(response.data.transactions);
      } catch (err) {
        console.log(err);
      }
    }
    getData();
  }, [router.isReady]);

  return (
    <>
      <Navbar />
      <div className="h-screen bg-gray-200">
        <div className="mx-auto max-w-7xl divide-y-2 divide-slate-400 px-2 py-8 sm:px-6 lg:px-8">
          <div className="py-8">
            <div>
              <h1 className="inline text-3xl">Transactions for Account {acctid}</h1>
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
                    <TableRow key={item.transaction}>
                      {(columnKey) => <TableCell>{getKeyValue(renderCell(item, columnKey), columnKey)}</TableCell>}
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
