module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-enum': [
      2,
      'always',
      [
        'feat', // New feature
        'fix', // Bug fix
        'docs', // Documentation only
        'style', // Formatting, missing semicolons, etc.
        'refactor', // Code change that neither fixes bug nor adds feature
        'test', // Adding or updating tests
        'chore', // Maintenance tasks
        'perf', // Performance improvement
        'ci', // CI/CD changes
        'build', // Build system changes
        'revert', // Revert previous commit
      ],
    ],
    'subject-case': [0], // Allow any case in subject
    'header-max-length': [2, 'always', 100],
  },
};
