import type { RequestToEncrypt } from '../api'

import { Button, Form, Input, message, Spin } from 'antd'
import { useForm } from 'antd/es/form/Form'
import TextArea from 'antd/es/input/TextArea'
import clsx from 'clsx'
import { useState } from 'react'

import { useDataEncryption } from '../api'

export const Encrypt = () => {
  const [form] = useForm()
  const [encryptedData, setEncryptedData] = useState('')

  const mutateEncrypt = useDataEncryption()

  const onFinish = async (values: any) => {
    const requestToEncrypt: RequestToEncrypt = {
      dataToEncrypt: values.dataToEncrypt,
      publicKey: values.publicKey,
    }

    await mutateEncrypt
      .mutateAsync(requestToEncrypt)
      .then((data) => {
        message.success('Encrypted successfully')
        setEncryptedData(data.encryptedData)
      })
      .catch(() => {
        if (mutateEncrypt.isError) {
          message.error(mutateEncrypt.error.response?.data.message)
        }
      })
  }

  const clearValue = async () => {
    form.resetFields()
    setEncryptedData('')
  }

  return (
    <div
      className={clsx(
        'w-full h-fit p-5',
        'flex flex-row gap-5',
        'typo-body-2-semibold'
      )}>
      <div
        className={clsx(
          'data-for-encryption',
          'w-[55%]',
          'flex flex-col flex-end'
        )}>
        <Form form={form} layout='vertical' onFinish={onFinish}>
          <Form.Item
            name={'dataToEncrypt'}
            label='Data you want to encrypt'
            required>
            <TextArea
              disabled={mutateEncrypt.isLoading}
              autoSize={{
                minRows: 5,
                maxRows: 7,
              }}
              className='overflow-auto'
            />
          </Form.Item>

          <Form.Item name={'publicKey'} label='The public key' required>
            <TextArea
              disabled={mutateEncrypt.isLoading}
              autoSize={{
                minRows: 5,
                maxRows: 7,
              }}
              className='overflow-auto'
            />
          </Form.Item>
          <Form.Item>
            <Button
              htmlType='submit'
              type='primary'
              className='w-full'
              size='large'
              disabled={mutateEncrypt.isLoading}>
              {mutateEncrypt.isLoading ? <Spin /> : <>Send</>}
            </Button>
          </Form.Item>
        </Form>
      </div>
      <div
        className={clsx(
          'encrypt data',
          'w-45%',
          'flex flex-col gap-5 flex-1 px-10',
          'typo-body-1-medium'
        )}>
        {'Encrypted Data'}
        <Input.TextArea
          value={encryptedData}
          autoSize={{
            minRows: 15,
            maxRows: 20,
          }}
          className='h-full overflow-auto'
          placeholder='Send your data and public key to get the encrypt data'
          readOnly
        />
        <Button
          htmlType='button'
          type='default'
          className='w-full'
          size='large'
          disabled={mutateEncrypt.isLoading}
          onClick={() => {
            clearValue()
          }}>
          Clear
        </Button>
      </div>
    </div>
  )
}
