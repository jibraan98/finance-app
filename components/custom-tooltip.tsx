import { format } from "date-fns";

import { formatCurrency } from "@/lib/utils";
import { Separator } from "./ui/separator";

export const CustomTooltip = ({ active, payload }: any) => {
  if (!active) return null;

  const income = payload[0].value;
  const expenses = payload[1].value;

  const dateString = payload[0].payload.date;
  let date: Date | null = null;

  // Parse and validate the date
  try {
    date = new Date(dateString); // Parse the date
    if (isNaN(date.getTime())) {
      date = null; // Invalid date fallback
    }
  } catch (e) {
    console.error("Error parsing date:", dateString, e);
    date = null;
  }

  return (
    <div className="rounded-sm bg-white shadow-sm border overflow-hidden">
      <div className="text-sm p-2 px-3 bg-muted text-muted-foreground">
        {date ? format(date, "MMM dd, yyyy") : "Invalid date"}
      </div>
      <Separator />
      <div className="p-2 px-3 space-y-1">
        <div className="flex items-center justify-between gap-x-4">
          <div className="flex items-center gap-x-2">
            <div className="size-1.5 bg-blue-500 rounded-full" />
            <p className="text-sm text-muted-foreground">Income</p>
          </div>
          <p className="text-sm text-right font-medium">
            {formatCurrency(income)}
          </p>
        </div>
        <div className="flex items-center justify-between gap-x-4">
          <div className="flex items-center gap-x-2">
            <div className="size-1.5 bg-rose-500 rounded-full" />
            <p className="text-sm text-muted-foreground">Expenses</p>
          </div>
          <p className="text-sm text-right font-medium">
            {formatCurrency(expenses * -1)}
          </p>
        </div>
      </div>
    </div>
  );
};
