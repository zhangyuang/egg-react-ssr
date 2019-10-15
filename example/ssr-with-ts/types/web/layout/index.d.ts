import React from 'react';
import '@/assets/common.less';
import './index.less';
interface LayoutProps {
    layoutData?: any;
    children?: React.ReactChildren;
}
declare const Layout: SFC<LayoutProps>;
export default Layout;
