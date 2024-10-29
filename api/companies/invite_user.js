import { gql } from '@apollo/client/index.js';

export default gql`
    query (
	$includedType: B2cConnectionType
	$excludedType: B2cConnectionType
	$limit: Int
  ) {
	b2cConnections (
  	includedType: $includedType
  	excludedType: $excludedType
  	limit: $limit
	) {
  	id
  	type
  	insertedAt
  	updatedAt
  	startedAt
  	company {
    	id
  	}
  	connectedUser {
    	id
  	}
	}
  }

`;

