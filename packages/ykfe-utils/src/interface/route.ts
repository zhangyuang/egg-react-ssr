export interface RouteItem {
  path: string,
  exact?: boolean,
  Component: Component
}
interface Component {
  (): React.FunctionComponent
}
