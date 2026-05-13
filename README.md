Automated UI Tests for SauceDemo
This repository contains automated E2E (End-to-End) tests for the SauceDemo website. The project is built using WebdriverIO and JavaScript.

⚙️ Prerequisites
Before running the tests, make sure you have the following installed:

Node.js (Version 16 or higher)

npm (Comes with Node.js)

Google Chrome browser

🚀 Getting Started
1. Clone the repository
First, download the project to your local machine:

git clone https://github.com/your-username/your-repo-name.git
cd your-repo-name
2. Install dependencies
Install all necessary packages and libraries:

npm install
🧪 Running Tests
To execute all test cases, use the following command:

npx wdio
To run a specific test file:

npx wdio run wdio.conf.js --spec ./test/specs/DD_Test001.e2e.js
📊 Reports
After the tests are finished, you can find the results in the console.
To generate and open the visual report:

npm run report
🛠 Tech Stack
Framework: WebdriverIO

Pattern: Page Object Model (POM)

Language: JavaScript

Assertion Library: Expect (WDIO)
