import { useEffect, useState } from "react";
import "./App.css";
import mockData from "./data.json";
import * as FileSaver from "file-saver";
import * as XLSX from "xlsx";

function App() {
  const [allData, setAllData] = useState([]);
  const [isCheckAll, setIsCheckAll] = useState({
    check: false,
    type: "",
  });

  const getTableData = async () => {
    const res = await mockData;
    const newRes = [...res];
    const newAllData = newRes.map((item) => ({ ...item, isChecked: false }));
    setAllData(newAllData.slice(0, 10));
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
      setIsCheckAll((prev) => ({ ...prev, check: checked, type: "all" }));
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

      // Logic CheckBox to work like Google Mail
      let dataCount = 0;
      for (let i = 0; i < newDataWhenIsCheckedChange.length; i += 1) {
        if (newDataWhenIsCheckedChange[i].isChecked === true) {
          dataCount = dataCount + 1;
        }
      }
      if (dataCount === newDataWhenIsCheckedChange.length) {
        setIsCheckAll((prev) => ({ ...prev, check: true, type: "all" }));
      }
      if (dataCount !== newDataWhenIsCheckedChange.length) {
        setIsCheckAll((prev) => ({ ...prev, check: true, type: "single" }));
      }
      if (dataCount === 0) {
        setIsCheckAll((prev) => ({ ...prev, check: false, type: "" }));
      }
    }
  };

  // // ===== export to Excel File =====
  const fileType =
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
  const fileExtension = ".xlsx";

  const exportToCSV = () => {
    const copyAllData = [...allData];
    const exportData = [];
    for (let i = 0; i < copyAllData.length; i += 1) {
      if (copyAllData[i].isChecked === true) {
        const exportItem = {
          id: copyAllData[i].id,
          productName: copyAllData[i].productName,
          productPrice: copyAllData[i].productPrice,
          productImg: copyAllData[i].productImg,
        };
        exportData.push(exportItem);
      }
    }

    const ws = XLSX.utils.json_to_sheet(exportData);
    const wb = { Sheets: { data: ws }, SheetNames: ["data"] };
    const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    const data = new Blob([excelBuffer], { type: fileType });
    const fileName = `excel-${Date.now()}`;
    FileSaver.saveAs(data, fileName + fileExtension);
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
                      className="default-input"
                      checked={isCheckAll.check}
                      onChange={(e) => handleChangChecked(e)}
                    />
                    <span className="custom-checkbox-all"></span>
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
          <div className="app-table-export">
            <button
              type="button"
              className="app-table-export-btn"
              onClick={() => exportToCSV()}
            >
              EXPORT
            </button>
          </div>
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

          .custom-checkbox-all {
            position: absolute;
            margin: -0.75rem 0px 0px -0.5rem;
            height: 1.5rem;
            width: 1.5rem;
            background-color: #ffffff;
            border: 2px solid #c7c7c7;
            border-radius: 5px;
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

          .checkbox-container .default-input:checked ~ .custom-checkbox-all {
            background-color: #000000;
            border-color: #000000;
          }
          .checkbox-container .default-input:checked ~ .custom-checkbox {
            background-color: #000000;
            border-color: #000000;
          }

          /* hidden when not checked */

          .custom-checkbox-all:after {
            content: "";
            position: absolute;
            display: none;
          }
          .custom-checkbox:after {
            content: "";
            position: absolute;
            display: none;
          }

          /* Show the custom-checkbox when checked */

          .checkbox-container .default-input:checked ~ .custom-checkbox-all:after {
            display: block;
          }
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

          ${
            isCheckAll.type === "all"
              ? `.checkbox-container .custom-checkbox-all:after {
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
            }`
              : `.checkbox-container .custom-checkbox-all:after {
              left: 0.51rem;
              top: 0.25rem;
              width: 0;
              height: 50%;
              border: solid white;
              border-width: 0 3px 3px 0;
              -webkit-transform: rotate( 
                90deg
              ); 
              -ms-transform: rotate(90deg);
              transform: rotate( 
                90deg
              );
            }`
          }

          .app-table-export {
            width: max-content;
            margin: auto;
            padding: 1rem;
          }

          .app-table-export-btn {
            padding: 1rem;
          }

        `}
      </style>
    </>
  );
}

export default App;
