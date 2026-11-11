import { defineConfig } from "vite";
import { extensions, classicEmberSupport, ember } from "@embroider/vite";
import { babel } from "@rollup/plugin-babel";
import tailwindcss from "@tailwindcss/vite";
import { loadTranslations } from "@ember-intl/vite";
export default defineConfig({
  plugins: [
    tailwindcss(),
    classicEmberSupport(),
    ember(),
    // extra plugins here
    babel({
      babelHelpers: "runtime",
      extensions,
    }),
    loadTranslations(),
  ],
});
