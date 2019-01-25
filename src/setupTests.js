/**
 * Copyright (c) Quid, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
// @flow

// Allow date mocking
import 'jest-date-mock';

import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import serializer, { matchers } from 'jest-emotion';
import { createSerializer as createEnzymeToJsonSerializer } from 'enzyme-to-json';

// Add the custom matchers provided by 'jest-emotion'
expect.extend(matchers);

// Initialize Enzyme to work with React 16
Enzyme.configure({ adapter: new Adapter() });

// Add serializers
expect.addSnapshotSerializer(serializer);
expect.addSnapshotSerializer(createEnzymeToJsonSerializer({ mode: 'deep' }));
