import DashboardSidebar from '../components/DashboardSidebar'

export default function Layout({children}){
    return(
        <div className="flex">
            <div className="flex-1 bg-white">{children}</div>
        </div>
    )
}