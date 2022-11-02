import { createContext, useReducer } from 'react'
import {AiFillCloseCircle} from "react-icons/ai"

export interface ModalContextProps {
  state: any;
  dispatch: (action: any) => void;
}

export const ModalContext = createContext<ModalContextProps>({} as ModalContextProps);

export const modalReducer = (state:any, action:any) => {
  // action.payload should contain content, ie. a react component to display
  // inside the modal
  switch (action.type) {
    case 'OPEN':
      return { visible: true, content: action.payload}
    case 'CLOSE':
      return { visible: false, content: null }
    default:
      return state
  }
}

export const ModalContextProvider = ({ children }: any) => {
  const [state, dispatch] = useReducer(modalReducer, { 
    visible: false,
    content: null
  })

  const closeModal = () => {
    dispatch({type: 'CLOSE'});
  }

  const onBackgroundClicked = (e:any) => {
    if(e.target.id === "modal-background"){
      closeModal();
    }
  }
  
  return (
    <ModalContext.Provider value={{ ...state, dispatch }}>
      {state.visible && 
        <div onClick={onBackgroundClicked} id="modal-background" className="fixed inset-0 bg-opacity-30 bg-black backdrop-blur-sm flex justify-center items-center">
          {/* Modal */}
          <div className="bg-white p-1 rounded w-max overflow-y-auto max-h-full z-50">
              <AiFillCloseCircle className="right-0 float-right relative cursor-pointer text-lg" onClick={closeModal}/>
              <div className='p-5'>
                {state.content}

              </div>
          </div>
        </div>
      }
      { children }
    </ModalContext.Provider>
  )
}