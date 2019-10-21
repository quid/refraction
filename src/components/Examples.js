/**
 * Copyright (c) Quid, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
// @noflow
import * as React from 'react';
import Playground from 'react-styleguidist/lib/client/rsg-components/Playground';
import Markdown from 'react-styleguidist/lib/client/rsg-components/Markdown';
import ExamplesRenderer from 'react-styleguidist/lib/client/rsg-components/Examples/ExamplesRenderer';

const cleanContent = content =>
  content
    .replace(/<!-- NPM_ONLY> -->[^]*?<!-- <NPM_ONLY -->/g, '')
    .replace(/<!--[^]*?-->/gm, '');

export default function Examples(
  { examples, name, exampleMode },
  { codeRevision }
) {
  return (
    <ExamplesRenderer name={name}>
      {examples.map((example, index) => {
        switch (example.type) {
          case 'code':
            return (
              <Playground
                code={example.content}
                evalInContext={example.evalInContext}
                key={`${codeRevision}/${index}`}
                name={name}
                index={index}
                settings={example.settings}
                exampleMode={exampleMode}
              />
            );
          case 'markdown':
            return (
              <Markdown text={cleanContent(example.content)} key={index} />
            );
          default:
            return null;
        }
      })}
    </ExamplesRenderer>
  );
}
