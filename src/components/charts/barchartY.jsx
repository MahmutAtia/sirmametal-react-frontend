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
  export const RenderBarChartY = ({ data, labels, values, w,h }) => (
    <BarChart
    barSize={20}
    barGap={10}
        layout="vertical"
      verticalAlign="top"
      width={w}
      height={h}
      data={data}
      className=" text-sm  text-red-300 "
    >
      {/* <Line type="monotone" dataKey="company_count" stroke="#8884d8" /> */}
      <CartesianGrid  strokeDasharray="3 3" />
      <XAxis type="number"   />
      <YAxis dataKey={labels} type="category" />
      <Tooltip />
      {/* <Legend verticalAlign="top" height={36} /> */}
      
      <Bar
        dataKey={values}
        fill="#8884d8"
        label={{ angle: -90, fontSize: 20, color: "white" }}
      >
         {data?.map((entry, index) => (
        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
      ))}
        </Bar>
     
    </BarChart>
  );
  