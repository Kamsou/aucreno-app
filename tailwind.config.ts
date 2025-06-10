import type { Config } from 'tailwindcss'

export default {
  darkMode: 'class',
  content: [
    './components/**/*.{js,vue,ts}',
    './app.vue',
  ],
   theme: {
    extend: {
      fontFamily: {
        custom: ['Inter'],
      },
    },
  },
} satisfies Config
