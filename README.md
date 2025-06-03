# google-sheets-reminder-system
An api to take scheduled tasks from google spreadsheet and send there notifications
- make sure to include all env secrets in .env file
- make sure to have service-account.json file in root directory, download it from your google cloud console sheets api dashboard
- which looks something like this
```json
{
  "type": "service_account",
  "project_id": "<project id>",
  "private_key_id": "<private key>",
  "private_key": "actual private key",
  "client_email": "<your service account email>",
  "client_id": "<client id>",
  "auth_uri": "https://accounts.google.com/o/oauth2/auth",
  "token_uri": "https://oauth2.googleapis.com/token",
  "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
  "client_x509_cert_url": "<client certificate link>",
  "universe_domain": "googleapis.com"
}

```
- make sure the ownership of spreadsheet is of service account mail created in project, or your personal sheet is shared with that service account mail
- make sure the first tasks in sheet are atleast 5 minutes ahead of current time when service is started, or else tasks notification might miss