import { defineConfig } from 'vite'
import RubyPlugin from 'vite-plugin-ruby'
// @ts-ignore
import vue from '@vitejs/plugin-vue'

export default defineConfig({
    plugins: [
        RubyPlugin(),
        vue()  // <-- 加上这个
    ],
})