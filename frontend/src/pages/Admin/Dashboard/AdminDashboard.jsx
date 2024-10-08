import React, { useEffect, useState } from "react";
import Cards from "../../../components/Cards/Cards";
import InventoryIcon from "@mui/icons-material/Inventory";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import GroupIcon from "@mui/icons-material/Group";
import LocalMallIcon from "@mui/icons-material/LocalMall";
import "./AdminDashboard.css";
import TotalProfits from "../Charts/TotalProfits";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllProducts,
  getCountryWiseSalesData,
  getTotalProfits,
  getTotalUserCount,
} from "../../../store/adminSlice";
import { STATUSES } from "../../../store/statusEnums";
import Loader from "../../../utils/Loader/Loader";
import InStockOutOfStockChart from "../Charts/InStockOutOfStock";
import toast from "react-hot-toast";
import WorldMapHeatmap from "../Charts/WorldMapSales";
import { Link } from "react-router-dom";
import MetaData from "../../../utils/MetaData";

const AdminDashboard = () => {
  const [year, setYear] = useState(2024);
  const {
    profits,
    errorMessage,
    status,
    totalProfits,
    totalOrders,
    totalUser,
  } = useSelector((state) => state.admin);

  const { countryWiseSalesData: salesMap, status: salesStatus } = useSelector(
    (state) => state.admin
  );

  const { allProducts, status: productStatus } = useSelector(
    (state) => state.admin
  );

  const data = new Array(12).fill(0); // Initialize array for 12 months

  profits?.totalProfits?.forEach((p) => {
    data[p.month - 1] = Number(p.totalProfit).toFixed(3); // p.month is 1 to 12
  });

  const dispatch = useDispatch();

  //pie data
  const pieData = [allProducts.inStock, allProducts.outOfStock];

  //worldMapData
  const worldMapData = [];

  for (const key in salesMap) {
    worldMapData.push({
      country: key,
      totalSales: salesMap[key][0],
      totalProfit: salesMap[key][1],
    });
  }

  useEffect(() => {
    dispatch(getTotalProfits(+year));
    dispatch(getAllProducts());
    dispatch(getCountryWiseSalesData());
    dispatch(getTotalUserCount());
  }, [dispatch, year]);

  useEffect(() => {
    if (status === STATUSES.ERROR) {
      toast.error(errorMessage);
    }
  });

  const handleOnChange = (e) => {
    setYear(Number(e.target.value));
  };

  return (
    <>
      <MetaData title="Admin Dashboard" />
      <div className="admin_dashboard">
        <div className="dashboard_cards">
          <Cards
            cardTitle="Total Profits"
            data={`$${Number(totalProfits).toFixed(3)}`}
            icon={<MonetizationOnIcon />}
          />
          <Link to="/admin/dashboard/allProducts">
            <Cards
              cardTitle="Total Products"
              data={allProducts.totalCount}
              icon={<InventoryIcon />}
            />
          </Link>
          <Link to="/admin/dashboard/orders">
            <Cards
              cardTitle="Total Orders"
              data={totalOrders}
              icon={<LocalMallIcon />}
            />
          </Link>
          <Link to="/admin/dashboard/users">
            <Cards
              cardTitle="Total Users"
              data={totalUser}
              icon={<GroupIcon />}
            />
          </Link>
        </div>
        <div className="charts_container">
          {status === STATUSES.LOADING ? (
            <Loader />
          ) : (
            <div className="total_profits_chart">
              <div className="total_profits_heading">
                <h3>Cumulative Profits up to Each Month of {year}</h3>
                <select
                  name="profit"
                  id="year"
                  onChange={handleOnChange}
                  value={year}
                >
                  <option value="">Year</option>
                  {profits?.year?.map((year) => {
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

          <div className="pie_world_map_container">
            {productStatus === STATUSES.IDLE && (
              <div className="inStock_outOfStock_chart">
                <h3>Product Status</h3>
                <InStockOutOfStockChart
                  pieData={pieData}
                  className="pie_chart"
                />
              </div>
            )}
            {salesStatus === STATUSES.IDLE && (
              <div className="totalCountryWiseSalesData">
                <h3>Sales and Profit Data</h3>
                <WorldMapHeatmap worldMapData={worldMapData} />
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminDashboard;
