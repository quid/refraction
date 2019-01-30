/**
 * Copyright (c) Quid, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
// @noflow
import * as React from 'react';
import Slot from 'react-styleguidist/lib/rsg-components/Slot';
import SectionHeadingRenderer from 'react-styleguidist/lib/rsg-components/SectionHeading/SectionHeadingRenderer';
import getUrl from 'react-styleguidist/lib/utils/getUrl';

export default function SectionHeading({
  slotName,
  slotProps,
  children,
  id,
  pagePerSection,
  depth,
  ...rest
}) {
  const href = pagePerSection
    ? getUrl({ slug: id, id: rest.depth !== 1, takeHash: true })
    : getUrl({ slug: id, anchor: true });
  return (
    <SectionHeadingRenderer
      toolbar={<Slot name={slotName} props={slotProps} />}
      id={id}
      href={href}
      depth={depth === 2 ? 1 : depth}
      {...rest}
    >
      {children}
    </SectionHeadingRenderer>
  );
}
