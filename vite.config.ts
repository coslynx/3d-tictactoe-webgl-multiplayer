import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

/**
 * JSDoc: Configures the Vite build process for a React, TypeScript, and Three.js project.
 * @returns {import('vite').UserConfig} - A Vite configuration object.
 */
export default defineConfig(() => {
  try {
    /**
     * JSDoc: Ensures required packages are installed.  Throws an error if a package is missing.
     * @param {string} packageName - The name of the package to check.
     */
    const ensurePackageInstalled = (packageName: string) => {
      try {
        require.resolve(packageName);
      } catch (error) {
        console.error(`Error: Required package "${packageName}" is not installed. Please install it by running: npm install ${packageName}`);
        throw error;
      }
    };

    ensurePackageInstalled('react');
    ensurePackageInstalled('react-dom');
    ensurePackageInstalled('three');
    ensurePackageInstalled('@react-three/fiber');
    ensurePackageInstalled('@react-three/drei');
    ensurePackageInstalled('framer-motion');
    ensurePackageInstalled('tailwindcss');

    return {
      base: '/',
      plugins: [react()],
      resolve: {
        alias: {
          '@/*': path.resolve(__dirname, './src/*'),
        },
      },
      build: {
        sourcemap: true,
        minify: 'esbuild',
        rollupOptions: {
          output: {
            manualChunks: (id) => {
              if (id.includes('node_modules')) {
                return id.toString().split('node_modules/')[1].split('/')[0].toString();
              }
            },
          },
        },
      },
      server: {
        port: 3000,
        open: true,
      },
      optimizeDeps: {
        include: ['@react-three/fiber', '@react-three/drei', 'three'],
      },
    };
  } catch (error: any) {
    console.error('Vite configuration failed. Please check your dependencies.');
    process.exit(1);
  }
});