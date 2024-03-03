# NodeJS-UserManagementAPI

This repository contains a Node.js-based backend API focused on user account management. Implementing authentication, authorization, and CRUD operations on user data.

## Features

- User Registration
- User Authentication (Login/Logout)
- Profile Management (CRUD operations)
- Secure password handling with bcrypt
- JWT-based session management
- Structured logging with Pino


## Installation

1. **Clone the repository**

    First, clone the repository to your local machine:

    ```bash
    git clone https://github.com/gibran-toriz/NodeJS-UserManagementAPI.git
    ```

2. **Install the dependencies**

    Navigate into the project directory and install the dependencies:

    ```bash
    cd node-js-user-management-api
    npm install
    ```  

3. **Build the project**
    Build the project with the following command:
    
    ```bash
    npm run build
    ```

4. **Start the project**
    You can start the project in development mode with:
    
    ```bash
    npm run start:dev
    ```
    
    Or in production mode with:

    ```bash
    npm run start:prod
    ```

## Running Tests

This project uses [Jest](https://jestjs.io/) as its test runner. If you want to run the tests, you can do so with the following command:

```bash
npm test
```
This will run all the tests in the src directory that match the pattern *.spec.ts.

The test command also generates a coverage report, which you can find in the reports/coverage directory. The coverage report shows you how much of your code is covered by tests.

If you want to generate a JUnit test report, you can do so with the following command:

```
SONAR_TEST_REPORT_PATH='reports/test-results/test-report.xml' npm test
```

This will generate a `test-report.xml` file in the `reports/test-results` directory. This file is in a format that can be used by tools like SonarQube or SonarCloud.


## Code Coverage

This project is configured to track code coverage using [Jest](https://jestjs.io/). Code coverage is a measure of how much of your code is executed during testing.

After running the tests with `npm run test:cov`, a coverage report is generated in the `reports/coverage` directory. The report is in the `lcov` format, which can be viewed in a web browser.


## Logging

This project uses [pino](https://github.com/pinojs/pino) for logging. Logs are output to the console and also sent to an Elasticsearch instance.

The Elasticsearch instance is configured via environment variables:

- `ELASTICSEARCH_URL`: The URL of your Elasticsearch instance.
- `ELASTICSEARCH_USERNAME`: The username for your Elasticsearch instance.
- `ELASTICSEARCH_PASSWORD`: The password for your Elasticsearch instance.

Logs are stored in the `user-management-logs` index in Elasticsearch.

In non-production environments, logs are pretty-printed to the console for easier reading.

To view the logs, you can use the Elasticsearch's search API, or a tool like Kibana.


## Database

This project uses [MongoDB](https://www.mongodb.com/) as its backend database. The database is accessed using [Mongoose](https://mongoosejs.com/), a MongoDB object modeling tool designed to work in an asynchronous environment.

Once you've set up your MongoDB instance, you need to provide the connection string as an environment variable:

```bash
MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/database?retryWrites=true&w=majority
``` 