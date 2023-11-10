import {
  ChakraProvider,
  Box,
  Grid,
  theme,
} from "@chakra-ui/react"

import { Header } from './components/Header'
import { Dashboards } from "./components/Dashboards"
import { DashboardContextProvider } from './contexts/dashboardContext'

export const App = () => (
  <ChakraProvider theme={theme}>
    <DashboardContextProvider>
      <Box bg='#EDF2F7' minH="100vh" p={{ xl: '100px 300px', md: '100px', base: '15px'  }} textAlign="center" fontSize="xl">
        <Grid>
          <Header />
          <Dashboards />
        </Grid>
      </Box>
    </DashboardContextProvider>
  </ChakraProvider>
)
