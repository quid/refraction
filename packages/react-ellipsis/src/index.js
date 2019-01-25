/**
 * Copyright (c) Quid, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
// @flow

/**
 * React implementation of https://github.com/dollarshaveclub/shave
 * It allows to truncate multiple lines of text adding ellipsis at the end
 *
 * This code is too much DOM dependant to be completely tested on Jest
 * some logic is excluded from the code coverage for this reason.
 *
 * TODO: Features and enhancements
 * - Add `maxLines` as alternative to `maxHeight`
 *   we may create an hidden `span` with a single letter inside to compute a line height
 */

import * as React from 'react';
import nlToBr from './nlToBr';
import isWidthDifferentFn from './isWidthDifferentFn';

type Children = string | null | boolean | void;

function isNotEmptyString(value: Children): boolean %checks {
  return typeof value === 'string' && value.length > 0;
}

type Props = {
  maxHeight: number,
  character: string,
  children: Children,
  addTitle: boolean,
  tag: string,
};

type State = {
  previousChildren?: Children,
  good: number,
  current: number,
  bad: ?number,
};

/** @visibleName Usage example */
export default class Ellipsis extends React.Component<Props, State> {
  props: Props;

  static defaultProps = {
    tag: 'div',
    character: '…',
    children: '',
    addTitle: false,
  };

  isWidthDifferentFn = isWidthDifferentFn;

  state = {
    previousChildren: undefined,
    good: 0,
    current: isNotEmptyString(this.props.children)
      ? this.props.children.split(' ').length
      : 0,
    bad: null,
  };

  element = React.createRef /*:: <HTMLElement> */();
  width: number = 0;

  componentDidMount() {
    // setState in `componentDidMount` is usually bad practice...
    // In this case this is exactly what we want, we cache original text
    // as `trimmedText` and setting the state we trigger a new render
    // making  the `componentDidUpdate` loop we want begin.
    this.setState({
      previousChildren: this.props.children,
    });
  }

  componentDidUpdate() {
    const {
      element,
      width,
      props: { children },
      state: { previousChildren },
    } = this;

    // If the component size changes, we must force a restart of the component
    // to make sure we show all the possible text in the new available area
    const isWidthDifferent = this.isWidthDifferentFn(element.current, width);

    if (element.current && isWidthDifferent) {
      this.width = element.current.clientWidth;
    }

    const isChildrenDifferent = previousChildren !== children;

    // If `children` has been updated, we need to update `trimmedText` in
    //  the internal component state
    // In both cases, we run the updateText loop to properly trim the text
    if (isChildrenDifferent || isWidthDifferent) {
      this.setState(
        {
          previousChildren: this.props.children,
          current: isNotEmptyString(this.props.children)
            ? this.props.children.split(' ').length
            : /* istanbul ignore next */ 0,
          good: 0,
          bad: null,
        },
        this.updateText
      );
    } else {
      requestAnimationFrame(this.updateText);
    }
  }

  updateText = () => {
    const {
      element,
      state: { bad, good, current },
      props: { maxHeight },
    } = this;

    // istanbul ignore next
    if (!element.current) {
      return;
    }

    const scrollHeight = element.current
      ? element.current.scrollHeight
      : /* istanbul ignore next */ 0;

    if (scrollHeight > maxHeight) {
      // istanbul ignore next
      if (bad != null && bad - good === 1) {
        // We have found the good/bad boundary.
        this.setState({ current: good });
      } else {
        // Too big, so update current to half the distance to the known good.
        this.setState({
          current: current - ((current - good) >> 1),
          bad: current,
        });
      }
    } else {
      // istanbul ignore next
      if (bad == null || current === good) {
        // We did it!
        return;
      }
      // Too small, so update current to half the distance to the known bad.
      // istanbul ignore next
      this.setState({
        current: current + ((bad - current) >> 1),
        good: current,
      });
    }
  };

  render() {
    const {
      props: { children, character, tag: Tag, addTitle, ...other },
      state: { current },
    } = this;

    const {
      maxHeight, // eslint-disable-line no-unused-vars
      ...tagProps
    } = other;

    const trimmedText = isNotEmptyString(children)
      ? children
          .split(' ')
          .slice(0, current)
          .join(' ')
      : '';

    // Since we can't support `<br />` inside `children`, we support `\n` and we
    // take care to convert them to `<br />` when we render the text.
    const newlinedText = nlToBr(trimmedText);

    // We don't want to show ellipsis if no text has been trimmed
    const ellipsis =
      children && children.length !== trimmedText.length && character;

    return (
      <Tag ref={this.element} title={addTitle ? children : null} {...tagProps}>
        {newlinedText}
        {ellipsis}
      </Tag>
    );
  }
}
