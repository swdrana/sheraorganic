const purgecss = require("@fullhuman/postcss-purgecss");

module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
    ...(process.env.NODE_ENV === "production"
      ? {
          "@fullhuman/postcss-purgecss": {
            content: [
              "./src/**/*.{js,jsx,ts,tsx}",
              "./public/**/*.html",
            ],
            defaultExtractor: (content) =>
              content.match(/[\w-/:[\].#]+/g) || [],
            safelist: {
              // All Bootstrap dynamic classes (JS-added via data attributes, toggles, etc.)
              standard: [
                "show",
                "active",
                "disabled",
                "fade",
                "in",
                "out",
                "open",
                "close",
                "collapsed",
                "collapsing",
                "is-invalid",
                "is-valid",
                "was-validated",
                "loading",
                "pe-none",
                "pe-auto",
                "d-none",
                "d-block",
                "d-flex",
              ],
              deep: [
                // Bootstrap JS components dynamic classes
                /^offcanvas/,
                /^modal/,
                /^tooltip/,
                /^popover/,
                /^dropdown/,
                /^collapse/,
                // Swiper classes (dynamically added by Swiper JS)
                /^swiper/,
                // Keep preloader if it's dynamic
                /^preloader/,
                // Animation and transition classes
                /^animate/,
                /^transition/,
                /^pulse/,
              ],
              greedy: [/data-/, /^bs-/, /^js-/],
            },
            variables: true,
          },
        }
      : {}),
  },
};
