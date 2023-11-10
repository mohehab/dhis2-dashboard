import { Flex, Select, Text } from "@chakra-ui/react"
import { useContext } from "react"
import { DashboardContext } from "../contexts/dashboardContext"

export const Header = () => {

    const dashboardContext = useContext(DashboardContext)

    return ( 
        <Flex borderBottom='1px' alignItems='stretch' pb='10px' flexDirection={{ base: 'column', sm: 'row' }}>
            <Text flex='1' textAlign='left' fontWeight='bold'>Dashboards</Text>
            <Select flex='1' onChange={(e) => dashboardContext.setFilter(e.target.value)}>
                <option value=''>All</option>
                <option value='VISUALIZATION'>Visualization</option>
                <option value='MAP'>Map</option>
                <option value='TEXT'>Text</option>
            </Select>
        </Flex>
    )
}