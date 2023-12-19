import {
  LineChart,
  Legend,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Cell,
  Label,
} from "recharts";

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

export const RenderLineChart = ({ data, labels, values, w }) => (
  <LineChart
    width={730}
    height={250}
    data={data}
    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
    className="text-sm  text-red-300"
  >
    <CartesianGrid strokeDasharray="3 3" />
    <XAxis dataKey={labels} />
    <YAxis />
    <Tooltip />
    <Legend />
    <Line type="monotone" dataKey={values} stroke="#8884d8">
      {data?.map((entry, index) => (
        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
      ))}{" "}
    </Line>
  </LineChart>
);
