import React from 'react';
interface RouteItem {
    path: string;
    exact?: boolean;
    Component: () => React.FC;
}
declare function NotFound(): JSX.Element;
declare const getComponent: (Routes: RouteItem[], path: string) => (() => React.FC<{}>) | (() => typeof NotFound);
export default getComponent;
