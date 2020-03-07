# Flask-App

## Requirements:
### development:
- Python3
- Flask
### production:
- Docker
- docker-compose

## Description: 
basic Flask app with setup for docker with docker-compose. It uses for production gunicorn with nginx as a reverse proxy. nginx also serves static files (js/css) in `app/static`.

## Scripts:
### development:

### - Server:

- set/export FLASK_APP=main.py
- set/export FLASK_ENV=development
- `flask run`

- powershell:
`$Env:FLASK_APP="main.py"`
`$Env:FLASK_ENV="development"`

ModuleNotFoundError: No module named 'tensorflow_core.keras'

FLASK_DEBUG = 0

### - Client:
- npm run watch

### production:
- docker-compose up

