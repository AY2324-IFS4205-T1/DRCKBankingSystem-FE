import Navbar from "@/components/navbar";
import React from "react";
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

let account_no = "12345678-12345678-12345678";
let products = [
  { id: "1", name: "book", price: "$3" },
  { id: "2", name: "apple", price: "$2" },
  { id: "3", name: "orange", price: "$1" },
  { id: "4", name: "book", price: "$3" },
  { id: "5", name: "apple", price: "$2" },
  { id: "6", name: "orange", price: "$1" },
];
const columns = ["Product ID", "Product Name", "Product Price"];

export default function AccountId() {
  const [page, setPage] = React.useState(1);
  const rowsPerPage = 2;

  const pages = Math.ceil(products.length / rowsPerPage);

  const items = React.useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return products.slice(start, end);
  }, [page, products]);

  return (
    <>
      <Navbar />
      <div className="bg-gray-200 h-screen">
        <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8 py-8 divide-y-2 divide-slate-400">
          <div className="py-8">
            <div>
              <h1 className="inline text-3xl">Account {account_no} transactions </h1>
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
                <TableHeader>
                  <TableColumn key="id">ID</TableColumn>
                  <TableColumn key="name">NAME</TableColumn>
                  <TableColumn key="price">PRICE</TableColumn>
                </TableHeader>
                <TableBody items={items}>
                  {(item) => (
                    <TableRow key={item.name}>{(columnKey) => <TableCell>{getKeyValue(item, columnKey)}</TableCell>}</TableRow>
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
