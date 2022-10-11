import { createContext, useEffect, useReducer } from 'react'
import {AiFillCloseCircle} from "react-icons/ai"

export const ModalContext = createContext()

export const userReducer = (state, action) => {
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

export const ModalContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(userReducer, { 
    visible: false,
    content: null
  })

  const closeModal = () => {
    dispatch({type: 'CLOSE'});
  }

  const backgroundClicked = (e) => {
    if(e.target.id === "modal-background"){
      closeModal();
    }
  }
  
  return (
    <ModalContext.Provider value={{ ...state, dispatch }}>
      {state.visible && 
        <div onClick={backgroundClicked} id="modal-background" className="fixed inset-0 bg-opacity-30 bg-black backdrop-blur-sm flex justify-center items-center">
          {/* Modal */}
          <div className="bg-white p-1 rounded">
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