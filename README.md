# homepage

## Environment Variables

- `react-container/.env` is the development env file for the React app.
- These env files are for the applications themselves, not for `docker-compose.yml`.

## Production Deploy Note

- Before deploying to production, replace the development values in `react-container/.env` with production values.
- After changing the env files, redeploy or restart the application so the new values are loaded.
- For the React app, if you are deploying a production build, rebuild the app after updating `react-container/.env`.
