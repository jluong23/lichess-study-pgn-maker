import {Link} from 'react-router-dom'

interface SidebarProps {
  sideBarVisible: boolean
  setSideBarVisible: (input: boolean) => void
}

interface SideBarItemProps {
  text: string
  url: string
}


const Sidebar = ({sideBarVisible, setSideBarVisible} : SidebarProps ) => {
  const SideBarItem = ({text,url}: SideBarItemProps) => {
    return (
      <Link to={url} onClick={() => {setSideBarVisible(false)}}>
        <h1>{text}</h1>
      </Link>
    )
  }

  const visibleClass = sideBarVisible ? "translate-x-0" : "-translate-x-64";

  return (
    <div>
      {/* overlay */}
      {sideBarVisible && 
        <div className={`absolute bg-slate-800 opacity-25 w-full h-full z-20`} onClick={() => {setSideBarVisible(false)}}/>
      }
      {/* sidebar */}
      <aside className={`bg-slate-500 fixed h-full z-30 p-2 transform ease-in-out transition-all duration-300 ${visibleClass}`}>
          <div className='flex flex-col space-y-1'>
            <SideBarItem text={"Home"} url="/"/>
            <SideBarItem text={"About"} url="/about"/>
          </div>
      </aside>   
    </div>
  );
}

export default Sidebar;
