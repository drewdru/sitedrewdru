import type { BreadcrumbItem, ButtonProps } from '@nuxt/ui'

export interface MenuProps {
  menu: {
    path: string
    label: string
    buttonProps?: ButtonProps
  }[]
}

export interface Room1v1Props {
  initProps: {
    tab?: string
    roomId?: string
  }
}

export interface Room1v1PauseProps {
  exitPath: string
}

export interface GameMenuPage {
  component: Component
  props?: MenuProps | Room1v1Props | Room1v1PauseProps
  breadcrumb: BreadcrumbItem
}
