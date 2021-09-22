import { Select } from 'antd'
import { connect } from 'react-redux'
import { setLocale } from '../redux/global/actions'
import { selectLocale } from '../redux/global/selectors'

const { Option } = Select

const languages = ['es', 'en']

const LanguageSelector = ({ locale, handleSetLocale }) => {
  return (
    <Select value={locale} onChange={handleSetLocale}>
      {languages.map((l) => (
        <Option key={l} value={l}>
          {l}
        </Option>
      ))}
    </Select>
  )
}

const mapStateToProps = (state) => ({
  locale: selectLocale(state),
})

const mapDispatchToProps = (dispatch) => ({
  handleSetLocale: (locale) => dispatch(setLocale(locale)),
})

export default connect(mapStateToProps, mapDispatchToProps)(LanguageSelector)
