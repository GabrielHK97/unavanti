import TableHeader from "./TableHeader";
import "../../interfaces/option.interface";
import TableBody from "./TableBody";
import TableFooter from "./TableFooter";
import { Pagination } from "../../classes/pagination.class";

interface TableProps {
  name: string;
  data: any;
  pagination: any;
}

export default function Table({name, data, pagination}: TableProps) {
  const totalItems = data?.data?.data?.totalItems;
  function getPagination(p: Pagination): void {
    pagination(p);
  }
  return (
    <div className="w-full h-full flex flex-col justify-center items-center">
      <TableHeader name={name} />
      <TableBody data={data?.data?.data?.items}/>
      <TableFooter totalItems={totalItems} getPagination={getPagination}/>
    </div>
  );
}
