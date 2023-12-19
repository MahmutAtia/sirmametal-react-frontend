import { Tooltip } from "@mui/material";
import { Label, Pie, PieChart, Cell } from "recharts";

export function CustomPieChart({data,dataKey,nameKey,w,h,inR,outR}) {
const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

  return (
    <PieChart width={w} height={h} className="text-sm text-bold ">
      <Pie
        data={data}
        dataKey={dataKey}
        nameKey={nameKey}
        cx="50%"
        cy="50%"
        innerRadius={inR}
        outerRadius={outR}
        fill="#8884d8"
        label={(params) => `${params[nameKey]} (${params[dataKey]})`}

      >
        {data?.map((entry, index) => (
          <Cell  key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
        ))}
      </Pie>
    </PieChart>
  );
}