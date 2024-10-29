import { gql } from '@apollo/client/index.js';

export default gql`
    query (
	$invitedUserId: ID
	$includedType: B2cConnectionType
	$excludedType: B2cConnectionType
	$limit: Int
  ) {
	pendingB2cConnectionRequests (
  	invitedUserId: $invitedUserId
  	includedType: $includedType
  	excludedType: $excludedType
  	limit: $limit
	) {
  	id
  	status
  	type
  	insertedAt
  	respondedAt
  	updatedAt
  	company {
    	id
  	}
  	user {
    	id
  	}
  	invitedUser {
    	id
  	}
	}
  }

`;

