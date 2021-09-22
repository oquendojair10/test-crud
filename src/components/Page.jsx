import { useIntl } from 'react-intl'

import api from '../api'
import { useGet, useMutation } from '../utils/functions/hooks'

import HomeForm from './forms/HomeForm'
import { Space, Table, Button } from 'antd'
import { useState } from 'react'

function Page() {
  const { formatMessage } = useIntl()
  const { data, loading, refetch } = useGet(api.todo.loadAll, {})
  const [toggle, setToggle] = useState(false)
  const [selectedData, setSelectedData] = useState(null)
  const onCompleted = ({ data }) => {
    setTimeout(() => {
      setSelectedData(null)
      refetch(data)
    }, 1500);
  }
  
  const [submit] = useMutation(api.todo.delete, {
    onCompleted
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
      title: 'User ID',
      dataIndex: 'userId',
      key: 'userId',
    },
    {
      title: 'Titulo',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: 'Descripción',
      dataIndex: 'body',
      key: 'body',
    }, {
      title: 'Acciones',
      key: 'action',
      render: (text, record) => (
        <Space size="middle">
          <Button size="small" onClick={() => onEdit(record._id)}>{formatMessage({ id: 'edit' })}</Button>
          <Button size="small" danger onClick={() => onDelete(record._id)}>{formatMessage({ id: 'delete' })}</Button>
        </Space>
      )
    }
  ];
  if (loading) return 'Loding...' 
  return (
    <div>
      {!toggle ?
        <>
          <Button 
            type="primary"
            onClick={() => setToggle(!toggle)}
            className="ml-auto"
          >
            {formatMessage({ id: 'new' })}
          </Button>
          <Table dataSource={data} columns={columns} />
        </>
      :
        <HomeForm 
          refetch={refetch} 
          defaultValue={data.find(item => item._id === selectedData)}
          handleCancel={() => {
            setToggle(false)
            setSelectedData(null)
          }} 
        />
      }
    </div>
  )
}

export default Page