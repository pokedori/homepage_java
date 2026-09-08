# Repository Instructions

## Test Execution

- Run tests inside the Docker container, not on the host.
- Prefer `docker compose exec python-dev` for test and verification commands.
- Example: `docker compose exec python-dev pytest`
- Example: `docker compose exec python-dev pytest tests/test_main.py`
- Use `/python-container` as the in-container working directory.
- If the container is not running, start it with `docker compose up -d python-dev` before running tests.
- Do not switch to host-side test execution unless the user explicitly asks for it.

## Python And Package Commands

- Run `python` commands inside the Docker container, not on the host.
- Inside the container, assume the project virtual environment has been activated with `. /python-container/.venv/bin/activate` before running `python`, `pip`, or related commands.
- Prefer `docker compose exec python-dev python ...` for Python execution.
- Example: `docker compose exec python-dev python main.py`
- Example: `docker compose exec python-dev python -m pytest`
- Example: `docker compose exec python-dev python -m app.module`
- Run `pip install` inside the Docker container, not on the host.
- Prefer `docker compose exec python-dev pip install ...` for package installation.
- Example: `docker compose exec python-dev pip install -r requirements.txt`
- Example: `docker compose exec python-dev pip install package-name`
- Do not install Python packages on the host unless the user explicitly asks for it.

## Project Context

- Main service for development and test execution: `python-dev`
- Compose file: `docker-compose.yml`
