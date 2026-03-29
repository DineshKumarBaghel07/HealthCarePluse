import{useDispatch} from "react-redux";
import {login,register,getMe} from "../service/auth.api.js"
import {setUser,setLoading,setError} from "../auth.slice.js";

export const useAuth = ()  => {
    const dispatch = useDispatch()

    const handleRegsiter = async({username,phone,email,password}) =>{
              try{
                dispatch(setLoading(true))
                const data = await register({username,phone,email,password});
              }catch(error){
                dispatch(setError(error.response?.data?.message || "Regsitration Failed"))
              }finally{
                dispatch(setLoading(false))
              }
    }

    const handleLogin  = async ({username,password}) =>{
        try{
            dispatch(setLoading(true))
            const data = await login({username,password});
            dispatch(setUser(data.user))
        }catch(error){
            dispatch(setError(error.response?.data?.message))
        }finally{
            dispatch(setLoading(false))
        }
    }

    const handleGetMe = async () =>{
        try{
            dispatch(setLoading(true));
            const data = await getMe();
            dispatch(setUser(data.user)) 
        }catch(error){
            dispatch(setError(error.response?.data?.message))
        }
        finally{
            dispatch(setLoading(false))
        }
    }

    return {handleLogin,handleRegsiter,handleGetMe}
} 