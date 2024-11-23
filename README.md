# README 

# account-manager
A Node.js API for generating balance sheet reports. This project is built using Express,
TypeScript, and various modern development tools and libraries. It incorporates best practices such
as configuration management, validation, error handling, and testing.

## Features
* REST API endpoints to fetch balance sheet reports
* Query parameter validation and oauth check
* Built-in retry mechanism for API calls using Axios
* Centralized error handling
* Basic unit test cases
* Security with CORS
* API retrial mechanism

## Technologies Used
* Node.js and Express for the server
* TypeScript for type safety and maintainability
* Zod for query parameter validation
* Axios for HTTP client operations
* Jest for unit test cases.
* CORS for security.

## Project Structure
├── src
│   ├── config            # Application configuration
│   ├── const             # Common constants
│   ├── controllers       # Request controllers
│   ├── middleware        # Middleware functions (global error handlers)
│   ├── route             # API routing
│   ├── services          # Business logic
│   ├── types             # Common objects (request, response, common)
│   ├── types             # TypeScript type definitions
│   ├── utils             # Helper utilities ( httpClient, validators, error)
│   ├── validators        # Schema validators            
│   └── app.ts            # App entry point
├── tests                 # Unit and integration tests
├── .env.*                # Environment variables
├── package.json          # Project metadata and dependencies
├── tsconfig.json         # TypeScript configuration
└── README.md             # Project documentation

## Installation
### Prerequisites

* Node.js (v16 or higher)
* npm or yarn
* Use mock Xero Balance Sheet API docker image available at https://hub.docker.com/r/jaypeng2015/show-me-the-money.
### Steps
Clone the repository:

git clone https://github.com/karan-saj/account-manager.git
cd account-manager
npm install

npm run {env}
// run app on local env
npm run local

The server should now be running on http://localhost:8080.

## Usage
API Endpoints
Fetch Balance Sheet Report
URL: http://localhost:8080/reports/balanceSheet
Method: GET
Query Parameters:
Parameter	    Type	    Required	Description
date	        string	    No	        Date for the report.
periods	        number	    No	        Number of periods to include.
timeframe	    string	    No	        Report timeframe (e.g., "MONTH").
paymentsOnly	boolean	    No	        Filter by payment entries only.

## Example Request
GET http://localhost:8080/balanceSheet/reports

## Environment Variables
The app uses the following environment variables (stored in a .env file):

Variable	    Description	Example
PORT	        Server runs on	8080
BASE_API_URL	Base URL for external API calls https://api.xero.com
RETRY_COUNT	    Number of retries for API calls (3)
API_KEY	        API key for authentication

## Testing
Run Tests
To run all test cases:
npm test

### Test Cases
Controller Tests: checks request payload is valid, checks 200 ok, checks invalid request
Service Tests: fetch report via api call, api failure scenario
Utility Tests: valid params was passed, invalid case

## Future Enhancements
* Rate limiting for API requests.
* Integration tests for end-to-end validation.
* Improve logging with structured formats, api logging
* Error message with more details
* Circuit breaker and error response caching
* API documentation (swagger)
* Pagination for large reports
