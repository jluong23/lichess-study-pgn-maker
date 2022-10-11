import { useContext } from "react";
import { ModalContext } from "../context/ModalContext";

export const useModalContext = () => {
    const context = useContext(ModalContext);

    const openModal = (content) => {
        context.dispatch({
            type: 'OPEN',
            payload: content
        })
    }

    const closeModal = () => {
        context.dispatch({type: 'CLOSE'});
      }


    if(context){
        return {openModal, closeModal};
    }else{
        throw Error("useModalContext must be used inside a ModalContextProvider.")
    }
}

export default useModalContext;