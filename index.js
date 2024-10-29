import 'dotenv/config'

import { TinyDummy } from './dummy.js';


const dummy = new TinyDummy({
    clientID:       process.env.TNID_CLIENT_ID,
    clientSecret:   process.env.TNID_CLIENT_SECRET,
    // Replace with non-staging, when you're ready!
    // api_endpoint: 'api.staging.v2.tnid.com'
})

// Get a token, from the basic client secrets
const token = await dummy.companyGetToken(process.env.TNID_CLIENT_ID, process.env.TNID_CLIENT_SECRET);
dummy.tokenCompany = token;

// Use that token to retrieve some data
const companies = await dummy.companyGetAll();

console.log(companies)

