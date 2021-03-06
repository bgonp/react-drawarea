require('esbuild').build({
  entryPoints: ['src/index.ts'],
  bundle: true,
  format: 'cjs',
  minify: true,
  outfile: 'build/index.js',
  target: 'es5',
  external: ['react'],
}).catch(() => process.exit(1))
