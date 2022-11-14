import { useEffect, createContext, useReducer } from 'react'
import { AiFillCloseCircle } from "react-icons/ai"
import { useLocation } from 'react-router';

export interface ModalContextProps {
  state: ModalProps;
  dispatch: (action: any) => void;
}

export interface ModalProps {
  /** is the modal visible? */
  visible: boolean,
  /** the jsx content to display */
  content: JSX.Element[]
  /** Index of the current page from content */
  currentPage: number,
}

export const ModalContext = createContext<ModalContextProps>({} as ModalContextProps);

export const modalReducer = (state: any, action: any) => {
  // action.payload should contain content or a list of content, ie. a react component
  // if action.payload was a single element, set content as array of length 1
  const contentArray: JSX.Element[] = Array.isArray(action.payload) ? action.payload : [action.payload]
  let modalProps = {} as ModalProps;

  switch (action.type) {
    case 'OPEN':
      modalProps = { visible: true, content: contentArray, currentPage: 0 }
      break;
    case 'BACK_PAGE':
      modalProps = { visible: true, content: contentArray, currentPage: state.currentPage - 1 }
      break;
    case 'NEXT_PAGE':
      modalProps = { visible: true, content: contentArray, currentPage: state.currentPage + 1 }
      break;
    case 'CLOSE':
      modalProps = { visible: false, content: [], currentPage: 0 }
      break;
    default:
      modalProps = state;
  }
  return modalProps;
}

export const ModalContextProvider = ({ children }: any) => {
  const [state, dispatch] = useReducer(modalReducer, {
    visible: false,
    content: [],
    currentPage: 0,
    maxPages: 0,
  } as ModalProps)

  const location = useLocation();
  useEffect(() => {
    // close modal on location change
    closeModal();
  }, [location]
  )


  const closeModal = () => {
    dispatch({ type: 'CLOSE' });
  }
  /**
   * Navigate modal to previous page
   */
  const backPage = () => {
    dispatch({ type: 'BACK_PAGE', payload: state.content })
  }

  /**
   * Navigate modal to next page
   */
  const nextPage = () => {
    dispatch({ type: 'NEXT_PAGE', payload: state.content })
  }

  const onBackgroundClicked = (e: any) => {
    if (e.target.id === "modal-background") {
      closeModal();
    }
  }

  // used for modal with an array of content, shown on bottom. 
  // Counter on bottom left, next,back and close buttons on bottom right
  const stepsBar = (
    <div id='modal-steps-bar' className='flex justify-between'>
      <div id='modal-page-count'>
        {/* currentPage is an index, so add 1 */}
        Step {state.currentPage + 1}/{state.content.length}
      </div>
      <div id='modal-page-buttons'>
        {/* show a back button if not on the first page */}
        {state.currentPage > 0 && <button onClick={backPage} className='pill-button bg-red-400'>Back</button>}
        {/* show a next page button if not on the last page */}
        {state.currentPage < state.content.length - 1 && <button onClick={nextPage} className='pill-button bg-blue-400'>Next</button>}
        {/* show a close button if on last page */}
        {state.currentPage === state.content.length - 1 && <button onClick={closeModal} className='pill-button bg-slate-500'>Close</button>}
      </div>
    </div>
  )

  return (
    <ModalContext.Provider value={{ state, dispatch }}>
      {state.visible &&
        <div onClick={onBackgroundClicked} id="modal-background" className="fixed inset-0 bg-opacity-30 bg-black backdrop-blur-sm flex justify-center items-center">
          {/* Modal */}
          <div className="bg-white p-1 rounded w-max overflow-y-auto max-h-full z-50">
            <AiFillCloseCircle className="right-0 float-right relative cursor-pointer text-lg" onClick={closeModal} />
            <div id='modal-content' className='p-5'>
              {state.content[state.currentPage]}
            </div>
            {state.content.length > 1 && stepsBar}
          </div>
        </div>
      }
      {children}
    </ModalContext.Provider>
  )
}