import type { RequestToDecrypt } from '../api'

import { Button, Form, Input, message, Spin } from 'antd'
import { useForm } from 'antd/es/form/Form'
import clsx from 'clsx'
import { useState } from 'react'

import { useDataDecryption } from '../api'

export const Decrypt = () => {
  const [form] = useForm()
  const [decryptedData, setDecryptedData] = useState('')

  const mutateDecryption = useDataDecryption()

  const onFinish = async (values: any) => {
    const requestToDecrypt: RequestToDecrypt = {
      email: values.email,
      password: values.password,
      encryptedData: values.encryptedData,
      privateKey: values.privateKey,
    }

    await mutateDecryption
      .mutateAsync(requestToDecrypt)
      .then((data) => {
        message.success('Decrypted Successfully')
        setDecryptedData(data.decryptedData)
      })
      .catch(() => {
        if (mutateDecryption.isError) {
          message.error(mutateDecryption.error.response?.data.message)
        }
      })
  }

  const clearValue = () => {
    form.resetFields()
    setDecryptedData('')
  }

  return (
    <div
      className={clsx(
        'w-full h-fit p-5',
        'flex flex-col gap-5',
        'typo-body-2-semibold'
      )}>
      <div className='w-full h-fit'>
        <Form
          form={form}
          onFinish={onFinish}
          layout='vertical'
          className='flex flex-row gap-7'>
          <div className='flex flex-col gap-2 flex-1'>
            <Form.Item name={'email'} label='Email' required>
              <Input
                type='email'
                size='large'
                disabled={mutateDecryption.isLoading}
              />
            </Form.Item>
            <Form.Item name={'password'} label='Password' required>
              <Input
                type='password'
                size='large'
                disabled={mutateDecryption.isLoading}
              />
            </Form.Item>
            <Form.Item name={'privateKey'} label={'Private Key'} required>
              <Input.TextArea
                autoSize={{
                  minRows: 10,
                  maxRows: 15,
                }}
                className='overflow-auto'
                disabled={mutateDecryption.isLoading}
              />
            </Form.Item>
          </div>
          <div className='flex flex-col gap-2 flex-1 h-fit'>
            <Form.Item
              name={'encryptedData'}
              label={'Data need to be decrypted'}
              required
              className='pr-7'>
              <Input.TextArea
                autoSize={{
                  minRows: 15,
                  maxRows: 20,
                }}
                className='overflow-auto'
                disabled={mutateDecryption.isLoading}
              />
            </Form.Item>
            <Form.Item>
              <Button
                htmlType='submit'
                type='primary'
                className='w-full'
                size='large'
                disabled={mutateDecryption.isLoading}>
                {mutateDecryption.isLoading ? <Spin /> : <>Send</>}
              </Button>
            </Form.Item>
            <Form.Item>
              <Button
                htmlType='button'
                type='default'
                className='w-full'
                size='large'
                disabled={mutateDecryption.isLoading}
                onClick={() => {
                  clearValue()
                }}>
                Clear
              </Button>
            </Form.Item>
          </div>
        </Form>
      </div>
      <div className='w-full flex flex-col gap-5'>
        {'Decrypted Data'}
        <Input.TextArea
          value={decryptedData}
          autoSize={{
            minRows: 10,
          }}
          className='overflow-auto'
          readOnly
        />
      </div>
    </div>
  )
}
