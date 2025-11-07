/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,ts,jsx,tsx,md,mdx}"],
  theme: {
    extend: {
      colors: {
        // Colores de marca con soporte de alpha (text-oscuro/40, bg-celeste/20, etc.)
        oscuro:   "rgb(var(--rgb-oscuro) / <alpha-value>)",
        celeste:  "rgb(var(--rgb-celeste) / <alpha-value>)",
        amarillo: "rgb(var(--rgb-amarillo) / <alpha-value>)",
        rosa:     "rgb(var(--rgb-rosa) / <alpha-value>)",
        violeta:      "rgb(var(--rgb-violeta) / <alpha-value>)",
        violetaosc:   "rgb(var(--rgb-violetaosc) / <alpha-value>)",


        // Neutros
        texto:     "rgb(var(--rgb-gris) / <alpha-value>)",
        gris:      "rgb(var(--rgb-gris) / <alpha-value>)",
        grisclaro: "rgb(var(--rgb-grisclaro) / <alpha-value>)",

        // Aliases legacy (NO usar en nuevo código)
        primary:   "rgb(var(--rgb-oscuro) / <alpha-value>)",
        secondary: "rgb(var(--rgb-celeste) / <alpha-value>)",
      },
      container: { center: true, padding: "1rem" },
    },
  },
  plugins: [],
};
