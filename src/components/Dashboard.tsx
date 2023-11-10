import {
    Box, Text,
    AccordionButton,
    AccordionPanel,
    AccordionIcon,
    useAccordionItemState
  } from "@chakra-ui/react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { DashboardContext } from "../contexts/dashboardContext"
import { faMap, faChartLine, faFont } from '@fortawesome/free-solid-svg-icons'
import { faStar } from '@fortawesome/free-regular-svg-icons'
import { useState, useEffect, useContext } from "react"

type dashboardType = {
    displayName: string,
    id: string,
    starred: boolean
}

type dashboardItemsType = {
    users: [],
    shape?: 'DOUBLE_WIDTH' | 'NORMAL',
    x?: number,
    y?: number,
    type: 'VISUALIZATION' | 'MESSAGES' | 'MAP' | 'TEXT',
    id: string,
    reports: [],
    resources: [],
    h?: number,
    w?: number,
    messages?: boolean,
    visualization?: visualizationType,
    map?: mapType,
    text?: string
}

type visualizationType = mapType & {
    type: 'COLUMN' | 'PIVOT_TABLE' | 'YEAR_OVER_YEAR_LINE' | 'LINE' | 'PIE' | 'STACKED_COLUMN' | 'GAUGE',
}

type mapType = {
    id: string,
    name: string
}

export const Dashboard = (props: { data: dashboardType }) => {

    const { isOpen } = useAccordionItemState()

    const dashboardContext = useContext(DashboardContext)

    const [dashboard, setDashboard] = useState<dashboardItemsType[] | []>([])
    const [starred, setStarred] = useState<boolean>(props.data.starred)
    const [filteredItems, setItems] = useState<dashboardItemsType[] | []>([])

    const fetchDashboard = async () => {
        const response = await fetch(`https://gist.githubusercontent.com/kabaros/da79636249e10a7c991a4638205b1726/raw/fa044f54e7a5493b06bb51da40ecc3a9cb4cd3a5/${props.data.id}.json`)
        const json = await response.json()

      if (response.ok) {
        setDashboard(json.dashboardItems)
        setItems(json.dashboardItems)
      }
    }

    const handleStarClick = () => {
        const dashboards = dashboardContext.dashboards
        const dashboardIndex = dashboards.findIndex(dashboard => dashboard.id === props.data.id)
        dashboards[dashboardIndex].starred = !starred
        dashboardContext.setDashboards(dashboards)
        setStarred(!starred)
        localStorage.setItem('Dashboards', JSON.stringify(dashboardContext.dashboards));
    }

    const handleFilter = () => {
        if (isOpen && dashboardContext.filter.length > 0) {
            const filterDashboard = dashboard.filter(item => item.type === dashboardContext.filter)
            setItems(filterDashboard)
        } else {
            setItems(dashboard)
        }
    }

    useEffect(() => {
        if (isOpen && dashboard.length < 1) {
            fetchDashboard()
        } else {
            handleFilter() 
        }
    }, [isOpen])

    useEffect(() => {
        handleFilter()
    }, [dashboardContext.filter])

    return(
        <>
            <h2>
                <AccordionButton bg='#fff' borderRadius='8px' fontWeight='bold' mt='8px' textAlign='left'>
                    <Box as="span" flex='1'>
                        {props.data.displayName}
                    </Box>
                    <FontAwesomeIcon onClick={() => handleStarClick()} icon={faStar} color={starred ? '#f8ed62' : ''} />
                    <AccordionIcon />
                </AccordionButton>
            </h2>
            <AccordionPanel bg='#fff' borderBottomRadius='8px' px='35px'>
                { filteredItems.length > 0 ? filteredItems.map( (item, index) => {
                    if (item.type === 'VISUALIZATION') {
                        return <Text pb='10px' mb='10px' borderBottom='1px solid #EDF2F7' fontSize="md" key={item.visualization?.id + '_' + index}><FontAwesomeIcon icon={faChartLine} /> {item.visualization?.name}</Text>
                    }
                    if (item.type === 'MAP') {
                        return <Text pb='10px' mb='10px' borderBottom='1px solid #EDF2F7' fontSize="md" key={item.map?.id + '_' + index}><FontAwesomeIcon icon={faMap} /> {item.map?.name}</Text>
                    }
                    if (item.type === 'TEXT') {
                        return <Text pb='10px' mb='10px' borderBottom='1px solid #EDF2F7' fontSize="md" key={item.id}><FontAwesomeIcon icon={faFont} /> {item.text}</Text>
                    }
                    return null
                }) : <Text pb='10px' mb='10px' fontSize="md">No Data Found</Text> 
                }
            </AccordionPanel>
        </>
    )
}