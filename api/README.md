# Qover API

## Development

The service expects a Mongo database to be up and running.
The easiest option is to start a container with Docker as seen below:

```bash
docker run --rm --detach \
  --name database \
  -e MONGO_INITDB_ROOT_USERNAME=usr \
  -e MONGO_INITDB_ROOT_PASSWORD=P4ssw0rd! \
  -e MONGO_INITDB_DATABASE=qover \
  -p 27017:27017 \
  mongo:5.0
```
