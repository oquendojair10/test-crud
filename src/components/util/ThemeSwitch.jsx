import { Switch } from 'antd'
import { useThemeSwitcher } from 'react-css-theme-switcher'
import { MoonIcon, SunIcon } from '../../assets/icons'

const ThemeSwitch = () => {
  const { switcher, themes, currentTheme } = useThemeSwitcher()

  const isDarkMode = currentTheme !== 'light'

  const toogleTheme = () => {
    switcher({ theme: isDarkMode ? themes.light : themes.dark })
  }

  return (
    <Switch
      onChange={toogleTheme}
      checked={isDarkMode}
      checkedChildren={<MoonIcon />}
      unCheckedChildren={<SunIcon />}
    />
  )
}

export default ThemeSwitch
