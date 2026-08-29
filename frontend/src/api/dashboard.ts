import axios from "axios";
import { BACKEND_URL } from "../config";

 type ApiResponse<T = null> = {
  success: boolean;
  message: string;
  data?: T;
  errors?: Record<string, string[]> | string;
};

async function loadDashboardData() {
  try {

    const token = localStorage.getItem("token");
    const res = await axios.get(`${BACKEND_URL}/users/dashboard`, {
      headers: token ? { Authorization: `Bearer ${token}` } : {},
      withCredentials: true,
    });

        if(res.data.success){
            return {
                success:true,
                data:res.data.data
            }
        }else{
            return {
                success:false,
                message:res.data.message
            }
        }

    }catch(err){

    if (axios.isAxiosError(err)) {
      const serverError = err.response?.data as ApiResponse | undefined;

      if (serverError) {
        
        console.error("Server message:", serverError.message);

        if (serverError.errors) {
          // Zod validation errors (e.g. { email: ["Invalid email"], password: ["Too short"] })
          console.error("Field-specific errors:", serverError.errors);
        }

        return {
          success: false,
          message: serverError.message,
          errors: serverError.errors,
        };
      }

      // Network down, CORS failure, or no server response
      return {
        success: false,
        message: "Unable to connect to the server. Please check your network.",
      };
    }
    // Non-Axios errors (runtime, logic)
    return {
      success: false,
      message: "An unexpected error occurred.",
    };

}}

export default loadDashboardData;

