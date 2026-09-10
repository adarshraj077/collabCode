# E2B Sandbox Cleanup

When writing scripts, application code, or even quick temporary test files that spawn an E2B Sandbox (e.g., `Sandbox.create()`), you MUST wrap the execution in a `try...finally` block.

The `await sandbox.kill()` method MUST be placed inside the `finally` block to guarantee that the microVM is destroyed, even if an unhandled exception or timeout occurs midway through execution. 

**Example pattern:**
```typescript
const sandbox = await Sandbox.create({ template: 'collabcode-env' });
try {
    // code execution
} finally {
    await sandbox.kill();
}
```
Never place `sandbox.kill()` at the end of a `try` block.
