/**
 * Copyright (c) Quid, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
// @flow
import React from 'react';
import { mount } from 'enzyme';
import Modal from './index';
/* import Logo from '../Logo'; */

describe('Modal', () => {
  it('renders the expected markup', () => {
    const wrapper = mount(
      <Modal contentLabel="Foobar" isOpen>
        <span>Hello, World!</span>
      </Modal>
    );
    expect(wrapper).toMatchSnapshot();
  });

  it('renders the expected markup', () => {
    const wrapper = mount(
      <Modal
        title="Did You Know...?"
        icon="question"
        importance="info"
        renderActionLeft={() => 'foobar'}
        renderActionRight={() => 'foobar'}
        isOpen
      >
        <span>Hello, World!</span>
      </Modal>
    );
    expect(wrapper).toMatchSnapshot();
  });

  it('renders a Modal with formTag', () => {
    const wrapper = mount(
      <Modal
        title="Did You Know...?"
        icon="question"
        importance="info"
        renderActionLeft={() => 'foobar'}
        renderActionRight={() => 'foobar'}
        isOpen
        formTag="form"
        formPorps={{ onSubmit: jest.fn() }}
      >
        <span>Hello, World!</span>
      </Modal>
    );
    expect(wrapper).toMatchSnapshot();
  });

  it('does not create a new styled formTag if formTag prop is unchanged', () => {
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
      <Modal centerVertically contentLabel="Foobar" isOpen>
        <span>Hello, World!</span>
      </Modal>
    );
    expect(wrapper).toMatchSnapshot();
  });

  it('throws if title is not a string and alt not provided', () => {
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
