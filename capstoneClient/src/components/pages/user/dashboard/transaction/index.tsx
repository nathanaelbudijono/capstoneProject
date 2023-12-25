import * as React from "react";

import Typography from "@/components/core/typography";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/core/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/core/tabs";
import { useAppStore } from "@/lib/store";
import {
  paymentColumns,
  paymentType,
} from "@/modules/table/transaction-user/pending/column-transaction";
import { DataPendingTransactionTable } from "@/modules/table/transaction-user/pending/transaction-table";

import { AiOutlineLoading } from "react-icons/ai";
import { paymentPaidColumns } from "@/modules/table/transaction-user/paid/column-transaction";
import { DataPaidTransactionTable } from "@/modules/table/transaction-user/paid/transaction-table";

const UserTransaction = ({ id }: { id: string }) => {
  const {
    paidPayments,
    pendingPayments,
    getPendingPaymentByID,
    getPaidPaymentByID,
  } = useAppStore();

  React.useEffect(() => {
    getPendingPaymentByID(id);
    getPaidPaymentByID(id);
  }, []);

  if (!pendingPayments) {
    return (
      <main className="h-screen flex justify-center items-center">
        <AiOutlineLoading className="animate-spin text-4xl" />
      </main>
    );
  }
  return (
    <main className="h-screen">
      <Typography variant="h3" color="primary">
        Incoming Transaction
      </Typography>
      <Typography variant="small" className="mt-2">
        Incoming bills from boat company
      </Typography>
      <section className="mt-3">
        <Tabs defaultValue="Pending" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="Pending">Incoming</TabsTrigger>
            <TabsTrigger value="Paid">Paid</TabsTrigger>
          </TabsList>
          <TabsContent value="Pending">
            <Card>
              <CardHeader>
                <CardTitle>Incoming transaction</CardTitle>
                <CardDescription>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                {/* @ts-ignore */}
                <DataPendingTransactionTable
                  data={pendingPayments as any}
                  columns={paymentColumns}
                />
              </CardContent>
              <CardFooter></CardFooter>
            </Card>
          </TabsContent>
          <TabsContent value="Paid">
            <Card>
              <CardHeader>
                <CardTitle>Paid Transaction</CardTitle>
                <CardDescription>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                {/* @ts-ignore */}
                <DataPaidTransactionTable
                  data={paidPayments as any}
                  columns={paymentPaidColumns}
                />
              </CardContent>
              <CardFooter></CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </section>
    </main>
  );
};

export default UserTransaction;
