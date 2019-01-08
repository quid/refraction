// @flow
import createCache from '@emotion/cache';
import focusVisiblePlugin from '@quid/stylis-plugin-focus-visible';
export default createCache({ stylisPlugins: [focusVisiblePlugin] });
