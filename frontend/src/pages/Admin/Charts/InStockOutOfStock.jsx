import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";


ChartJS.register(ArcElement, Tooltip, Legend);

const InStockOutOfStockChart = ({pieData}) => {
  const data = {
    labels: ["InStock", "OutOfStock"],
    datasets: [
      {
        data: pieData,
        backgroundColor: ["rgb(0, 128, 0,0.5)", "rgba(255, 0, 0,0.5)"],
        borderWidth: 1,
      },
    ],
  };

  return <Pie data={data} />;
};

export default InStockOutOfStockChart;
