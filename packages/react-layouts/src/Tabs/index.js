/**
 * Copyright (c) Quid, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
// @flow
import * as React from 'react';
import styled from '@emotion/styled/macro';
import css from '@emotion/css/macro';
import {
  Tabs as RTPTabs,
  TabList as RTPTabList,
  TabPanel as RTPTabPanel,
} from '@quid/react-tabs-provider';
import TabPanel from './TabPanel';
import Tab from './Tab';

export type Props = {
  children?: React.Node,
  id: string,
  onChange: string => void,
  activeTab?: string,
  sideTabsContent?: React.Node,
  className?: string,
};

const TabList = styled.ul`
  display: flex;
  flex-shrink: 0;
  padding: 0;
  margin: 0;
  ${props =>
    css`
      border-bottom: 1px solid ${props.theme.primaryInverse};
    `};
`;

const TabPanels = styled.div`
  display: flex;
  position: relative;
  transition: height 0.2s ease-in-out;
  flex: 1;
  overflow: auto;
`;

// There's something wrong with Enzyme + jest-emotion that prevents us to use
// React.Fragment as child of the Popper component in this instance
// This is a dirty workaround
// istanbul ignore next
const DevFragment =
  process.env.NODE_ENV === 'test' ? 'x-fragment' : React.Fragment;

const Tabs = styled(
  ({ id, children, activeTab, sideTabsContent, onChange, ...props }: Props) => (
    <div {...props}>
      <RTPTabs active={activeTab} onSelect={e => onChange(e)}>
        {({ active }) => (
          <DevFragment>
            <RTPTabList>
              {({ select, active }) => (
                <TabList role="tablist">
                  {React.Children.map(children, (child, index) => {
                    const isActive = child.props.name === activeTab;
                    return (
                      <Tab
                        key={index}
                        id={`${id}_tab_${index}`}
                        isActive={isActive}
                        onClick={() => select(child.props.name)}
                      >
                        {child.props.label}
                      </Tab>
                    );
                  })}
                  {sideTabsContent}
                </TabList>
              )}
            </RTPTabList>
            <TabPanels>
              {React.Children.map(children, (child, index) => {
                return (
                  <RTPTabPanel name={child.props.name}>
                    {({ label }) => {
                      return React.cloneElement(child, {
                        id: `${id}_panel_${index}`,
                        key: index,
                      });
                    }}
                  </RTPTabPanel>
                );
              })}
            </TabPanels>
          </DevFragment>
        )}
      </RTPTabs>
    </div>
  )
)`
  display: flex;
  flex-direction: column;
`;

Tabs.TabPanel = TabPanel;
Tabs.Tab = Tab;

export default Tabs;
