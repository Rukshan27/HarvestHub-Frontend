import React, { useEffect, useState } from "react";

import DashboardLayout from "../../../components/DashboardLayout";
import PieChart from "../../../components/PieChart";
import http from "../../../util/HttpHelper";
import BarChart from "../../../components/BarChart";

const Dashboard = () => {
  const [machineList, setMachineList] = useState([]);
  const [fruitList, setFruitList] = useState([]);
  const [vegetableList, setVegetableList] = useState([]);
  const [productList, setProductList] = useState([]);

  const handleFetchVegtableData = async () => {
    try {
      const res = await http.get("dashboard/VEGETABLE");
      setVegetableList(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleFetchFruiteData = async () => {
    try {
      const res = await http.get("dashboard/FRUIT");
      setFruitList(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleFetchMachineData = async () => {
    try {
      const res = await http.get("dashboard/MACHINE");
      setMachineList(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleFetchProductData = async () => {
    try {
      const res = await http.get("dashboard/product");
      setProductList(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    handleFetchVegtableData();
    handleFetchFruiteData();
    handleFetchMachineData();
    handleFetchProductData();
  }, []);

  return (
    <DashboardLayout
      body={
        <div className="px-4 pt-12">
          <div className="">
            <div className="p-4 bg-white border border-gray-200 rounded-lg shadow-sm col-span-2">
              <h3 className="mb-4 text-lg font-semibold text-gray-900">
                Sales by Product
              </h3>
              <BarChart data={productList} />
            </div>
          </div>
          <div className="grid grid-cols-3 gap-3 mt-6">
            <div className="p-4 bg-white border border-gray-200 rounded-lg shadow-sm">
              <h3 className="mb-4 text-lg font-semibold text-gray-900">
                Sales for Machines
              </h3>
              <PieChart data={machineList} />
            </div>
            <div className="p-4 bg-white border border-gray-200 rounded-lg shadow-sm">
              <h3 className="mb-4 text-lg font-semibold text-gray-900">
                Sales for Vegetables
              </h3>
              <PieChart data={vegetableList} />
            </div>
            <div className="p-4 bg-white border border-gray-200 rounded-lg shadow-sm">
              <h3 className="mb-4 text-lg font-semibold text-gray-900">
                Sales for Fruits
              </h3>
              <PieChart data={fruitList} />
            </div>
          </div>
        </div>
      }
    />
  );
};

export default Dashboard;
