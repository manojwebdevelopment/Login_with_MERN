import { toast } from "react-toastify";


export function successhandle(msg){

    toast.success(msg, {
        position: 'top-right'
      });
}

export function errorhandle(msg){

    toast.error(msg, {
         position: 'top-right'
      });
}