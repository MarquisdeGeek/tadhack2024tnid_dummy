# TNID Dummy

The simplest code I could think of, to let you retrieve some data from GraphQL

99.9% of people won't need this, and will start with Apollo or similar.

For me... I'm in the 0.1% :)

## Getting started (company test)

* Get the client ID/secrets from company secrets page (https://app.staging.v2.tnid.com/company/client-secrets)

* Rename `dot.env.sample` to `.env`

* Replace the ??? with the ID/secret from the page above

* `node index.js`

And it _should_ give you a list of companies.



## Getting started (user test)

* Rename `dot.env.sample` to `.env`

* In .env, add your phone number to the field named USER_ME_PHONENUMBER

* `node user.js`

And it _should_ initiate the process that results in TNID sending you a one-time password (OTP.) It's probably in your email.
Note this down, and use it to retrieve a token, like this:

* `node user.js --otp=12345`

And it _should_ return a long token string which can be used for many future sessions. These sessions let you do customer-oriented actions, like list the spam reports attached to your phone number.  e.g.

* `node user.js --token=[...] -s`

If the token is too cumbersome, it can be added to the .env file, as USER_TOKEN. At this point you can get the spam reports by simply calling:

* `node user.js -s`

