import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {
  createRouter,
  createRoute,
  createRootRoute,
  RouterProvider,
  Outlet,
  redirect,
} from '@tanstack/react-router'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ThemeProvider, CssBaseline, Box } from '@mui/material'
import { theme } from './theme'
import { PokemonPickerScreen } from './screens/PokemonPicker'
import { ResultsScreen } from './screens/Results'
import './index.css'

const queryClient = new QueryClient()

const rootRoute = createRootRoute({
  component: () => (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Box
          sx={{
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            bgcolor: 'background.default',
          }}
        >
          <Outlet />
        </Box>
      </ThemeProvider>
    </QueryClientProvider>
  ),
})

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  beforeLoad: () => {
    throw redirect({ to: '/pokemon/$id', params: { id: '1' } })
  },
})

const pokemonRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/pokemon/$id',
  component: PokemonPickerScreen,
})

const resultsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/results',
  component: ResultsScreen,
})

const routeTree = rootRoute.addChildren([indexRoute, pokemonRoute, resultsRoute])

const router = createRouter({ routeTree })

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
)
