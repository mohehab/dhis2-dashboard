import { createContext, useState } from "react";

type DashboardType = {
    displayName: string,
    id: string,
    starred: boolean
}[]

type DashboardContextType = {
    dashboards: DashboardType | [],
    setDashboards: React.Dispatch<React.SetStateAction<DashboardType | []>>
    filter: string,
    setFilter: React.Dispatch<React.SetStateAction<string>>
}

type DasboardContextProviderProps = {
    children: React.ReactNode
}

export const DashboardContext = createContext({} as DashboardContextType)

export const DashboardContextProvider = ({ children } : DasboardContextProviderProps) => {
    
    const [dashboards, setDashboards] = useState<DashboardType | []>([])

    const [filter, setFilter] = useState<string>('')
    
    return (
        <DashboardContext.Provider value={{ dashboards, setDashboards, filter, setFilter}}>
            { children }
        </DashboardContext.Provider>
    )
}