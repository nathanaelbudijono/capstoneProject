import { create } from "zustand";
import { UserState, userSlice } from "./slices/user-slices";
import { UserBoatState, userBoatSlice } from "./slices/user-boat-slices";
import { CompanyState, companySlice } from "./slices/company-slices";
import {
  TransactionState,
  transactionSlice,
} from "./slices/transaction-slices";

type storeState = UserState & UserBoatState & CompanyState & TransactionState;

export const useAppStore = create<storeState>()((...a) => ({
  ...userSlice(...a),
  ...userBoatSlice(...a),
  ...companySlice(...a),
  ...transactionSlice(...a),
}));
