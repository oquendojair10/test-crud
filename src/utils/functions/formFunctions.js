export const getSelectSearch = () => {
  const optionFilterProp = 'children'
  const filterOption = (input, option) => {
    try {
      return option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
    } catch (error) {
      return undefined
    }
  }
  return {
    showSearch: true,
    filterOption,
    optionFilterProp,
  }
}
