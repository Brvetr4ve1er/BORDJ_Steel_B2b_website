# Contributing to BORDJ STEEL Website

Thank you for your interest in contributing to this project.

## Project Status

This is a **proprietary client project** for BORDJ STEEL. Contributions are restricted to authorized developers and contractors only.

## Guidelines for Authorized Contributors

### Before Making Changes

1. **Read the documentation**: Review `README.md`, `ARCHITECTURE.md`, and `TODO.md` before making any changes
2. **Understand the constraints**: This is a production website serving a real business
3. **Follow the established patterns**: Maintain consistency with existing code structure

### Code Quality Standards

- **TypeScript**: Use proper types, avoid `any` unless absolutely necessary
- **Components**: Follow the established component hierarchy (`pages/`, `sections/`, `shared/`, `ui/`)
- **Server Components**: Prefer Server Components, only use `"use client"` when necessary
- **Testing**: Add tests for new features (when testing infrastructure is added)
- **Documentation**: Update relevant documentation when making significant changes

### Making Changes

1. Create a feature branch from `main`
2. Make focused, incremental changes
3. Write clear commit messages
4. Ensure the build passes: `npm run build`
5. Run linting: `npm run lint`
6. Test locally: `npm run dev`
7. Submit a pull request with a clear description

### What NOT to Do

As outlined in the README:

- Do not introduce parallel product systems
- Do not normalize or rewrite product content unless restoring it verbatim
- Do not keep legacy/hybrid code - prefer deleting or archiving
- Stability beats novelty - this is production code

### Code Review

All changes must be reviewed before merging to `main`. The reviewer will check:

- Code quality and consistency
- Adherence to architectural patterns
- Performance implications
- Security considerations
- Documentation updates

## Questions?

Contact the project maintainer or refer to the technical documentation in the repository.
