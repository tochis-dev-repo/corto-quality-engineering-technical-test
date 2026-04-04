# corto-quality-engineering-technical-test
My implementation on a set of pre-defined tasks. The goal is to be able to demonstrate my capacity to perform in excellent fashion, the lead QE role as pre-defined in previous interview sessions.

## Web UI Automation Task

### Getting Started
* Navigate to the project
```bash
cd task-1-web-ui-automation
```
* Install dependencies
```bash
npm install
npx playwright install
```
* Run Tests
```bash
npx playwright test
```

* See HTML Report
```bash
npx playwright show-report
```

### Framework General Design
This framework is implemented using the page object model which is a very good standard. This makes it:
* easy to maintain,
* scalable,
* easy to understand and extend

### Framework Features
* These include the following:
    * Automatic retries (2 retries for failed tests)
    * Screenshots captured on failure
    * Environment-based configuration (via .env files)
        * _these are excluded from being updated via gitignore. Why? Because their values could clash with the environment variables in a proper CI pipeline_ 

#### Project Structure
```bash
task-1-web-ui-automation/
│
├── page-objects/     # Page Object classes (UI abstraction layer)
├── ui-tests/         # Test cases
├── test-data/        # Test data files
├── helpers/          # Reusable utility/helper classes
├── test-results/     # Playwright output (screenshots, traces, etc.)
├── playwright-report/ # HTML reports
└── .env              # Environment variables (e.g. base URL)
```

### Notes
During development - I utilised codepilot which is an AI tool that sits next to codespaces (my development platform).
As an AI assistant, it facilitated some grunt work. These include:
* implementing repetitive logic across the code base 
    * _this saved me time and effort of copy/pasting repitive logic across multiple files_
* quick debugging
* setup tasks - like installing all the necessary dependencies on my development container.

In this project, the structure, design and logical implementation are derived from years of experience building such frameworks. 

*However, I should note that the AI has been very helpful in speeding up the implementation.*

#### My AI Philosophy is simple:
The AI is not accountable - I am. This means that every line of code is the developers responsibility. 
In practical terms, every AI generated code must be:
* Reviewed, 
* Tested,
* Validated

I recommend **not granting write access** without permission before any generated code is utilised.

