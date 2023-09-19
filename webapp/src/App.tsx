import axios from "axios";
import { useEffect, useState } from "react";
import { Pagination } from "./classes/pagination.class";
import Table from "./components/table/Table";
import "./index.css";

function App() {
  const [alphaData, setAlphaData] = useState({});
  let [alphaPagination, setAlphaPagination] = useState(new Pagination());

  async function getAlphaData(): Promise<void> {
    axios.defaults.baseURL = "http://localhost:8888";
    setAlphaData(
      await axios
        .get(
          `/info?skip=${alphaPagination.getSkip()}&take=${alphaPagination.getTake()}`
        )

        .catch(() => {
          return {};
        })
    );
  }

  function getAlphaPagination(p: Pagination): void {
    setAlphaPagination(p);
  }

  const [betaData, setBetaData] = useState({});
  let [betaPaginaton, setBetaPagination] = useState(new Pagination());

  async function getBetaData(): Promise<void> {
    axios.defaults.baseURL = "http://localhost:8889";
    setBetaData(
      await axios
        .get(
          `/info?skip=${betaPaginaton.getSkip()}&take=${betaPaginaton.getTake()}`
        )
        .catch(() => {
          return {};
        })
    );
  }

  function getBetaPagination(p: Pagination): void {
    setBetaPagination(p);
  }

  async function getData() {
    await getAlphaData();
    await getBetaData();
  }

  useEffect(() => {
    getData();
  }, [alphaPagination,betaPaginaton]);

  return (
    <div className="w-screen h-screen bg-gray-600 flex flex-col md:flex-row justify-center items-center md:space-x-2 space-y-2 p-2">
      <div className="w-full md:w-1/2 flex flex-col justify-center items-center h-full">
        <Table
          name={"Alpha"}
          data={alphaData}
          pagination={getAlphaPagination}
        />
      </div>
      <div className="w-full md:w-1/2 flex flex-col justify-center items-center h-full">
        <Table name={"Beta"} data={betaData} pagination={getBetaPagination} />
      </div>
    </div>
  );
}

export default App;
