import { BsDisplay } from 'react-icons/bs';

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
  variants:{
    extends: {
      display: ["focus-group"]
    }
  }
}

