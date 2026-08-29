import { defineConfig } from 'vite'
import react, { reactCompilerPreset } from '@vitejs/plugin-react'
import babel from '@rolldown/plugin-babel'
import tailwindcss from "@tailwindcss/vite";
import { VitePWA } from 'vite-plugin-pwa';
// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    babel({ presets: [reactCompilerPreset()] }),
    tailwindcss(),
    VitePWA({
      registerType:"autoUpdate",
      includeAssets:[
        "favicon.svg",
        "bahasaindonesia.jpg",
        "bahasainggris.jpg",
        "desaingrafis.jpg",
        "informatika.jpg",
        "ipas.jpg",
        "jadwal.jpeg",
        "matematika.jpg",
        "mulok.jpg",
        "pai.jpg",
        "pancasila.jpg",
        "pemrogramandasar.jpg",
        "pendidikanjasmani.jpg",
        "sejarah.jpg",
        "senibudaya.jpg"
      ],
      manifest:{
        name:"NotePR",
        short_name:"NotePR",
        theme_color:"#a855f7",
        lang:"id"
      }
    })
  ],
})
