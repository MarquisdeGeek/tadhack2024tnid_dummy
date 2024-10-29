import get_companies from './companies/get.js';
import get_spam_reports from './users/get_spam_reports.js';


const api = {
    // Company-oriented queries
    get_companies,

    // User-oriented queries
    get_spam_reports
};

export { api };
