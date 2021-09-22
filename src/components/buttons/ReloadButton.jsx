import { Button } from 'antd'
import { ReloadOutlined } from '@ant-design/icons'

const ReloadButton = ({ refetch, loading }) => {
  return (
    <Button icon={<ReloadOutlined />} loading={loading} onClick={refetch} />
  )
}

export default ReloadButton
