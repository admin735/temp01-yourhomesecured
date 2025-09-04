export const complianceConfig = {
  jornaya: {
    enabled: false, // Can be toggled per client
    campaignId: '', // Client-specific campaign ID
    accountId: '',  // Client-specific account ID
    scriptUrl: '//create.lidstatic.com/campaign/[CAMPAIGN_ID].js?snippet_version=2',
    noscriptUrl: '//create.leadid.com/noscript.gif?lac=[ACCOUNT_ID]&lck=[CAMPAIGN_ID]&snippet_version=2'
  },
  trustedForm: {
    enabled: false, // For future implementation
    accountId: '',
    // ... TrustedForm config
  }
};