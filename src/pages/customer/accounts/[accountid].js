import Navbar from "@/components/navbar";
import BootstrapTable from 'inctable-react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';

let account_no = "12345678-12345678-12345678";
let products = [{'id': 'asd', 'name': 'asd', 'price':'asd'},{'id': 'asd', 'name': 'asd', 'price':'asd'},{'id': 'asd', 'name': 'asd', 'price':'asd'}];
const columns = [{
  dataField: 'id',
  text: 'Product ID'
}, {
  dataField: 'name',
  text: 'Product Name'
}, {
  dataField: 'price',
  text: 'Product Price'
}];

export default function AccountId() {
  return (
    <>
      <Navbar />
      <div className="bg-gray-200 h-screen">
        <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8 py-8 divide-y-2 divide-slate-400">
          <div className="py-8">
            <h1 className="text-3xl">Transaction History for {account_no}</h1>
            <BootstrapTable className="mx-auto" keyField='id' data={products} columns={columns} pagination={paginationFactory()} />
          </div>
        </div>
      </div>
    </>
  );
}
