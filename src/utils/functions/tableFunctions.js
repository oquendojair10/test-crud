import { useState } from 'react'
import moment from 'moment'
import { Input, Button, Space } from 'antd'
import Highlighter from 'react-highlight-words'
import {
  SearchOutlined,
  CloseOutlined,
  AlignLeftOutlined,
} from '@ant-design/icons'

/*
    ...useColumnSearch('clients', 0, 'name'),
 */
export const useColumnSearch = (dataIndex, child, child2) => {
  const [searchText, setSearchText] = useState('')
  let searchInput

  const handleSearch = (selectedKeys, confirm) => {
    confirm()
    setSearchText(selectedKeys[0])
  }

  const handleReset = (clearFilters) => {
    clearFilters()
    setSearchText('')
  }

  return {
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
    }) => (
      <Space className='m-2'>
        <Input
          ref={(node) => (searchInput = node)}
          prefix={<AlignLeftOutlined />}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => handleSearch(selectedKeys, confirm)}
          style={{ width: 150 }}
        />
        <Button
          type='primary'
          onClick={() => handleSearch(selectedKeys, confirm)}
          icon={<SearchOutlined />}
        />
        <Button
          icon={<CloseOutlined />}
          onClick={() => handleReset(clearFilters)}
        />
      </Space>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined
        style={{ color: filtered ? 'var(--primary)' : undefined }}
      />
    ),
    onFilter: (value, record) => {
      let newRecord
      try {
        if (child2) {
          newRecord = record[dataIndex][child][child2]
        } else if (child) {
          newRecord = record[dataIndex][child]
        } else {
          newRecord = record[dataIndex]
        }
        return newRecord.toString().toLowerCase().includes(value.toLowerCase())
      } catch (error) {
        return undefined
      }
    },
    onFilterDropdownVisibleChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.select(), 100)
      }
    },
    render: (obj) => {
      let valHighlight = ''
      if (obj) {
        valHighlight = child2 ? obj[child][child2] : child ? obj[child] : obj
      }

      return (
        <Highlighter
          highlightStyle={{ backgroundColor: 'var(--primary)', padding: 0 }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={valHighlight ? valHighlight.toString() : ''}
        />
      )
    },
  }
}

/*
    {...getTableConfig('permissionId')}
*/
export const getTableConfig = (recordKey) => {
  let rowKey = (record) => record._id
  if (recordKey) {
    rowKey = (record) => record[recordKey]
  }
  const scroll = { x: 'max-content' }
  const pagination = {
    showSizeChanger: false,
  }
  return { scroll, rowKey, pagination }
}

/*
    ...getSorter('date', 'dueDate'),
    sortDirections: ['descend', 'ascend'],
    defaultSortOrder: 'descend',
*/
export const getSorter = (type, key, key2, key3) => {
  let sorter
  switch (type) {
    case 'string':
      sorter = (a, b) => {
        let valA = ''
        let valB = ''
        if (key3) {
          valA = a[key][key2][key3]
          valB = b[key][key2][key3]
        } else if (key2) {
          valA = a[key][key2]
          valB = b[key][key2]
        } else {
          valA = a[key]
          valB = b[key]
        }

        // Set undefined to a blank string
        if (valA === undefined) {
          valA = ''
        }
        if (valB === undefined) {
          valB = ''
        }
        // Compare
        if (valA > valB) {
          return 1
        }
        if (valA < valB) {
          return -1
        }
        return 0
      }
      break
    case 'number':
      sorter = (a, b) => {
        if (isNaN(a[key]) || isNaN(b[key])) {
          if (a[key] > b[key]) {
            return 1
          }
          if (a[key] < b[key]) {
            return -1
          }
          return 0
        }
        return a[key] - b[key]
      }
      break
    case 'date':
      sorter = (a, b) => {
        if (a[key] === '') {
          return -1
        }
        if (b[key] === '') {
          return 1
        }
        return moment(a[key]).diff(b[key])
      }
      // sorter = (a, b) =>
      //   a && a !== '' && b && b !== ''
      //     ? (a, b) => moment(a[key]).diff(b[key])
      //     : 1
      break
    default:
      break
  }
  return {
    sorter,
  }
}

/*
    ...getFilter(['unitStatus'], [
        { text: formatMessage({ id: 'Paid' }), value: 1 },
        { text: formatMessage({ id: 'Not Paid' }), value: 0 },
    ]),
 */
export const getFilter = (keys, filters, defaultFilteredValue) => ({
  filters,
  defaultFilteredValue,
  onFilter: (value, record) => {
    let val = record
    keys.forEach((key) => {
      val = val[key]
    })
    return val === value
  },
})

export const formatPrice = (number) =>
  `$${number}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
