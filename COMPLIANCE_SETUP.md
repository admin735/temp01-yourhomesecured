# Compliance Setup Guide

## Overview
This framework includes built-in support for Jornaya LeadiD and TrustedForm compliance services. Both services are optional and can be enabled/disabled independently.

## Jornaya LeadiD Setup

### 1. Create Account
- Sign up at [jornaya.com](https://jornaya.com)
- Complete account verification
- Create a new campaign for your website

### 2. Get Your Credentials
- **Campaign ID**: Found in your Jornaya dashboard under "Campaigns"
- **Account ID**: Found in your account settings

### 3. Update Configuration
Edit `src/config/compliance.config.ts`:

```typescript
jornaya: {
  enabled: true,
  campaignId: 'YOUR_CAMPAIGN_ID_HERE',
  accountId: 'YOUR_ACCOUNT_ID_HERE',
  fieldName: 'universal_leadid'
}
```

### 4. Database Field
Ensure your lead submission endpoint accepts a field named `universal_leadid` (or update `fieldName` to match your database).

## TrustedForm Setup

### 1. Create Account
- Sign up at [trustedform.com](https://trustedform.com)
- Complete account verification

### 2. Domain Verification
- Add and verify your website domain in TrustedForm dashboard
- This is required for certificate generation

### 3. Configuration
TrustedForm is pre-configured and ready to use:

```typescript
trustedForm: {
  enabled: true,
  fieldName: 'xxTrustedFormCertUrl',
  invertFieldSensitivity: false
}
```

### 4. Database Field
Ensure your lead submission endpoint accepts a field named `xxTrustedFormCertUrl`.

## How It Works

### Script Loading
- **TrustedForm**: Loads when user reaches the contact form
- **Jornaya**: Loads when user reaches the contact form
- Both load in parallel for optimal performance

### Data Capture
- **Jornaya**: Captures LeadiD token from hidden input field
- **TrustedForm**: Captures certificate URL from hidden input field
- Both are automatically included in form submissions

### Form Submission
The final payload includes compliance data:

```json
{
  "session_id": "session_123...",
  "quiz_answers": {...},
  "lead": {...},
  "leadid_token": "jornaya_token_here",
  "xxTrustedFormCertUrl": "https://cert.trustedform.com/...",
  "metadata": {...}
}
```

## Troubleshooting

### Jornaya Issues
1. **No LeadiD captured**: Check campaign ID and account ID are correct
2. **Script not loading**: Verify domain is approved in Jornaya dashboard
3. **Field not found**: Ensure hidden input with ID `leadid_token` exists

### TrustedForm Issues
1. **No certificate**: Verify domain is verified in TrustedForm dashboard
2. **Certificate empty**: Check that form is on verified domain
3. **Script errors**: Ensure no ad blockers are interfering

### Debug Mode
Enable debug logging by setting `VITE_DEBUG_MODE=true` in your `.env` file:

```bash
VITE_DEBUG_MODE=true
```

This will show detailed console logs for compliance script loading and data capture.

## Disabling Compliance

To disable either service, set `enabled: false` in the config:

```typescript
// Disable Jornaya
jornaya: {
  enabled: false,
  // ... other settings
}

// Disable TrustedForm  
trustedForm: {
  enabled: false,
  // ... other settings
}
```

## Production Checklist

- [ ] Jornaya campaign ID and account ID configured
- [ ] TrustedForm domain verified
- [ ] Database fields created for compliance data
- [ ] Test form submissions include compliance data
- [ ] Debug mode disabled (`VITE_DEBUG_MODE=false`)

## Support

For compliance service specific issues:
- **Jornaya**: Contact Jornaya support
- **TrustedForm**: Contact TrustedForm support
- **Framework**: Check debug logs and verify configuration