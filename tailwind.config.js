// tailwind.config.js
module.exports = {
  theme: {
    screens: {
      'xs': '325px',   // mobile small
      'sm': '375px',   // mobile medium  ← overrides Tailwind default 640px
      'md': '425px',   // mobile large   ← overrides Tailwind default 768px
      'lg': '768px',   // tablet         ← overrides Tailwind default 1024px
      'xl': '1024px',  // laptop
      '2xl': '1440px', // laptop 1440p
    },
  },
}