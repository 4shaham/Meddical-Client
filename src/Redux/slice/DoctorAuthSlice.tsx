import { createSlice } from "@reduxjs/toolkit";

interface DoctorAuth {
  doctor: {
    id:string;
    name: string;
    email: string;
    image: string;
  } | null;
  isAuthenticated: boolean;
}

const initialState: DoctorAuth = {
  doctor:localStorage.getItem("doctor")?JSON.parse(localStorage.getItem('doctor') as string) : null,
  isAuthenticated:false,
};

const DoctorSlice = createSlice({
  initialState,
  name: "doctor",
  reducers: {
    login: (state,action) => {
      (state.doctor = action.payload), (state.isAuthenticated = true);

      localStorage.setItem("doctor", JSON.stringify(action.payload));
      // localStorage.setItem("isAuthenticated", "true");
    },
    logout: (state) => {
      state.doctor = null;
      state.isAuthenticated = false;

      localStorage.removeItem("doctor");
      // localStorage.removeItem("isAuthenticated");
    },
    updateProfle:(state,action)=>{
      (state.doctor = action.payload), (state.isAuthenticated = true);
      localStorage.setItem("doctor",JSON.stringify(action.payload));
    },
    setIsAuthenticated:(state)=>{
       state.isAuthenticated=true
    }
  },
});

export const { login, logout,setIsAuthenticated,updateProfle} = DoctorSlice.actions;
export default DoctorSlice.reducer;
