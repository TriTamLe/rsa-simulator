import type { TabsProps } from 'antd'

import { Tabs } from 'antd'

import { AppProvider } from '@/providers/app'

import { Decrypt, Encrypt, KeyGenerate } from './pages/rsa-simulator/components'

const App = () => {
  const tabs: TabsProps['items'] = [
    {
      key: 'key-generate',
      label: 'Key generator',
      children: <KeyGenerate />,
    },
    {
      key: 'encrypt',
      label: 'Encrypt Data',
      children: <Encrypt />,
    },
    {
      key: 'decrypt',
      label: 'Decrypt Data',
      children: <Decrypt />,
    },
  ]

  return (
    <AppProvider>
      <div className={`mx-20 mt-5 flex flex-col gap-5 items-center`}>
        <div className={`text-rsa-primary-dark typo-display-bold`}>
          RSA Simulator
        </div>

        <div
          className={`w-full p-5 border-neutral-200 border-1 border-solid rounded-lg shadow-md`}>
          <Tabs
            defaultActiveKey='key-generate'
            items={tabs}
            type='card'
            size='middle'
          />
        </div>
      </div>
    </AppProvider>
  )
}

export default App
