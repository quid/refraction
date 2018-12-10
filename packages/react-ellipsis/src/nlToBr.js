// @flow
import * as React from 'react';

export default function nlToBr(text: string): Array<string | React.Node> {
  return text.split(/\n()/g).map((str, i) => (str ? str : <br key={i} />));
}
