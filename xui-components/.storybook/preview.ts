import type { Preview } from '@storybook/web-components';
import a11yConfig from './a11yconfig';

const preview: Preview = {
  parameters: {
    a11y: a11yConfig,
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

export default preview;
