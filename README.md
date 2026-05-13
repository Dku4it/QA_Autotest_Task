**<< Automated UI Tests for SauceDemo v.2.4.3>>**



This repository contains automated E2E (End-to-End) tests for the SauceDemo website. The project is built using WebdriverIO and JavaScript.



⚙️ **Prerequisites**

Before running the tests, make sure you have the following installed:

Node.js (Version 16 or higher)

npm (Comes with Node.js)

WebdriverIO

Google Chrome browser



🚀 **Getting Started**

1\. Clone the repository

First, download the project to your local machine:

git clone https://github.com/Dku4it/QA\_Autotest\_Task.git

cd QA\_Autotest\_Task

2\. Install dependencies

Install all necessary packages and libraries:

npm install



🧪 **Running Tests**

To execute all test cases, use the following command:

npx wdio

To run a specific test file:

npx wdio run wdio.conf.js --spec ./test/specs/DD\_Test001.e2e.js



📊 **Reports**

After the tests are finished, you can find the results in the console.

To generate and open the visual report:

npm run report



🛠 **Tech Stack**

Framework: WebdriverIO

Pattern: Page Object Model (POM)

Language: JavaScript

Assertion Library: Expect (WDIO)

