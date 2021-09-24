import { useIntl } from 'react-intl'

import api from '../api'
import { useGet, useMutation } from '../utils/functions/hooks'

import HomeForm from './forms/HomeForm'
import { Space, Table, Button } from 'antd'
import { useState } from 'react'

function Page() {
  const { formatMessage } = useIntl()
  const [selectedData, setSelectedData] = useState(null)
  const [toggle, setToggle] = useState(false)
  const { data, loading, refetch } = useGet(api.todo.loadAll, {})
  const { data: dataTypes } = useGet(api.types.loadAll, {})
  const { data: dataUsers } = useGet(api.user.loadAll, {})

  const onCompleted = ({ data }) => {
    setTimeout(() => {
      setSelectedData(null)
      refetch(data)
    }, 1500)
  }

  const [submit] = useMutation(api.todo.delete, {
    onCompleted,
  })

  const onDelete = (id) => {
    submit({ id })
  }
  const onEdit = (id) => {
    setSelectedData(id)
    setToggle(!toggle)
  }
  const columns = [
    {
      title: '#',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: `${formatMessage({ id: 'user' }).toUpperCase()} ID`,
      dataIndex: 'userId',
      key: 'userId',
    },
    {
      title: formatMessage({ id: 'title' }).toUpperCase(),
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: formatMessage({ id: 'body' }).toUpperCase(),
      dataIndex: 'body',
      key: 'body',
    },
    {
      title: formatMessage({ id: 'type' }).toUpperCase(),
      dataIndex: 'type',
      key: 'type',
      render: (record) => dataTypes.find((item) => item._id === record)?.name,
    },
    {
      title: formatMessage({ id: 'actions' }).toUpperCase(),
      key: 'action',
      render: (text, record) => (
        <Space size='middle'>
          <Button size='small' onClick={() => onEdit(record._id)}>
            {formatMessage({ id: 'edit' })}
          </Button>
          <Button size='small' danger onClick={() => onDelete(record._id)}>
            {formatMessage({ id: 'delete' })}
          </Button>
        </Space>
      ),
    },
  ]
  if (loading) return 'Loding...'
  return (
    <div>
      {!toggle ? (
        <>
          <Button
            type='primary'
            onClick={() => setToggle(!toggle)}
            className='ml-auto'
          >
            {formatMessage({ id: 'new' })}
          </Button>
          <Table rowKey='_id' dataSource={data} columns={columns} />
        </>
      ) : (
        <HomeForm
          refetch={refetch}
          defaultValue={data.find((item) => item._id === selectedData)}
          types={dataTypes}
          users={dataUsers}
          handleCancel={() => {
            setToggle(false)
            setSelectedData(null)
          }}
        />
      )}
    </div>
  )
}

export default Page
