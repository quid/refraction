// @flow
import * as React from 'react';
import { render } from 'react-dom';
import { Button } from '@quid/react-core';
import { Tabs, TabList, TabPanel } from '.';
import { Context } from './Tabs';

// TODO: switch to Enzyme once they decide to publish the version with
// createContext support...

it('renders an active TabPanel', () => {
  const wrapper = document.createElement('x-wrapper');
  render(
    <Context.Provider
      value={{ active: 'foo', select: jest.fn(), register: jest.fn() }}
    >
      <TabPanel name="foo">{() => 'foobar'}</TabPanel>
    </Context.Provider>,
    wrapper
  );
  expect(wrapper).toMatchSnapshot();
});

it('renders an inactive TabPanel', () => {
  const wrapper = document.createElement('x-wrapper');
  render(
    <Context.Provider
      value={{ active: 'bar', select: jest.fn(), register: jest.fn() }}
    >
      <TabPanel name="foo">{() => 'foobar'}</TabPanel>
    </Context.Provider>,
    wrapper
  );
  expect(wrapper).toMatchSnapshot();
});

it('renders a TabList with interactable properties', () => {
  const select = jest.fn();
  const register = jest.fn();
  const wrapper = document.createElement('x-wrapper');
  const btn = (
    <button type="button" onClick={() => select('foo')} active="active" />
  );
  render(
    <Context.Provider value={{ active: 'foo', select, register }}>
      <TabList>{({ active, select }) => btn}</TabList>
    </Context.Provider>,
    wrapper
  );
  expect(wrapper).toMatchSnapshot();
  expect(register).not.toBeCalled();

  btn.props.onClick();
  expect(select).toBeCalledWith('foo');
});

it('renders a Tab component that provides the expected context', () => {
  const spySelect = jest.fn((select, name) => select(name));
  let btn = {};
  const wrapper = document.createElement('x-wrapper');
  const tabListFn = jest.fn(({ active, select }) => {
    btn = <button type="button" onClick={() => spySelect(select, 'bar')} />;
    return (
      <React.Fragment>
        <button type="button" onClick={() => select('foo')} active="active" />
        {btn}
      </React.Fragment>
    );
  });

  render(
    <Tabs>
      {() => (
        <div>
          <TabList>{tabListFn}</TabList>
          <TabPanel name="foo">{() => 'foo'}</TabPanel>
          <TabPanel name="bar">{() => 'bar'}</TabPanel>
        </div>
      )}
    </Tabs>,
    wrapper
  );

  btn.props.onClick();

  // click on second button
  expect(spySelect.mock.calls.length).toBe(1);
  expect(spySelect.mock.calls[0][1]).toBe('bar');
});

it('renders an active TabPanel in controlled mode', () => {
  const wrapper = document.createElement('x-wrapper');
  render(
    <Tabs active="foo" onSelect={jest.fn()}>
      {() => (
        <div>
          <TabList>
            {({ select, active }) => (
              <Button
                onClick={() => select && select('a')}
                importance={active === 'a' ? 'primary' : 'secondary'}
              >
                Tab A
              </Button>
            )}
          </TabList>
          <TabPanel name="foo">{() => 'foobar'}</TabPanel>
        </div>
      )}
    </Tabs>,
    wrapper
  );
});

it('renders a Tab component that provides the expected context', () => {
  const spySelect = jest.fn((select, name) => select(name));
  let btn = {};
  const wrapper = document.createElement('x-wrapper');
  const tabListFn = jest.fn(({ active, select }) => {
    btn = <button type="button" onClick={() => spySelect(select, 'bar')} />;
    return (
      <React.Fragment>
        <button type="button" onClick={() => select('foo')} active="active" />
        {btn}
      </React.Fragment>
    );
  });

  const hanleOnSelect = jest.fn();

  render(
    <Tabs active="foo" onSelect={hanleOnSelect}>
      {() => (
        <div>
          <TabList>{tabListFn}</TabList>
          <TabPanel name="foo">{() => 'foo'}</TabPanel>
          <TabPanel name="bar">{() => 'bar'}</TabPanel>
        </div>
      )}
    </Tabs>,
    wrapper
  );

  btn.props.onClick();

  // click on second button
  expect(spySelect.mock.calls.length).toBe(1);
  expect(spySelect.mock.calls[0][1]).toBe('bar');
  expect(hanleOnSelect).toHaveBeenCalled();
});

it('throws an error if not both the controlled mode props are set', () => {
  const wrapper = document.createElement('x-wrapper');
  const handleError = jest.fn();
  global.console = { error: handleError };
  render(
    <Tabs active={undefined} onSelect={jest.fn()}>
      {() => 'foo'}
    </Tabs>,
    wrapper
  );
  expect(handleError).toHaveBeenCalled();
});
