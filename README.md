**Automated UI Tests for SauceDemo (v.2.6.1)**



This repository contains automated E2E (End-to-End) tests for the SauceDemo website. The project is built using WebdriverIO and JavaScript with a focus on stability and clean code.



📝 **Features**

**Authentication:** Login with different user roles and error handling.

**Product Management:** Adding items to the cart and verifying selection.

**Sorting Logic:** Validating product sorting by name and price.

**Dynamic Data:** Using Faker.js to generate unique user information for checkout.

**Navigation:** Testing footer social links and external redirects.



**⚙️ Prerequisites**

Before running the tests, ensure you have:

Node.js (v18 or higher recommended)

Google Chrome browser installed



🚀 **Getting Started**

**1. Clone the repository**

git clone https://github.com/Dku4it/QA\_Autotest\_Task.git

cd QA\_Autotest\_Task

**2. Install dependencies**

npm install



🧪 **Running Tests**

To execute all test cases, use the following command:

npx wdio

To run a specific test suite (e.g., Login):

nnpx wdio --spec ./test/specs/001\_login.e2e.js



📊 **Reports**

Test results are displayed in the console via Spec Reporter.

If you have Allure Reporter configured, use:

npm run report



🛠 **Tech Stack**

**Framework:** WebdriverIO

**Design Pattern:** Page Object Model (POM)

**Language:** JavaScript (ES6+)

**Data Generation:** Faker.js

**Assertions:** Expect (WDIO)

