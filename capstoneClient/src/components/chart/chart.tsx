import { FC, useMemo } from "react";
import { Bar } from "react-chartjs-2";
import {
  BarElement,
  CategoryScale,
  Chart,
  LinearScale,
  Tooltip,
} from "chart.js";
import Typography from "../core/typography";

// Define the type for DailyAmount
type DailyAmount = {
  day: string;
  amount: number;
};

// Register the required Chart.js components
Chart.register(BarElement, LinearScale, CategoryScale, Tooltip);

type Props = {
  statement: DailyAmount[];
};

const StatementChart: FC<Props> = ({ statement }) => {
  // Returns the total spend for the week
  const spendingTotal = statement.reduce(
    (total, item) => total + item.amount,
    0
  );

  // Returns an array of the chart labels (day)
  const labels = useMemo(() => statement.map((e) => e.day), [statement]);
  // Returns an array of the chart spending amounts (amount)
  const data = useMemo(() => statement.map((e) => e.amount), [statement]);
  // Variables to handle bar colours
  const barColor = "#8b9cb4";
  const barHovered = "#35527d";
  const activeBarHovered = "#35527d";
  const activeBarColor = "#02275d";

  return (
    <section
      aria-label="Statement Chart"
      className="w-full bg-secondary-200 text-typography-800 flex flex-col justify-center rounded-md px-6 py-3 border border-primary"
    >
      <Typography variant="h4" color="primary">
        Overview
      </Typography>
      <div className="w-full mt-14 h-48">
        <Bar
          data={{
            labels,
            datasets: [
              {
                label: "Daily Amount",
                data,
                backgroundColor: labels.map((label, index) => {
                  const today = new Date()
                    .toLocaleString("en-US", { weekday: "short" })
                    .toLowerCase();
                  return label.toLowerCase() === today
                    ? activeBarColor
                    : barColor;
                }),
                borderSkipped: false,
                borderRadius: 5,
                hoverBackgroundColor: labels.map((label, index) => {
                  const today = new Date()
                    .toLocaleString("en-US", { weekday: "short" })
                    .toLowerCase();
                  return label.toLowerCase() === today
                    ? activeBarHovered
                    : barHovered;
                }),
              },
            ],
          }}
          options={{
            plugins: {
              tooltip: {
                enabled: true,
                backgroundColor: "black",
                padding: 10,
                caretSize: 0,
                usePointStyle: true,
                displayColors: false,
                yAlign: "bottom",
                xAlign: "center",
                position: "nearest",
                footerMarginTop: 42,
                callbacks: {
                  label: function (context) {
                    const value = context.parsed.y;
                    return value
                      .toLocaleString("id-ID", {
                        style: "currency",
                        currency: "IDR",
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })
                      .replace(/^(\D+)/, "Rp ");
                  },
                  title: function () {
                    return "";
                  },
                },
              },
            },
            responsive: true,
            maintainAspectRatio: false,
            scales: {
              x: {
                display: true,
                ticks: {
                  color: "slategrey",
                },
                grid: {
                  display: false,
                },
              },
              y: { display: false },
            },
          }}
        />
      </div>
    </section>
  );
};

export default StatementChart;
