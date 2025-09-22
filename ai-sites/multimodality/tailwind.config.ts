
    import type { Config } from 'tailwindcss';
    
      import { nextui } from '@nextui-org/react';
      

    export default {
      content: [
        './src/**/*.{js,jsx,ts,tsx}', // single component styles
        
          './node_modules/@nextui-org/theme/dist/components/**/*.js',
          
      ],
      darkMode: 'class',
      plugins: [
        nextui()
      ],
    } satisfies Config;
  