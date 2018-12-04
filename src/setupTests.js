// @flow

// Allow date mocking
import 'jest-date-mock';

import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16.3';

import { createSerializer as createEmotionSerializer } from 'jest-emotion';
import * as emotion from '@emotion/core';
import { createSerializer as createEnzymeToJsonSerializer } from 'enzyme-to-json';

// Initialize Enzyme to work with React 16
Enzyme.configure({ adapter: new Adapter() });

// Add serializers
expect.addSnapshotSerializer(createEmotionSerializer(emotion));
expect.addSnapshotSerializer(createEnzymeToJsonSerializer({ mode: 'deep' }));
