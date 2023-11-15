import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, Label, ResponsiveContainer } from "recharts";
import styled from "styled-components";

const StyledLineChart = styled(LineChart)`
  /* background-color: #1ea8d6; */
  /* margin: 1rem auto; */
  /* padding: 2rem; */
`;

const DurationChart = ({ data = [] }) => {
  console.log(data);

  return (
    <ResponsiveContainer width="100%" height="75%">
      <StyledLineChart data={data}>
        <CartesianGrid strokeDasharray="4 2" />
        <XAxis dataKey="day" fontSize={12} height={55} minTickGap={10}>
          <Label value="日期" position="insideBottom" offset={10} />
        </XAxis>
        <YAxis
          fontSize={12}
          width={80}
          label={{ value: "當日營收（元)", angle: -90, position: "insideBottomLeft", offset: 10 }}
        />
        <Tooltip />
        {/* <Legend verticalAlign="top" height={40} /> */}
        <Line type="monotone" dataKey="revenue" stroke="#1ea8d6" strokeWidth={2} />
      </StyledLineChart>
    </ResponsiveContainer>
  );
};

export default DurationChart;
