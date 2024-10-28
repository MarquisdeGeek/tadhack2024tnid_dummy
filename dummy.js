import fetch from 'node-fetch';
import urljoin from 'url-join';

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

    async request(pathstub, jsonData) {
      const uri = urljoin("https://", this.endpoint(), pathstub);

      const response = await fetch(uri, {
        method: 'post',
        body: JSON.stringify(jsonData),
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this._tokenCompany}`,
        },
      });

      const data = await response.json();
      return data;
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

            const response = await this.request('/company', {
                query: api.get_companies.loc.source.body
            });

            return response.data.companies;
        }
  

}



export { TinyDummy };
