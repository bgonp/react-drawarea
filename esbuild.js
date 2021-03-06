require('esbuild').build({
  entryPoints: ['src/index.ts'],
  bundle: true,
  format: 'cjs',
  minify: true,
  outfile: 'build/index.js',
  target: 'es6',
  external: ['react'],
  define: {
    'process.env.NODE_ENV': '"production"',
  },
}).catch(() => process.exit(1))
