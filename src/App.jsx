import { useEffect, useState } from "react";
import "./App.css";
import mockData from "./data.json";

function App() {
  const [allData, setAllData] = useState([]);

  const getTableData = async () => {
    const res = await mockData;
    const newRes = [...res];
    const newAllData = newRes.map((item) => ({ ...item, isChecked: false }));
    setAllData(newAllData);
  };

  useEffect(() => {
    getTableData();
  }, []);

  const handleChangChecked = (e, checkedItem) => {
    const { name, checked } = e.target;

    if (name === "check-all") {
      const newDataWhenIsCheckedChange = allData.map((item) => {
        return { ...item, isChecked: checked };
      });
      setAllData(newDataWhenIsCheckedChange);
    }

    if (name !== "check-all") {
      const newDataWhenIsCheckedChange = allData.map((item) => {
        if (checkedItem.id === item.id) {
          return { ...item, isChecked: !item.isChecked };
        } else {
          return { ...item };
        }
      });
      setAllData(newDataWhenIsCheckedChange);
    }
  };

  return (
    <>
      <div>
        <div className="app-content">
          <table className="app-table">
            <tbody>
              <tr>
                <th>
                  <label className="checkbox-container">
                    <input
                      type="checkbox"
                      name="check-all"
                      className="default-input select-all"
                      onChange={(e) => handleChangChecked(e)}
                    />
                    <span className="custom-checkbox"></span>
                    <span className="on-hover-checkbox"></span>
                  </label>
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
                      <label className="checkbox-container">
                        <input
                          type="checkbox"
                          className="default-input"
                          checked={item.isChecked}
                          onChange={(e) => handleChangChecked(e, item)}
                        />
                        <span className="custom-checkbox"></span>
                        <span className="on-hover-checkbox"></span>
                      </label>
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

      <style>
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
            text-align: center;
          }
          .app-table > tbody > tr > th:nth-child(2) {
            width: 10%;
          }
          .app-table > tbody > tr > th:nth-child(3) {
            width: 80%;
          }
          .app-table > tbody > tr > td:nth-child(1) {
            width: 10%;
            text-align: center;
          }
          .app-table > tbody > tr > td:nth-child(2) {
            width: 10%;
          }
          .app-table > tbody > tr > td:nth-child(3) {
            width: 80%;
          }
        
          /* ----- CheckBox ----- */
          .checkbox-container {
            position: relative;
            cursor: pointer;
          }
          
          .default-input {
            position: absolute;
            opacity: 0;
            height: 0;
            width: 0;
            cursor: pointer;
          }
          .custom-checkbox {
            position: absolute;
            margin: -0.75rem 0px 0px -0.5rem;
            height: 1.5rem;
            width: 1.5rem;
            background-color: #ffffff;
            border: 2px solid #c7c7c7;
            border-radius: 5px;
          }
          /* ----- When Hover ----- */
          .on-hover-checkbox {
            position: absolute;
            margin: -1.5rem 0px 0px -1.25rem;
            background-color: #0000001f;
            height: 3rem;
            width: 3rem;
            border-radius: 100%;
            opacity: 0;
            transition: opacity 0.5s;
          }
          .checkbox-container:hover .default-input ~ .on-hover-checkbox {
            opacity: 1;
          }
          .checkbox-container:hover .default-input ~ .custom-checkbox {
            border-color: #000000;
          }
          /* ----- When Checked(BG and CheckMark indicator Style) ----- */
          .checkbox-container .default-input:checked ~ .custom-checkbox {
            background-color: #000000;
            border-color: #000000;
          }
          /* hidden when not checked */
          .custom-checkbox:after {
            content: "";
            position: absolute;
            display: none;
          }
          /* Show the custom-checkbox when checked */
          .checkbox-container .default-input:checked ~ .custom-checkbox:after {
            display: block;
          }
          /* Style the custom-checkbox/indicator */
          .checkbox-container .custom-checkbox:after {
            left: 0.3rem;
            top: 0;
            width: 35%;
            height: 70%;
            border: solid white;
            border-width: 0 3px 3px 0;
            -webkit-transform: rotate(
              45deg
            );
            -ms-transform: rotate(45deg);
            transform: rotate(
              45deg
            );
          }
        `}
      </style>
    </>
  );
}

export default App;
