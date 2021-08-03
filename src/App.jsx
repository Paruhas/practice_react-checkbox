import { useEffect, useState } from "react";
import "./App.css";
import mockData from "./data.json";

function App() {
  const [allData, setAllData] = useState([]);

  const getTableData = async () => {
    const res = await mockData;
    setAllData(res);
  };

  useEffect(() => {
    getTableData();
  }, []);

  return (
    <>
      <div>
        <div className="app-content">
          <table className="app-table">
            <tbody>
              <tr>
                <th>
                  <h3></h3>
                </th>
                <th>
                  <h3>ID</h3>
                </th>
                <th>
                  <h3>Name</h3>
                </th>
              </tr>
              {allData.map((item) => {
                return (
                  <tr key={item.id}>
                    <td>
                      <p>
                        <input type="checkbox" />
                      </p>
                    </td>
                    <td>
                      <p>{item.id}</p>
                    </td>
                    <td>
                      <p>{item.productName}</p>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      <style jsx>
        {`
          .app-content {
            padding-bottom: 3rem;
          }
          .app-table {
            width: 50%;
            border-collapse: collapse;
            margin: auto;
          }
          .app-table > tbody > tr {
            border-bottom: 1px solid black;
            height: 5rem;
          }
          .app-table > tbody > tr > th:nth-child(1) {
            width: 10%;
          }
          .app-table > tbody > tr > th:nth-child(2) {
            width: 10%;
          }
          .app-table > tbody > tr > th:nth-child(3) {
            width: 80%;
          }
          .app-table > tbody > tr > td:nth-child(1) {
            width: 10%;
          }
          .app-table > tbody > tr > td:nth-child(2) {
            width: 10%;
          }
          .app-table > tbody > tr > td:nth-child(3) {
            width: 80%;
          }
        `}
      </style>
    </>
  );
}

export default App;