# CLAUDE.md - Instructions for Agentic Coding Assistants

## Build & Development Commands
- `pnpm dev` - Run development server for playground
- `pnpm dev:prepare` - Build module in stub mode, prepare for development
- `pnpm dev:build` - Build the playground
- `pnpm prepack` - Build the module for production

## Lint & Test Commands
- `pnpm lint` - Run ESLint on the codebase
- `pnpm test` - Run all tests with Vitest
- `pnpm test:watch` - Run tests in watch mode 
- `pnpm test:types` - Run type checking
- `pnpm test -- path/to/test.ts` - Run a single test file
- `pnpm test -- -t "test name"` - Run tests matching a specific name

## Code Style Guidelines
- Use TypeScript for all files with proper type definitions
- Follow Nuxt module development patterns using `@nuxt/kit`
- ESLint uses `@nuxt/eslint-config` with tooling and stylistic rules
- Use named exports rather than default exports where appropriate
- Prefer async/await over promise chains
- Keep plugin files focused on a single responsibility
- Use proper error handling with try/catch blocks
- Follow import order: Node.js modules → external → internal → relative
- Use consistent naming: PascalCase for components, camelCase for variables