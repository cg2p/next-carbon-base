import React from 'react';
import PublicHeader from '../PublicHeader';
import { Content, Theme } from '@carbon/react';

const Layout = props => (
  <div>
    <Theme theme="g100">
    <PublicHeader />
    </Theme>
    <Content>
    {props.children}
    </Content>
  </div>
);

export default Layout;
