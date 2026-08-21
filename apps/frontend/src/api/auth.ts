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
        const res=await axios.post<ApiResponse>(import.meta.env.VITE_BACKEND_URL+"/register",payload);
        if(res.data.success){
            console.log("User registered successfully",res.data);
        }else{
            console.error("Registration failed",res.data.message,res.data.errors);
        }

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