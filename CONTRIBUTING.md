# Contributing to Startly

Thank you for your interest in contributing to Startly! This document provides guidelines and information for contributors.

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ and npm
- Git
- Basic knowledge of TypeScript, NestJS, and React

### Development Setup

1. **Fork and Clone**
   ```bash
   git clone https://github.com/your-username/startly.git
   cd startly
   ```

2. **Install Dependencies**
   ```bash
   # Install root dependencies (includes Husky for git hooks)
   npm install
   
   # Backend
   cd assembler-service
   npm install
   
   # Frontend
   cd ../frontend
   npm install
   ```

3. **Environment Setup**
   ```bash
   # Backend
   cd assembler-service
   cp .env.example .env
   # Edit .env with your configuration
   
   # Frontend
   cd ../frontend
   cp .env.example .env
   # Edit .env with your configuration
   ```

4. **Start Development Servers**
   ```bash
   # Terminal 1 - Backend
   cd assembler-service
   npm run start:dev
   
   # Terminal 2 - Frontend
   cd frontend
   npm run dev
   ```

## 📝 How to Contribute

### Reporting Issues
- Use the GitHub issue tracker
- Search existing issues before creating new ones
- Provide detailed information:
  - Steps to reproduce
  - Expected vs actual behavior
  - Environment details
  - Screenshots if applicable

### Suggesting Features
- Open an issue with the "enhancement" label
- Describe the feature and its use case
- Explain why it would be valuable
- Consider implementation complexity

### Code Contributions

#### 1. Create a Feature Branch
```bash
git checkout -b feature/your-feature-name
```

#### 2. Make Your Changes
- Follow the existing code style
- Write tests for new functionality
- Update documentation as needed
- Ensure all tests pass

#### 3. Commit Guidelines
The project uses Husky with automated git hooks:

- **Pre-commit**: Automatically runs linting and formatting on staged files
- **Commit-msg**: Validates commit messages follow conventional commit format

Use conventional commits:
```bash
git commit -m "feat: add new module type support"
git commit -m "fix: resolve template parsing issue"
git commit -m "docs: update API documentation"
```

Types:
- `feat`: New features
- `fix`: Bug fixes
- `docs`: Documentation changes
- `style`: Code style changes
- `refactor`: Code refactoring
- `test`: Test additions/changes
- `chore`: Maintenance tasks
- `ci`: CI/CD changes
- `build`: Build system changes
- `perf`: Performance improvements
- `revert`: Revert previous commits

**Note**: If your commit message doesn't follow the conventional format, the commit will be rejected by the commit-msg hook.

#### 4. Submit Pull Request
- Push your branch to your fork
- Create a pull request against the main branch
- Fill out the PR template
- Link related issues

## 🏗 Project Structure

```
startly/
├── assembler-service/          # NestJS backend
│   ├── src/                   # Source code
│   ├── boiler-templates/      # Template system
│   └── test/                  # Tests
├── frontend/                  # React frontend
│   ├── src/                   # Source code
│   └── public/                # Static assets
└── examples/                  # Generated project examples
```

## 🧪 Testing

### Backend Tests
```bash
cd assembler-service
npm test                    # Run all tests
npm run test:watch         # Watch mode
npm run test:cov           # Coverage report
npm run test:e2e           # End-to-end tests
```

### Frontend Tests
```bash
cd frontend
npm test                   # Run tests
npm run test:watch         # Watch mode
```

### Integration Testing
Test the complete flow:
```bash
# Start both services
# Generate a test project via the UI
# Verify the generated project works
```

## 📋 Code Style

### TypeScript/JavaScript
- Use TypeScript for all new code
- Follow existing ESLint configuration
- Use meaningful variable and function names
- Add JSDoc comments for public APIs

### React Components
- Use functional components with hooks
- Follow the existing component structure
- Use TypeScript interfaces for props
- Keep components focused and reusable

### NestJS Backend
- Follow NestJS conventions
- Use dependency injection
- Implement proper error handling
- Add Swagger documentation for APIs

## 🎯 Adding New Modules

### 1. Module Structure
```
boiler-templates/presets/nestjs-base/modules/your-module/
├── files/                  # Files to copy
├── meta.json              # Module metadata
└── README.module.md       # Documentation
```

### 2. Module Metadata
```json
{
  "name": "your-module",
  "description": "Module description",
  "version": "1.0.0",
  "deps": {
    "package-name": "^1.0.0"
  },
  "devDeps": {},
  "env": ["REQUIRED_ENV_VAR"],
  "inject": {
    "src/app.module.ts": {
      "import": ["import { YourModule } from './your-feature/your.module';"],
      "register": ["YourModule"]
    }
  },
  "conflicts": ["conflicting-module"],
  "requires": ["required-module"]
}
```

### 3. Template Files
- Use Handlebars syntax: `{{projectName}}`
- Follow existing code patterns
- Include proper TypeScript types
- Add comprehensive error handling

## 🔍 Review Process

### Pull Request Checklist
- [ ] Code follows project conventions
- [ ] Tests are included and passing
- [ ] Documentation is updated
- [ ] No breaking changes (or properly documented)
- [ ] Commit messages follow conventions
- [ ] PR description is clear and complete

### Review Criteria
- Code quality and maintainability
- Test coverage and quality
- Documentation completeness
- Performance impact
- Security considerations
- Backward compatibility

## 🤝 Community Guidelines

### Code of Conduct
- Be respectful and inclusive
- Welcome newcomers and help them learn
- Focus on constructive feedback
- Respect different opinions and approaches

### Communication
- Use GitHub issues for bug reports and feature requests
- Join discussions in pull requests
- Be patient and helpful with questions
- Provide context and examples

## 📚 Resources

### Documentation
- [NestJS Documentation](https://docs.nestjs.com/)
- [React Documentation](https://react.dev/)
- [TypeScript Documentation](https://www.typescriptlang.org/docs/)
- [Handlebars Documentation](https://handlebarsjs.com/)

### Project-Specific
- [API Documentation](http://localhost:3000/api/docs) (when running locally)
- [Module Development Guide](./assembler-service/boiler-templates/README.md)
- [Architecture Overview](./README.md#tech-stack)

## 🎉 Recognition

Contributors will be:
- Listed in the project's contributors section
- Mentioned in release notes for significant contributions
- Invited to join the maintainers team for consistent contributors

Thank you for contributing to Startly! 🚀
