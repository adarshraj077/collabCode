// src/hooks/useAuth.js

export const useAuth = () => {
  // Replace this with your actual auth logic (e.g., checking localStorage or global state)
  const token=localStorage.getItem("token")
  if(!token){
     return { isAuthenticated: false };
  }

  try{ 
   const payload = JSON.parse(atob(token.split(".")[1].replace(/-/g, "+").replace(/_/g, "/")));

   if(payload.exp && payload.exp * 1000 < Date.now()){
     localStorage.removeItem("token"); 
     return { isAuthenticated: false };
   }

   return { isAuthenticated: true };
  }catch(err){
       localStorage.removeItem("token"); 
         return { isAuthenticated: false };
  } 

};
