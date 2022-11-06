import { useContext } from "react";
import { ModalContext } from "../context/ModalContext";

export const useModalContext = () => {
    const context = useContext(ModalContext);

    /**
     * 
     * @param content The JSX content. Using an array will place the content on separate pages, providing next and back buttons. 
     * TODO: This content should be generated statically however.
     * @param maxPages The max pages shown on bottom left of modal
     */
    const openModal = (content:JSX.Element[] | JSX.Element) => {
        context.dispatch({
            type: 'OPEN',
            payload: content,
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