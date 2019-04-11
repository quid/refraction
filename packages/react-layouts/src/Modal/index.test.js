/**
 * Copyright (c) Quid, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
// @flow
import * as React from 'react';
import { mount } from 'enzyme';
import Modal from './index';
import Header, { HeaderIcon } from './Header';
import ActionBar from './ActionBar';

describe('Modal', () => {
  it('renders the expected markup', () => {
    const wrapper = mount(
      <Modal contentLabel="Foobar" isOpen>
        <span>Hello, World!</span>
      </Modal>
    );
    expect(wrapper).toMatchSnapshot();
  });

  it('should match props provided to Modal', () => {
    const title = 'Did You Know...?';
    const iconType = 'question';
    const importance = 'info';
    const leftAction = 'leftFoobar';
    const rightAction = 'rightFoobar';
    const wrapper = mount(
      <Modal
        title={title}
        icon={iconType}
        importance={importance}
        renderActionLeft={() => leftAction}
        renderActionRight={() => rightAction}
        isOpen
      >
        <span>Hello, World!</span>
      </Modal>
    );

    const Header = wrapper.find('Header');
    const HeaderTitle = Header.find('HeaderTitle');
    const HeaderIcon = Header.find('HeaderIcon');

    expect(HeaderTitle.text()).toMatch(title);
    expect(HeaderTitle).toMatchSnapshot();

    expect(HeaderIcon.prop('name')).toMatch(iconType);
    expect(HeaderIcon).toMatchSnapshot();

    expect(Header.prop('importance')).toMatch(importance);
    expect(wrapper.find('Left').text()).toMatch(rightAction);
    expect(wrapper.find('Right').text()).toMatch(leftAction);
  });

  it('renders a Modal with form', () => {
    const wrapper = mount(
      <Modal
        title="Did You Know...?"
        icon="question"
        importance="info"
        renderActionLeft={() => 'foobar'}
        renderActionRight={() => 'foobar'}
        isOpen
        isForm
        formPorps={{ onSubmit: jest.fn() }}
      >
        <span>Hello, World!</span>
      </Modal>
    );
    expect(wrapper).toMatchSnapshot();
  });

  it('should submit the form', () => {
    const onSubmitFn = jest.fn();
    const wrapper = mount(
      <Modal
        title="Did You Know...?"
        icon="question"
        importance="info"
        renderActionLeft={actionClassName => [
          <button
            className={actionClassName}
            data-type="submit"
            type="submit"
            importance="primary"
            key="1"
          >
            Submit
          </button>,
        ]}
        renderActionRight={() => 'foobar'}
        isOpen
        isForm={true}
        formProps={{ onSubmit: onSubmitFn }}
      >
        <span>Hello, World!</span>
      </Modal>
    );
    wrapper.find('[data-type="submit"]').simulate('submit');
    expect(onSubmitFn).toHaveBeenCalled();
  });

  it('renders the expected markup', () => {
    const wrapper = mount(
      <Modal
        title="Did You Know...?"
        icon="question"
        importance="info"
        actionLeft={[
          <button key="1">foo</button>,
          <button key="2">foo</button>,
        ]}
        actionRight={<button key="1">foo</button>}
        renderActionLeft={actionClassName => [
          <button key="1" className={actionClassName}>
            foo
          </button>,
          <button key="2" className={actionClassName}>
            foo
          </button>,
        ]}
        renderActionRight={actionClassName => (
          <button key="1" className={actionClassName}>
            foo
          </button>
        )}
        isOpen
      >
        <span>Hello, World!</span>
      </Modal>
    );
    expect(wrapper).toMatchSnapshot();
  });

  it('renders an adaptive height modal', () => {
    const wrapper = mount(
      <Modal ignoreHeightLimits contentLabel="Foobar" isOpen>
        <span>Hello, World!</span>
      </Modal>
    );
    expect(wrapper).toMatchSnapshot();
  });

  it('renders a vertically centered modal', () => {
    const wrapper = mount(
      <Modal
        theme={{ current: 'dark', colors: { black: '#000' } }}
        centerVertically
        contentLabel="Foobar"
        isOpen
        importance={'warning'}
      >
        <span>Hello, World!</span>
      </Modal>
    );
    expect(wrapper).toMatchSnapshot();
  });

  it('renders Header, HeaderIcon, ActionBar with different themes', () => {
    const ActionDarkHeader = mount(
      <Header
        theme={{ current: 'dark', colors: { black: 'black' } }}
        title={'Hello world'}
        icon={<i />}
        importance={'action'}
      />
    );
    expect(ActionDarkHeader).toHaveStyleRule('background-color', 'black');

    const ActionLightHeader = mount(
      <Header
        theme={{ current: 'light', colors: { white: 'white' } }}
        title={'Hello world'}
        icon={<i />}
        importance={'action'}
      />
    );
    expect(ActionLightHeader).toHaveStyleRule('background-color', 'white');

    const WarningDarkHeader = mount(
      <Header
        theme={{ current: 'dark', colors: { black: '#fff' } }}
        title={'Hello world'}
        icon={<i />}
        importance={'warning'}
      />
    );
    expect(WarningDarkHeader).toMatchSnapshot();

    const HeaderDarkIcon = mount(
      <HeaderIcon
        theme={{ current: 'dark', colors: { gray7: 'gray' } }}
        name="test"
      />
    );

    expect(HeaderDarkIcon).toHaveStyleRule('background-color', 'gray');

    const AcitonBarDark = mount(
      <ActionBar
        theme={{ current: 'dark', colors: { gray7: 'gray' } }}
        action={'Hello'}
        renderActionLeft={() => <div />}
        renderActionRight={() => <div />}
      />
    );

    expect(AcitonBarDark).toHaveStyleRule('border-top', '1px solid gray');
  });

  it('throws if title is not a string and alt not provided', () => {
    // $FlowIgnoreMe
    console.error = jest.fn();
    // FIXME intentionally throwing errors in jest + React 16 is janky
    // info: https://github.com/facebook/react/issues/11098
    // more info: https://github.com/facebook/react/issues/11083
    // $FlowFixMe
    Error.prototype.suppressReactErrorLogging = true;
    const Logo = function Welcome() {
      return <div>Logo</div>;
    };
    try {
      expect(() =>
        mount(
          <Modal title={<Logo />} isOpen>
            <span>Hello, World!</span>
          </Modal>
        )
      ).toThrowErrorMatchingSnapshot();
    } finally {
      // $FlowFixMe
      Error.prototype.suppressReactErrorLogging = false;
    }
  });
});
