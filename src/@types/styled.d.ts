import 'styled-components'
import theme, { Theme } from 'styles/theme'

declare module 'styled-components' {
  export interface DefaultTheme extends Theme {}
}