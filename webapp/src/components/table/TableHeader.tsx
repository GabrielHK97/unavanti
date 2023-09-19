import "../../interfaces/option.interface";

interface TableHeaderProps {
  name: string;
}

export default function TableHeader({name}: TableHeaderProps) {

  return (
    <div className="bg-gray-800 flex flex-row w-full h-10 justify-center items-center space-x-2 p-2 rounded-t-lg">
      <div className="flex-grow flex flex-row justify-center items-center text-white text-xl">{name}</div>
    </div>
  );
}
