import * as React from "react";
import StatementChart from "@/components/chart/chart";
import Typography from "@/components/core/typography";
import { userType } from "@/lib/slices/user-slices";
import { useAppStore } from "@/lib/store";

import UserMenu from "@/modules/user/dashboard/menu";
import { format } from "date-fns";

import { GiHarborDock } from "react-icons/gi";
import { AiOutlineLoading } from "react-icons/ai";

export type Day = "mon" | "tue" | "wed" | "thu" | "fri" | "sat" | "sun";

export interface DailyAmount {
  day: Day;
  amount: number;
}

interface userDashboardProps {
  name: string;
  id: string;
}
const UserDashboard = ({ name, id }: userDashboardProps) => {
  const { boats, getUserBoat, profile, getProfile } = useAppStore();
  React.useEffect(() => {
    getUserBoat(id);
    getProfile(id);
  }, []);

  const wallet = profile?.data.wallet;
  const boatLength = boats?.length;

  const quickData = [
    {
      title: "Total boats",
      value: boatLength,
      description: "Boats that you own.",
    },
    {
      title: "Wallet Balance",
      value: wallet,
      description: "Lorem ipsum dolor si amet",
    },
  ];
  const today = format(new Date(), "EEEE, dd MMMM yyyy");

  if (!profile || !boats) {
    return (
      <main className="h-screen flex flex-col justify-center items-center">
        <AiOutlineLoading className="animate-spin text-4xl" />
      </main>
    );
  }

  return (
    <main className="h-screen max-sm:h-full">
      <div className="flex justify-between items-center">
        <Typography variant="h3" color="primary" className="mb-5">
          {name}
        </Typography>
        <Typography variant="med">{today}</Typography>
      </div>

      <section className="bg-white px-6 py-3 rounded-md shadow-lg">
        <section className="mt-5">
          <UserMenu />
          <div className="grid grid-cols-2   gap-2">
            {quickData?.map((item, index) => {
              return (
                <div
                  className="mt-3 px-6 py-3 border border-primary w-full rounded-md bg-secondary-200"
                  key={index}
                >
                  <Typography variant="h4" color="primary">
                    {item?.title}
                  </Typography>
                  {index === 1 ? (
                    <Typography variant="h2" className="whitespace-nowrap">
                      {/* @ts-ignore */}
                      {item?.value
                        .toLocaleString("id-ID", {
                          style: "currency",
                          currency: "IDR",
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2,
                        })
                        .replace(/^(\D+)/, "Rp ")}
                    </Typography>
                  ) : (
                    <Typography variant="h2">{item?.value}</Typography>
                  )}

                  <Typography variant="small" className="text-xs">
                    {item?.description}
                  </Typography>
                </div>
              );
            })}
          </div>
        </section>
        <section className="mt-5 flex gap-2 max-sm:flex-col">
          <div className="w-3/5 max-sm:w-full">
            <StatementChart statement={barData as DailyAmount[]} />
          </div>

          <div className="border border-primary rounded-md px-6 py-3 w-full  bg-secondary-200">
            <Typography variant="h4" color="primary">
              Recent Transactions
            </Typography>
            <Typography variant="small" className="text-xs">
              A list of your recent Transactions.
            </Typography>
            <div className="mt-3 overflow-auto ">
              {recentTransaction.slice(0, 4).map((item, index) => {
                return (
                  <div
                    className="flex justify-between items-center py-2"
                    key={index}
                  >
                    <div className="flex gap-2 items-center">
                      <GiHarborDock className="p-1 rounded-full bg-white text-3xl" />
                      <div>
                        <Typography variant="small">{item?.name}</Typography>
                        <Typography variant="small" className="text-xs">
                          {item?.email}
                        </Typography>
                      </div>
                    </div>
                    <div>
                      <Typography variant="med" color="primary">
                        {item?.amount
                          .toLocaleString("id-ID", {
                            style: "currency",
                            currency: "IDR",
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2,
                          })
                          .replace(/^(\D+)/, "Rp ")}
                      </Typography>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      </section>
    </main>
  );
};
const recentTransaction = [
  {
    name: "PT Ruang Cipta",
    email: "ruangcipta@gmail.com",
    amount: 1000000,
  },
  {
    name: "PT Ruang Cipta",
    email: "ruangcipta@gmail.com",
    amount: 1000000,
  },
  {
    name: "PT Ruang Cipta",
    email: "ruangcipta@gmail.com",
    amount: 1000000,
  },
  {
    name: "PT Ruang Cipta",
    email: "ruangcipta@gmail.com",
    amount: 1000000,
  },
  {
    name: "PT Ruang Cipta",
    email: "ruangcipta@gmail.com",
    amount: 1000000,
  },
  {
    name: "PT Ruang Cipta",
    email: "ruangcipta@gmail.com",
    amount: 1000000,
  },
  {
    name: "PT Ruang Cipta",
    email: "ruangcipta@gmail.com",
    amount: 1000000,
  },
];

const barData = [
  {
    day: "Mon",
    amount: 300000,
  },
  {
    day: "Tue",
    amount: 1200000,
  },
  {
    day: "Wed",
    amount: 700000,
  },
  {
    day: "Thu",
    amount: 310000,
  },
  {
    day: "Fri",
    amount: 230000,
  },
  {
    day: "Sat",
    amount: 43000,
  },
  {
    day: "Sun",
    amount: 250000,
  },
];

const quickData = [
  {
    title: "Total boats",
    value: 15,
    description: "Lorem ipsum dolor si amet",
  },
  {
    title: "Wallet Balance",
    value: 13342233,
    description: "Lorem ipsum dolor si amet",
  },
  {
    title: "Incoming Bills",
    value: 13,
    description: "Lorem ipsum dolor si amet",
  },
];

export default UserDashboard;
