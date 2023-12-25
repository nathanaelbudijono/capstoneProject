import { StateCreator } from "zustand";
import axios from "axios";

export type BillingItem = {
  duration: number;
  Layanan: Layanan;
  DataKapal?: DataKapal;
};
export type DataKapal = {
  namaKapal: string;
  jenisKapal: string;
};

export type Layanan = {
  jenisLayanan: string;
  harga: number;
  pelabuhan: string;
  satuanKerja: string;
};

export type TransactionType = {
  id: string;
  status: string;
  totalAmount: number;
  paymentDate: string;
  Billing: BillingItem[];
};
export type transactionbyUserType = {
  status: string;
  totalAmount: number;
  date: string | null;
  namaKapal: string[];
};

export interface paymentType {
  id: string;
  status: string;
  totalAmount: number;
  paymentDate: string;
  billingId: string;
  usersId: string;
}
export interface TransactionState {
  transactions: TransactionType | null;
  transactionbyUserId: transactionbyUserType | null;
  pendingPayments: paymentType | null;
  paidPayments: paymentType | null;
  getPaidPaymentByID: (id: string) => Promise<void>;
  getTransactionByID: (id: string) => Promise<void>;
  getPendingPaymentByID: (id: string) => Promise<void>;
  getTransactionByUserId: (id: string) => Promise<void>;
}

export const transactionSlice: StateCreator<TransactionState> = (set, get) => ({
  transactions: null,
  transactionbyUserId: null,
  pendingPayments: null,
  paidPayments: null,
  getPaidPaymentByID: async (id: string) => {
    try {
      axios.defaults.withCredentials = true;
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_API}/userpayment/getPaidPayment/${id}`,
        {
          withCredentials: true,
        }
      );
      set({ paidPayments: res.data });
    } catch (err) {
      console.log(err);
    }
  },
  getPendingPaymentByID: async (id: string) => {
    try {
      axios.defaults.withCredentials = true;
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_API}/userpayment/getPendingPayment/${id}`,
        {
          withCredentials: true,
        }
      );
      set({ pendingPayments: res.data });
    } catch (err) {
      console.log(err);
    }
  },
  getTransactionByID: async (id: string) => {
    axios.defaults.withCredentials = true;
    try {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_API}/userpayment/getPaymentDetail/${id}`,
        {
          withCredentials: true,
        }
      );
      set({ transactions: res.data });
    } catch (err) {
      console.log(err);
    }
  },
  getTransactionByUserId: async (id: string) => {
    axios.defaults.withCredentials = true;
    try {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_API}/userbilling/getBillsByUser/${id}`,
        {
          withCredentials: true,
        }
      );
      set({ transactionbyUserId: res.data });
    } catch (err) {
      console.log(err);
    }
  },
});
