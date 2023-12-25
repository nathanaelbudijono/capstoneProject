import { StateCreator } from "zustand";
import axios from "axios";

export interface companyType {
  id: string;
  companyId: string;
  role: string;
  email: string;
  iat: number;
}

export interface serviceType {
  id: string;
  jenisLayanan: string;
  harga: number;
  pelabuhan: string;
  satuanKerja: string;
  createdAt: string;
  companyId: string;
}

export interface companyProfileType {
  id: string;
  wallet: number;
  name: string;
}
export interface CompanyState {
  company: companyType | null;
  companyProfile: companyProfileType | null;
  service: serviceType | null;
  getCompanyInfo: () => void;
  getCompanyService: (id: string) => Promise<void>;
  getCompanyProfile: (id: string) => Promise<void>;
  errorMessage: "";
}

export const companySlice: StateCreator<CompanyState> = (set, get) => ({
  company: null,
  service: null,
  companyProfile: null,
  getCompanyProfile: async (id: string) => {
    axios.defaults.withCredentials = true;
    try {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_API}/company/getcompanybyid/${id}`,
        {
          withCredentials: true,
        }
      );
      set({ companyProfile: res.data });
    } catch (error: any) {
      set({ errorMessage: error.message });
    }
  },
  getCompanyService: async (id: string) => {
    axios.defaults.withCredentials = true;
    try {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_API}/layanan/company/getLayananById/${id}`,
        {
          withCredentials: true,
        }
      );
      set({ service: res.data });
    } catch (error: any) {
      set({ errorMessage: error.message });
    }
  },
  getCompanyInfo: async () => {
    axios.defaults.withCredentials = true;
    try {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_API}/decoded/getcompanyinfo`,
        {
          withCredentials: true,
        }
      );
      set({ company: res.data });
    } catch (error: any) {
      set({ errorMessage: error.message });
    }
  },
  errorMessage: "",
});
