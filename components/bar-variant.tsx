import { format } from "date-fns";

import {
    Tooltip,
    XAxis,
    ResponsiveContainer,
    BarChart,
    Bar,
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

export const BarVariant = ({ data }: Props) => {
    return (
        <ResponsiveContainer width={"100%"} height={350}>
            <BarChart data={data}>
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
                <Bar 
                    dataKey={"income"}
                    fill="#3d82f6"
                    className="drop-shadow-sm"
                />
                <Bar 
                    dataKey={"expenses"}
                    fill="#f43f5e"
                    className="drop-shadow-sm"
                />
            </BarChart>
        </ResponsiveContainer>
    )
}