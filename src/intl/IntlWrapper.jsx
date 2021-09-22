import moment from 'moment'
import 'moment/locale/es'
import { selectLocale } from '../redux/global/selectors'

import enLanguage from './languages/en.json'
import esLanguage from './languages/es.json'

import { ConfigProvider } from 'antd'
import enLocale from 'antd/lib/locale/en_US'
import esLocale from 'antd/lib/locale/es_ES'
import { useIntl, IntlProvider } from 'react-intl'
import { useEffect } from 'react'
import { connect } from 'react-redux'

const supportedLocales = {
  en: enLocale,
  es: esLocale,
}

const messages = {
  en: enLanguage,
  es: esLanguage,
}

const AntdProvider = ({ children, locale }) => {
  const { formatMessage } = useIntl()

  const validateMessages = {
    // eslint-disable-next-line
    required: formatMessage({ id: 'requiredField' }, { fieldName: '${label}' }),
    types: {
      // eslint-disable-next-line
      email: formatMessage({ id: 'formatEmail' }, { fieldName: '${label}' }),
    },
  }

  return (
    <ConfigProvider
      locale={supportedLocales[locale]}
      form={{ validateMessages }}
    >
      {children}
    </ConfigProvider>
  )
}

const IntlWrapper = ({ locale, children }) => {
  useEffect(() => {
    if (locale) {
      moment.locale(locale)
    }
  }, [locale])

  return (
    <IntlProvider locale={locale} messages={messages[locale]}>
      <AntdProvider locale={locale} children={children} />
    </IntlProvider>
  )
}

const mapStateToProps = (state) => ({
  locale: selectLocale(state),
})

const mapDispatchToProps = (dispatch) => ({})

export default connect(mapStateToProps, mapDispatchToProps)(IntlWrapper)
