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
```
   * For MAC/Windows
   ```bash
   npx playwright install
   ```
   * For Linux (Codespaces/CI environments)
   ```bash
   npx playwright install --with-deps
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


## Rest API Automation Task

### Getting Started
* Navigate to the project
```bash
cd task-2-rest-api-automation
```
* Install dependencies
```bash
npm install
```
   * For MAC/Windows
   ```bash
   npx playwright install
   ```
   * For Linux (Codespaces/CI environments)
   ```bash
   npx playwright install --with-deps

* Run Tests
```bash
npx playwright test
```

* See HTML Report
```bash
npx playwright show-report
```
### Framework General Design
Just like with the first task, this framework has a strong focus on being scalable, easy to maintain and easy to understand.

It follows a properly layered structure, where we seperate the concerns.

* Test Data Layer
  *  Test cases are driven by structured data files
  *  Which contain:
    *  positive scenarios
    *  negative scenarios
    *  Each test case includes:
      *  description
      *  request payload
      *  expected outcomes
       
*  Utitlities Layer
  *  A set of handy methods that support the framework assertions, response handling, and report handling.

*  Tests Layer
  *  Our different test scenarios are housed here

*  API Client Layer
  *  Encapsulates all HTTP interactions
  *  Each domain (e.g., Booking, Auth) has its own client
  *  Built on top of a shared BaseClient
  *  Promotes reuse and consistency

### Framework Features
* These include the following:
    * Data Driven Testing
    * Positive and Negative Scenario coverage
    * API Chaining (data flow between endpoints)
    * Reusable architecture 
    * Clear test reporting with useful messaging to enable faster debugging
 
#### Project Structure
```bash
task-2-rest-api-automation/
│
├── api-clients/
├── utils/
├── test-data/
└── tests/
```

For information on the use of AI on this task, please refer to the notes above - **"Notes"** & **"My AI Philosophy is Simple"**

## Rest API Automation Task 2B - AI Generated 

### Getting Started
* Navigate to the project
```bash
cd task-2b-ai-gen-api-automation
```
* Install dependencies
```bash
npm install
```
   * For MAC/Windows
   ```bash
   npx playwright install
   ```
   * For Linux (Codespaces/CI environments)
   ```bash
   npx playwright install --with-deps

* Run Tests
```bash
npx playwright test
```

* See HTML Report
```bash
npx playwright show-report
```
### How the code was generated
I used Google Gemini to generate the code seen in ```ai-generated-auth-api-test.spec.ts```

*  The Prompt Used:
*  ```bash
   Generate Playwright API tests in TypeScript for the Restful Booker /auth endpoint. The tests should:
   Include both positive and negative test scenarios
   Send a POST request to /auth with username and password
   Validate the response status
   For valid credentials, verify a token is returned
   For invalid credentials, verify a failure message is returned.
   ```
### My Thoughts
#### Strengths (THE GOOD COLUMN)
*  Correctly interpreted the requirements and implemented both positive and negative scenarios
*  Correctly interpreted the requirements and implemented both positive and negative scenarios
*  Required minimal input (no API spec provided) to generate a working solution
*  Fast turnaround time.

#### Limitations (THE 'COULD BE BETTER' COLUMN)
*  There was a clear lack of seperation of concerns 
*  Demonstrated understanding of API testing concepts (status validation, response body checks)
*  Hard coded values, and no proper frammework structure.
*  Limited reusability of code

I put my inline comments and suggested improvements in the ```ai-generated-auth-api-test.spec.ts``` code. They are annotated as **QE Notes**

#### Alignment with Framework Implementation

The above limitations were addressed in the main test framework (Part A: ```task-2-rest-api-automation\```), where:

- API interactions are abstracted via reusable client classes (e.g., `AuthClient`)
- Test data is externalized into structured data files (`AuthTestData.ts`)
- Assertions are centralized using helper utilities
- Configuration such as base URL is managed via environment variables

This ensures scalability, maintainability, and consistency across the test suite.

See: ```auth.spec.ts``` for more details.
