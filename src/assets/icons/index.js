import Icon from '@ant-design/icons'

import { ReactComponent as Sun } from './sun.svg'
import { ReactComponent as Moon } from './moon.svg'

const createIcon = (iconSvg) => (props) =>
  <Icon component={iconSvg} {...props} />

export const SunIcon = createIcon(Sun)
export const MoonIcon = createIcon(Moon)
