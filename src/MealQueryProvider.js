import { QueryClient, QueryClientProvider } from 'react-query'
import React from 'react'

import fetchMeal from './api/meal'

const queryClient = new QueryClient()

const QueryProvider = ({ children }) => {
  queryClient.prefetchQuery('meals', () => fetchMeal())

  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
}

export default QueryProvider
