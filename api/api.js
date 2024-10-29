import get_companies from './companies/get.js';
import companies_list_connections from './companies/list_connections.js';
import companies_list_connections_pending from './companies/list_connections_pending.js';
import companies_invite_user from './companies/invite_user.js';
//
import get_spam_reports from './users/get_spam_reports.js';


const api = {
    // Company-oriented queries
    get_companies,
    companies_list_connections,
    companies_list_connections_pending,
    companies_invite_user,

    // User-oriented queries
    get_spam_reports
};

export { api };
