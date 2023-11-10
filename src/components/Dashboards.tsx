import { Accordion, AccordionItem } from "@chakra-ui/react"
import { useEffect, useContext } from "react"
import { DashboardContext } from "../contexts/dashboardContext"
import { Dashboard } from "./Dashboard"

export const Dashboards = () => {

    const dashboardContext = useContext(DashboardContext)

    useEffect(() => {
        const fetchDashboards = async () => {
            const response = await fetch('https://gist.githubusercontent.com/kabaros/da79636249e10a7c991a4638205b1726/raw/fa044f54e7a5493b06bb51da40ecc3a9cb4cd3a5/dashboards.json')
            const json = await response.json()
    
          if (response.ok) {
            dashboardContext.setDashboards(json.dashboards)
            localStorage.setItem('Dashboards', JSON.stringify(dashboardContext.dashboards));
          }
        }
        const savedDashboards = JSON.parse(localStorage.getItem('Dashboards') || '')
        if (savedDashboards.length > 1 && dashboardContext.dashboards.length < 1) {
          dashboardContext.setDashboards(savedDashboards)
        } else {
          fetchDashboards()
        } 
      }, [])

    return(
        <Accordion allowToggle defaultIndex={0}>
          { dashboardContext.dashboards.map(dashboard => {
            return(
              <AccordionItem key={dashboard.id} textAlign='left' boxShadow='lg'> 
                <Dashboard data={dashboard} />
              </AccordionItem>
            )
          })}
        </Accordion>
    )
}