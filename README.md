# DRCKBankingSystem-FE

## Setup Instructions

* Ensure that the Nodejs version installed is v18.17.1.
* To install the dependencies, on the root folder (/drckbankingsystem-fe) type `npm install`
* To run the application type `npm run dev` (for development), `npm run build; npm run start` (for production)

### Temporary Instructions (for branch apiroute)

As the branch is set to use the school's vm addresses with ssl enabled, modify the following items for local testing:

* On .env, NEXT_PUBLIC_BASE_API_URL→http://localhost:3000/api, DJANGO_BASE_URL→http://127.0.0.1:8000
* On src/api/api_axiosConfig.js, Comment the variable 'httpsAgent' (including the one inside axios.create)
