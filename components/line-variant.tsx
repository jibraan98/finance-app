import { format } from "date-fns";

import {
    Tooltip,
    XAxis,
    ResponsiveContainer,
    LineChart,
    Line,
    CartesianGrid
} from "recharts";

import { CustomTooltip } from "./custom-tooltip";

type Props = {
    data: {
        date: string;
        income: number;
        expenses: number;
    }[];
};

export const LineVariant = ({ data }: Props) => {
    return (
        <ResponsiveContainer width={"100%"} height={350}>
            <LineChart data={data}>
                <CartesianGrid strokeDasharray="3 3"/>
                <XAxis 
                axisLine={false} 
                tickLine={false} 
                dataKey="date" 
                tickFormatter={(value) => {
                    try {
                        const date = new Date(value); // Parse the date string
                        return format(date, "dd MMM"); // Format it
                    } catch (e) {
                        console.error("Invalid date value:", value, e);
                        return ""; // Fallback for invalid dates
                    }
                }}
                style={{ fontSize: "12px"}} tickMargin={16}
                />
                <Tooltip content={<CustomTooltip />}/>
                <Line 
                    dot={false}
                    dataKey={"income"}
                    stroke="#3d82f6"
                    strokeWidth={2}
                    className="drop-shadow-sm"
                />
                <Line 
                    dot={false}
                    dataKey={"expenses"}
                    stroke="#f43f5e"
                    strokeWidth={2}
                    className="drop-shadow-sm"
                />
            </LineChart>
        </ResponsiveContainer>
    )
}