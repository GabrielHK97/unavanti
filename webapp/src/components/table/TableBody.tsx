interface TableBodyProps {
  data: Array<any>;
}

export default function TableBody({ data }: TableBodyProps) {
  return (
    <div className="h-full bg-gray-700 w-full p-2 space-y-2 overflow-auto">
      {data?.map((info) => {
          return <div className="w-full bg-gray-600 p-2 space-y-2 flex flex-col justify-center items-center rounded-lg">
            <div className="text-white">Nome: {info.name}</div>
            <div className="text-white">Idade: {info.age}</div>
          </div>;
        })}
    </div>
  );
}
