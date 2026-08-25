import axios from "axios";
 type ApiResponse<T = null> = {
  success: boolean;
  message: string;
  data?: T;
  errors?: Record<string, string[]> | string;
};

export async function handelRegister(username:string,password:string,email:string){
    try{
        const payload={
            username:username,
            password:password,
            email:email
        }
        const BACKEND_URL = import.meta.env.VITE_BACKEND_URL.replace("localhost", window.location.hostname);
        const res=await axios.post<ApiResponse>(BACKEND_URL+"/auth/register",payload);

        return {
      success: true,
      data: res.data.data,
    };
       

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


export async function handelLogin(email:string,password:string){
  try{
    const payload={
      email:email,
      password:password
    }
    const BACKEND_URL = import.meta.env.VITE_BACKEND_URL.replace("localhost", window.location.hostname);
    const res=await axios.post<ApiResponse<{ token: string }>>(BACKEND_URL+"/auth/login",payload);
    if(res.data.success && res.data.data){
      const token = res.data.data.token;
      localStorage.setItem("token", token);
        console.log("Token saved to localStorage!");
      return {
        success: true,
      }
    }

    return {
        success: false,
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

  }
}