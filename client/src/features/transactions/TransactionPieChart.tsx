import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js"
import { Pie } from "react-chartjs-2"

ChartJS.register(ArcElement, Tooltip, Legend)

type TransactionPieChartProps = {
  data: ITransaction[]
}

const TransactionPieChart: React.FC<TransactionPieChartProps> = (props) => {
  const { data } = props

  const options = {
    labels: ["Expense", "Income"],
    datasets: [
      {
        label: "Transaction Types",
        data: [
          Math.abs(data
            .filter((t) => t.amount < 0)
            .reduce((total, current) => total + current.amount, 0)),
          data
            .filter((t) => t.amount > 0)
            .reduce((total, current) => total + current.amount, 0),
        ],
        backgroundColor: ["rgba(255, 99, 132, 0.2)", "#d1e7dd"],
        borderColor: ["rgba(255, 99, 132, 1)", "rgba(75, 192, 192, 1)"],
        borderWidth: 1,
      },
    ],
  }
  return <Pie data={options}/>
}

export default TransactionPieChart
