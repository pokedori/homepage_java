#
# develop
# 初期の起動として確認用のapp.py、Djangoでは利用しないなー
# docker compose exec python-dev python app.pyで動く、動作確認してな
# パスで、最初に.venv内を見るようにしているので、.venvのpythonを使うようにしている
# . /python-container/.venv/bin/activateで、.vnevが起動出来る。
import os
from pathlib import Path

from dotenv import load_dotenv

load_dotenv(Path(__file__).with_name(".env"))

app_name = os.getenv("APP_NAME", "test-python")
app_env = os.getenv("APP_ENV", "development")

print(f"{app_name} is ready! environment={app_env}")
