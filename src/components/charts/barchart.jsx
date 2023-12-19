import {
  BarChart,
  Legend,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Bar,
  Label,
  Cell,
} from "recharts";
const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];
export const RenderBarChart = ({ data, labels, values, w }) => (
  <BarChart
    verticalAlign="top"
    width={w}
    height={250}
    data={data}
    className="text-sm  text-red-300"
  >
    {/* <Line type="monotone" dataKey="company_count" stroke="#8884d8" /> */}
    <CartesianGrid strokeDasharray="3 3" />
    <XAxis dataKey={labels} label={{ angle: -90 }} />

    <YAxis />
    <Tooltip />
    <Legend verticalAlign="top" height={36} />
    <Bar
      dataKey={values}
      fill="#8884d8"
      label={{ angle: -90, fontSize: 20, color: "black" }}
    >
       {data?.map((entry, index) => (
      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
    ))}
    <Label value={values} offset={0} position="insideBottom" />
      </Bar>
   
  </BarChart>
);
