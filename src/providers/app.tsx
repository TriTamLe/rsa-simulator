import type { ReactNode } from 'react'

import { QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { ConfigProvider, Spin, theme as antTheme } from 'antd'
import { Suspense } from 'react'
import { BrowserRouter } from 'react-router-dom'

import token from '@/config/ant.theme.token'
import { queryClient } from '@/lib/react-query'

type AppProviderProps = {
  children: ReactNode
}

const Loading = () => (
  <div className='flex h-screen w-screen items-center justify-center'>
    <Spin />
  </div>
)

export const AppProvider = ({ children }: AppProviderProps) => {
  return (
    <ConfigProvider
      componentSize='middle'
      theme={{ token: token, algorithm: antTheme.defaultAlgorithm }}>
      <Suspense fallback={<Loading />}>
        <QueryClientProvider client={queryClient}>
          <BrowserRouter>{children}</BrowserRouter>
          <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
      </Suspense>
    </ConfigProvider>
  )
}
