FROM python:3.7-alpine

RUN adduser -D app

WORKDIR /home

COPY requirements.txt requirements.txt
RUN python -m venv venv
RUN venv/bin/pip install -r requirements.txt
RUN venv/bin/pip install gunicorn

COPY app app

COPY main.py boot.sh ./
RUN chmod +x boot.sh

ENV FLASK_APP main.py
ENV FLASK_ENV production

RUN chown -R app:app ./
USER app

EXPOSE 5000
ENTRYPOINT ["./boot.sh"]
