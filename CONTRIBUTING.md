
# Contributing Guidelines

Thank you for considering contributing to this project! We appreciate your help in making this project better. Please follow the guidelines below to ensure that your contributions are smoothly integrated.

## Code of Conduct

By participating in this project, you agree to abide by our [Code of Conduct](./CODE_OF_CONDUCT.md). Please engage respectfully and constructively.

## How to Contribute

### 1. Start a Discussion

Begin by [opening a discussion](/discussions) to propose your changes or improvements. We’ll invite you as [contributors](/graphs/contributors) and assist you in creating the corresponding [issue](/issues) and working [branch](/branches) for your contribution.

### 2. Set Up Your Local Environment

Follow these steps to prepare your development environment:

- Clone the repository using SSH:
  ```bash
  git clone git@github.com:mnrendra/stack-trace.git
  ```

- Navigate to the project directory:
  ```bash
  cd stack-trace
  ```

- Switch to the assigned branch:
  ```bash
  git checkout [assigned-branch-name]
  ```

- Verify your Git configuration to ensure that your commits are associated with the correct author information:
  ```bash
  git config --list
  ```
  *Verify that `user.name` is your name and `user.email` is your [private email](https://docs.github.com/en/account-and-profile/setting-up-and-managing-your-personal-account-on-github/managing-email-preferences/setting-your-commit-email-address).*

- Ensure that you’re using the latest **LTS** version of **Node.js** and a compatible version of **npm**:
  ```bash
  node -v && npm -v
  ```
  *If outdated, please upgrade to the latest LTS version of Node.js and npm.*

- Install the project dependencies:
  ```bash
  npm install
  ```

- Test your local project to ensure it's ready for development:
  ```bash
  npm test
  ```

### 3. Make Your Changes

Follow these guidelines to implement your changes:

- Write a test for your feature or fix in [`./__tests__/index.ts`](./__tests__/index.ts), or create a new test file in the [`./__tests__`](./__tests__/) directory if appropriate.
- Ensure that your tests cover all affected code paths (see [current coverage](https://app.codecov.io/gh/mnrendra/stack-trace)).
- Use **TypeScript** consistently for all source files (see [`tsconfig.json`](./tsconfig.json) for details).
- Strictly adhere to the configured **ESLint** rules (see [`.eslintrc.json`](./.eslintrc.json) for details).
- Follow existing file naming and organization conventions (see [project structure](./) for reference).
- Maintain code readability and consistency by providing proper documentation. Please use **JSDoc** comments for all exported public APIs to ensure maintainability and auto-generation of documentation (see [`./src/main.ts`](./src/main.ts) for an example).
- Avoid introducing breaking changes to the public API or major behavioral changes unless discussed in advance. We are following semantic versioning using [semantic-release](https://semantic-release.gitbook.io/semantic-release), so please follow its guidelines.
- Update the [`README.md`](./README.md) file to reflect any changes to public APIs, usage examples, or configuration options introduced by your contribution.
- Keep commits atomic and focused on a single change.

### 4. Run Tests

Ensure that your changes do not break existing tests.

- Run tests before committing to confirm that all tests pass:
  ```bash
  npm test
  ```

### 5. Run Security Checks

Ensure that your changes don’t negatively impact the [OpenSSF Scorecard](https://github.com/ossf/scorecard) rating or introduce vulnerabilities.

> Before running the security checks, ensure that `scorecard` is installed locally:
> ```bash
> scorecard --version
> ```
> *If not, follow the [Scorecard documentation](https://scorecard.dev/#using-the-cli) to install it.*

- Run security checks before committing to ensure that everything is secure:
  ```bash
  npm run security
  ```

  *This checks for known vulnerabilities and ensures compliance with best practices.*

### 6. Commit Your Changes

We use [Commitizen](https://www.npmjs.com/package/commitizen) for generating commit messages and [semantic-release](https://semantic-release.gitbook.io/semantic-release) for semantic versioning. Please use the provided script for committing.

- Run the commit script to commit your changes:
  ```bash
  npm run commit
  ```

- Follow the [Conventional Commits](https://www.conventionalcommits.org/) format.
- Select the appropriate commit type (see [conventional-commit-types](https://github.com/pvdlg/conventional-commit-types) for reference).
- Ensure that your commit message includes the related issue number and aligns with the scope and naming of the assigned branch.
- Avoid introducing breaking changes unless they have been discussed in advance.

> ⚠️ Pull requests with non-standard or poorly formatted commit messages will be **rejected**.

### 7. Push Your Changes

Ensure that your local branch is up-to-date with the base branch before pushing it to the remote repository:
```bash
git pull --rebase origin [base-branch]
```
> ⚠️ Please only pull from the **base branch** (e.g., `dev`) — do not pull from any other branches.

Push your up-to-date local branch to the remote repository:
```bash
git push origin [assigned-branch-name]
```

### 8. Submit a Pull Request

Create a Pull Request targeting the base branch (e.g., `dev`). After submission, a maintainer will review it before merging. Please use the following format for your Pull Request:

#### Pull Request Title
Must match the related issue title (e.g., `feat: something`).  

#### Pull Request Description
Use the following template to ensure consistency:  
```
issues:
* [issue title] (#[issue number])

commits:
* [commit title] ([first 7 chars of the commit hash])
```
Example:  
```
issues:
* feat: something (#123)

commits:
* feat: something (abc123d)
```

See [merged commits](/commits/main/) for reference.

#### Ensure that the Pull Request Includes:
- Correct **target branch**
- Relevant **reviewers**
- Proper **assignee**
- Updated **project status**
- Linked **issue**

If you have any questions, feel free to [open a discussion](/discussions). We’re here to help!

Thank you for your contributions and collaboration!

## Maintainer
[@mnrendra](https://github.com/mnrendra)
