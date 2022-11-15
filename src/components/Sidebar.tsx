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
      <Link className='p-2 hover:bg-slate-100' to={url} onClick={() => {setSideBarVisible(false)}}>
        <h2>
          {text}
        </h2>
      </Link>
    )
  }

  const visibleClass = sideBarVisible ? "translate-x-0" : "-translate-x-64";

  return (
    <div id="sidebar">
      {/* overlay */}
      {sideBarVisible && 
        <div className={`absolute bg-slate-800 opacity-25 w-full h-full z-20`} onClick={() => {setSideBarVisible(false)}}/>
      }
      {/* sidebar */}
      <aside className={`bg-slate-500 fixed h-full z-30 transform ease-in-out transition-all duration-500 ${visibleClass}`}>
          <div className='flex flex-col text-center'>
            <SideBarItem text={"Home"} url="/"/>
            <SideBarItem text={"About"} url="/about"/>
            <SideBarItem text={"Study"} url="/study"/>
            <SideBarItem text={"Quiz"} url="/quiz"/>
            <SideBarItem text={"Tournaments"} url="/tournaments"/>

          </div>
      </aside>   
    </div>
  );
}

export default Sidebar;
