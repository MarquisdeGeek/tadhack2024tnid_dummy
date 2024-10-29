import fetch from 'node-fetch';
import urljoin from 'url-join';

import { api } from './api/api.js';



class TinyDummy{
    constructor(options) {
        this._options = options;
        //
        this._tokenUser = undefined;
        this._tokenCompany = undefined;
    }

    set tokenUser(token) {
        this._tokenUser = token;
    }

    get tokenUser() {
      return this._tokenUser;
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
          'Authorization': `Bearer ${this._tokenCompany || this._tokenUser}`,
        },
      });

      const data = await response.json();

      if (data.error) {
        throw new Error(data.error.summary);
      }

      return data;
    }

      
    async companyGetToken(client_id, client_secret) {
      const response = await this.request('/auth/token', {
          'client_id':       client_id,
          'client_secret':   client_secret
      });

      // WARNING: Tokens don't appear to have an automatic expiry on them. You have to manually
      // remove them.

      return response.access_token;
  }

    async companyGetAll() {
        const response = await this.request('/company', {
            query: api.get_companies.loc.source.body
        });

        return response.data.companies;
    }


    // Users
    async userGetOTP(phoneNumber) {
      const response = await this.request('/auth/create_user_otp', {
          telephone_number:  phoneNumber.replace('+', '')
      });
  
      return response.access_token;
    }

    async userGetToken(phoneNumber, otp) {
      const response = await this.request('/auth/token', {
          telephone_number:  phoneNumber.replace('+', ''),
          otp_code: otp
      });
      return response.access_token;
    }

    async userGetSpamReports() {
      // console.log(api.get_spam_reports.loc.source.body)
      const response = await this.request('/user', {
          query: api.get_spam_reports.loc.source.body
      });

      return response.data.spamReports;
  }

}



export { TinyDummy };
