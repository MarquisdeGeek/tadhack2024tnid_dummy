import { gql } from '@apollo/client/index.js';

export default gql`
query (
	$channelType: SpamReportChannelType
	$issueType: SpamReportIssueType
	$includedStatus: SpamReportStatus
	$excludedStatus: SpamReportStatus
	$limit: Int
  ) {
	spamReports (
  	channelType: $channelType
  	issueType: $issueType
  	includedStatus: $includedStatus
  	excludedStatus: $excludedStatus
  	limit: $limit
	) {
  	id
  	fromNumber
  	toNumber
  	userNote
  	messageContent
  	channelType
  	issueType
  	status
  	createdAt
  	updatedAt
  	timestamp
  	metadata
  	user {
    	id
  	}
	}
  }
`;

