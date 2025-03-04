import { createSystem, defaultBaseConfig, defineConfig } from "@chakra-ui/react";

export const green = '#C8FA17'

// cant figure out the themconfig right  now
const themeConfig = defineConfig({
  theme: {
    colors: {
      brand: {
        50: '#f7fafc',
        100: '#edf2f7',
        200: '#e2e8f0',
        300: '#cbd5e0',
        400: '#a0aec0',
        500: '#718096',
        600: '#4a5568',
        700: '#2d3748',
        800: '#1a202c',
        900: '#171923',
     },
      primary: {
        50: '#ffe5e5',
        100: '#ffb8b8',
        200: '#ff8a8a',
        300: '#ff5c5c',
        400: '#ff2e2e',
        500: '#e60000', // Primary red for motorsport theme
        600: '#b30000',
        700: '#800000',
        800: '#4d0000',
        900: '#1a0000',
      },
      secondary: {
        50: '#e6e6e6',
        100: '#cccccc',
        200: '#b3b3b3',
        300: '#999999',
        400: '#808080',
        500: '#666666',
        600: '#4d4d4d',
        700: '#333333', // Dark gray for secondary elements
        800: '#1a1a1a',
        900: '#000000',
    },
  },
    fonts: {
      heading: 'DM Sans, system-ui, sans-serif',
      body: 'DM Sans, system-ui, sans-serif',
    },
    components: {
    Button: {
      baseStyle: {
        fontWeight: 'bold',
        borderRadius: 'md',
      },
      variants: {
        primary: {
          bg: 'primary.500',
          color: 'white',
          _hover: {
            bg: 'primary.600',
          },
        },
        secondary: {
          bg: 'secondary.700',
          color: 'white',
          _hover: {
            bg: 'secondary.800',
          },
        },
      },
    },
    },
}})

export const system = createSystem(defaultBaseConfig, themeConfig)