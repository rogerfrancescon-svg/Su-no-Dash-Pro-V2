import os

with open('vite.config.ts', 'r') as f:
    content = f.read()

target = """export default defineConfig(() => {
  return {
    base: './',"""

replacement = """export default defineConfig(() => {
  const repoName = process.env.GITHUB_REPOSITORY ? `/${process.env.GITHUB_REPOSITORY.split('/')[1]}/` : './';
  return {
    base: process.env.GITHUB_ACTIONS ? repoName : './',"""

if target in content:
    content = content.replace(target, replacement)
    with open('vite.config.ts', 'w') as f:
        f.write(content)
    print("Successfully updated vite.config.ts")
else:
    print("Target not found in vite.config.ts")
