import 'dotenv/config'

import stdio from 'stdio';
import { TinyDummy } from './dummy.js';


const dummy = new TinyDummy({
    clientID:       process.env.TNID_CLIENT_ID,
    clientSecret:   process.env.TNID_CLIENT_SECRET,
    // Replace with non-staging, when you're ready!
    // api_endpoint: 'api.staging.v2.tnid.com'
})


// var stdio = require('stdio');
const ops = stdio.getopt({
    'otp': {key: 'o', args: 1, description: 'OTP, if available'},
    'token': {key: 't',  args: 1, description: 'User token'},
    //
    'spam': {key: 's', description: 'List spam report'},
});


// There are several ways to provide a user token, to authenticate you against TNID:

// 1. Supply the token on the command line
if (ops.token) {
    dummy.tokenUser = ops.token;

// 2. Add it to the .env
} else if (process.env.USER_TOKEN) {
    dummy.tokenUser = process.env.USER_TOKEN;

// 3. Use a OTP
} else if (ops.otp) {
    const token = await dummy.userGetToken(process.env.USER_ME_PHONENUMBER, ops.otp);
    dummy.tokenUser = token;

    console.log(`Future requests may now use the token, with a call:`);
    console.log(`  node ${process.argv[1]} --token=${token}`);
    
// In all other cases, request a OTP that (in turn) will give you an authenticating token
} else {
    const otp = await dummy.userGetOTP(process.env.USER_ME_PHONENUMBER);
    console.log(`Check email for OTP`);
    console.log(`Then call:`);
    console.log(`  node ${process.argv[1]} --otp=[otp]`);
}

// Make a request?
if (dummy.tokenUser) {
    if (ops.spam) {
        console.log(`Requesting spam report...`);
        const reports = await dummy.userGetSpamReports();

        console.log(reports);
    }

}

