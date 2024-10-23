import { gql } from '@apollo/client/index.js';

export default gql`
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

