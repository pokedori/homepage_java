# homepage

## Environment Variables

- `python-container/.env` is the development env file for the Python app.
- `react-container/.env` is the development env file for the React app.
- These env files are for the applications themselves, not for `docker-compose.yml`.

## Python Execution

- When running Python commands in the development container, first activate the project virtual environment with `. /python-container/.venv/bin/activate`.
- Assume `python`, `pip`, and other Python-related commands are run after activating `/python-container/.venv`.

## Production Deploy Note

- Before deploying to production, replace the development values in `python-container/.env` and `react-container/.env` with production values.
- After changing the env files, redeploy or restart the application so the new values are loaded.
- For the React app, if you are deploying a production build, rebuild the app after updating `react-container/.env`.
