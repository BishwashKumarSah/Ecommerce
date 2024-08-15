import React, { useEffect, useState } from "react";
import Cards from "../../../components/Cards/Cards";
import InventoryIcon from "@mui/icons-material/Inventory";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import GroupIcon from "@mui/icons-material/Group";
import LocalMallIcon from "@mui/icons-material/LocalMall";
import "./AdminDashboard.css";
import TotalProfits from "../Charts/TotalProfits";
import { useDispatch, useSelector } from "react-redux";
import { getTotalProfits } from "../../../store/adminSlice";
import { STATUSES } from "../../../store/statusEnums";
import Loader from "../../../utils/Loader/Loader";

const AdminDashboard = () => {
  const [year, setYear] = useState(2024);
  const { profits, errorMessage, status } = useSelector((state) => state.admin);

  const data = new Array(12).fill(0); // Initialize array for 12 months

  profits?.totalProfits?.forEach((p) => {
    data[p.month - 1] = p.totalProfit; // p.month is 1 to 12
  });

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTotalProfits(+year));
  }, [dispatch, year]);

  const handleOnChange = (e) => {
    setYear(Number(e.target.value));
  };

  return (
    <>
      <div className="admin_dashboard">
        <div className="dashboard_cards">
          <Cards
            cardTitle="Total Products"
            data={50}
            extras={12}
            icon={<InventoryIcon />}
          />
          <Cards
            cardTitle="Total Profit"
            data={`$${50}`}
            extras={12}
            icon={<MonetizationOnIcon />}
          />
          <Cards
            cardTitle="Total Orders"
            data={50}
            extras={12}
            icon={<LocalMallIcon />}
          />
          <Cards
            cardTitle="Total Users"
            data={50}
            extras={12}
            icon={<GroupIcon />}
          />
        </div>
        <div className="charts_container">
          {status === STATUSES.LOADING ? (
            <Loader />
          ) : (
            <div className="total_profits_chart">
              <div className="total_profits_heading">
                <h3>Cumulative Profits up to Each Month of {year}</h3>
                <select name="profit" id="year" onChange={handleOnChange} value={year}>
                  <option value="">Year</option>
                  {profits?.year?.map((year, id) => {
                    return (
                      <option value={year} key={year}>
                        {year}
                      </option>
                    );
                  })}
                </select>
              </div>
              <TotalProfits data={data} />
            </div>
          )}
          <div className="inStock_outOfStock_chart">
            
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminDashboard;
