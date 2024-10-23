import * as https from 'https';
import { gql } from '@apollo/client/index.js';
import { api } from './api/api.js';



class TinyDummy{
    constructor(options) {
        this._options = options;
        //
        this._tokenCompany = undefined;
    }

    set tokenCompany(token) {
        this._tokenCompany = token;
    }

    endpoint() {
        const uri = 'api.staging.v2.tnid.com';

        return this._options.api_endpoint ?? uri;
    }

    request(pathstub, jsonData) {
        return new Promise((resolve, reject) => {

            const options = {
                hostname:   this.endpoint(),
                path:       pathstub,
                method:     'POST',
                headers: {
                  'Content-Type': 'application/json',
                  'Authorization': `Bearer ${this._tokenCompany}`,
                },
              };
              //
              const request = https.request(options, (res) => {
                let data = '';
                console.log(`statusCode: ${res}`);
              
                res.on('data', (d) => {
                  data += d;
                });
                res.on('end', () => {
                    resolve(JSON.parse(data));
                });
              });
              
              request.on('error', (error) => {
                reject(error);
              });
              
              request.write(JSON.stringify(jsonData));
              request.end();
              
        });
    }

      
    async companyGetToken() {
        const response = await this.request('/auth/token', {
            'client_id':       process.env.TNID_CLIENT_ID,
            'client_secret':   process.env.TNID_CLIENT_SECRET    
        });

        // WARNING: Tokens don't appear to have an automatic expiry on them. You can to manually
        // remove them.

        return response.access_token;
    }

    async companyGetAll() {

const GET_COMPANIESGET_COMPANIES = gql`
query (
  $name: String
  $taxId: String
  $email: String
  $telephoneNumber: String
  $webpage: String
  $limit: Int
) {
  companies (
    name: $name
    taxId: $taxId
    email: $email
    telephoneNumber: $telephoneNumber
    webpage: $webpage
    limit: $limit
  ) {
    id
    legalName
    brandName
    profileName
    taxId
  metadata
  yearFounded
  aboutUs
  }
}
`;

console.log(api)
            const response = await this.request('/company', {
                query: api.get_companies.loc.source.body
            });

            return response.data.companies;
        }
  

}



export { TinyDummy };
