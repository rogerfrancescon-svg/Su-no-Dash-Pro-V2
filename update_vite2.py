with open('vite.config.ts', 'r') as f:
    content = f.read()

target = """    build: {
      chunkSizeWarningLimit: 1500,
    },"""

replacement = """    build: {
      chunkSizeWarningLimit: 1500,
      rollupOptions: {
        output: {
          manualChunks: {
            xlsx: ['xlsx'],
            recharts: ['recharts'],
            supabase: ['@supabase/supabase-js']
          }
        }
      }
    },"""

if target in content:
    content = content.replace(target, replacement)
    with open('vite.config.ts', 'w') as f:
        f.write(content)
    print("Updated vite.config.ts")
else:
    print("Target not found")
