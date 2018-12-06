// @flow

/**
 * React implementation of https://github.com/dollarshaveclub/shave
 * It allows to truncate multiple lines of text adding ellipsis at the end
 *
 * TODO: Features and enhancements
 * - Add `maxLines` as alternative to `maxHeight`
 *   we may create an hidden `span` with a single letter inside to compute a line height
 */

import React, { Component, type Node } from 'react';

export function nlToBr(text: string): Array<string | Node> {
  return text.split(/\n()/g).map((str, i) => (str ? str : <br key={i} />));
}

export function isWidthDifferentFn(element: ?HTMLElement, width: number) {
  return !!element && width !== element.clientWidth;
}

type Props = {
  /** The text will be trimmed after exceeding this value */
  maxHeight: number,
  /** The character to add at the end of the trimmed text */
  character: string,
  /** The text to display, use `/n` to render newlines */
  children: string,
  /** Wheter show or not an HTML title/tooltip on hover */
  addTitle: boolean,
  /** The tag this component will render to wrap the text */
  tag: string,
};

type State = {
  previousChildren?: string,
  good: number,
  current: number,
  bad: ?number,
};

export default class Ellipsis extends Component<Props, State> {
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
    current: this.props.children.split(' ').length,
    bad: null,
  };

  element: ?HTMLElement = undefined;
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
    const isWidthDifferent = this.isWidthDifferentFn(element, width);

    if (!!element && isWidthDifferent) {
      this.width = element.clientWidth;
    }

    const isChildrenDifferent = previousChildren !== children;

    // If `children` has been updated, we need to update `trimmedText` in
    //  the internal component state
    // In both cases, we run the updateText loop to properly trim the text
    if (isChildrenDifferent || isWidthDifferent) {
      this.setState(
        {
          previousChildren: this.props.children,
          current: this.props.children.split(' ').length,
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

    if (!element) {
      return;
    }

    const scrollHeight = element.scrollHeight;

    if (scrollHeight > maxHeight) {
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
      if (bad == null || current === good) {
        // We did it!
        return;
      }
      // Too small, so update current to half the distance to the known bad.
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

    const trimmedText = children
      .split(' ')
      .slice(0, current)
      .join(' ');

    // Since we can't support `<br />` inside `children`, we support `\n` and we
    // take care to convert them to `<br />` when we render the text.
    const newlinedText = nlToBr(trimmedText);

    // We don't want to show ellipsis if no text has been trimmed
    const ellipsis = children.length !== trimmedText.length && character;

    return (
      <Tag
        ref={element => (this.element = element)}
        title={addTitle ? children : null}
        {...tagProps}
      >
        {newlinedText}
        {ellipsis}
      </Tag>
    );
  }
}
