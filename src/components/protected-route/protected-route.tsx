import { Navigate, useLocation } from "react-router-dom";
import { ReactNode } from "react";
import { useAppSelector } from "../../hooks";
import Preload from "../preload/preload";


type ProtectetType = {
   onlyUnAuth?: boolean
   component: ReactNode
}

const Protected = ({ onlyUnAuth = false, component } : ProtectetType) => {
   const isAuthChecked = useAppSelector((state) => state.root.auth.isAuthChecked);
   const user = useAppSelector((state) => state.root.auth.user);
   const location = useLocation();

   if (!isAuthChecked) {
     return <Preload />;
   }
 
   if (!onlyUnAuth && !user) {
    return <Navigate to='/login' state={{from: location.pathname}}/>
   }

   if (onlyUnAuth && user) {
    const { from } = location.state ?? { from: { pathname: "/" } };
    return <Navigate to={from}/>
   }

 
   return component;
 };
 
 export const OnlyAuth = Protected;
 export const OnlyUnAuth = ({ component } : ProtectetType) => (
   <Protected onlyUnAuth={true} component={component} />
 );
 