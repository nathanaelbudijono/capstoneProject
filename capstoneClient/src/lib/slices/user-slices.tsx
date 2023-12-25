import { StateCreator } from "zustand";
import axios from "axios";

export interface userType {
  id: string;
  firstsName: string;
  lastName: string;
  role: string;
  email: string;
  iat: number;
}

export interface profileType {
  data: {
    id: string;
    firstName: string;
    wallet: number;
    lastName: string;
    role: string;
    email: string;
    DOB: string;
    phoneNumber: string;
    city: string;
    country: string;
  };
}

export interface allUserType {
  id: string;
  firstName: string;
  lastName: string;
  role: string;
  email: string;
  DOB: string;
  phoneNumber: string;
  city: string;
  country: string;
}

export interface UserState {
  users: userType | null;
  profile: profileType | null;
  allUsers: allUserType | null;
  getUserInfo: () => void;
  getProfile: (id: string) => Promise<void>;
  getAllUser: () => void;
  errorMessage: string;
}

export const userSlice: StateCreator<UserState> = (set, get) => ({
  users: null,
  profile: null,
  allUsers: null,
  getAllUser: async () => {
    try {
      axios.defaults.withCredentials = true;
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_API}/billing/company/getallusers`,
        {
          withCredentials: true,
        }
      );
      set({ allUsers: res.data });
    } catch (err) {
      console.log(err);
    }
  },
  getUserInfo: async () => {
    axios.defaults.withCredentials = true;
    try {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_API}/decoded/getuserinfo`,
        {
          withCredentials: true,
        }
      );
      set({ users: res.data });
    } catch (error: any) {
      set({ errorMessage: error.message });
    }
  },
  getProfile: async (id: string) => {
    axios.defaults.withCredentials = true;
    try {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_API}/user/getuserbyid/${id}`
      );
      set({ profile: res.data });
    } catch (error: any) {
      set({ errorMessage: error.message });
    }
  },
  errorMessage: "",
});
