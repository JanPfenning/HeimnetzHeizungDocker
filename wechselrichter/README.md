## Prerequists

replace .env.example with a .env with correct values

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start
```

## License
Nest is [MIT licensed](LICENSE).

## Deploy
@Windows
```bash
docker build ./wechselrichter -t nestjs-api --platform linux/arm/v7
docker save -o nestjs-image.tar nestjs-api
scp ./nestjs-image.tar usr@<piip>:/home/usr
```

@Pi
```bash
sudo mv ~/nestjs-image.tar /opt/docker
docker load -i nestjs-image.tar
docker run --name nestjs-api -d -p <piport>:3000 nestjs-api
```

# Further Implementation to be done in the future

## Temperature Sensor
The ESP should send its data periodically to the MQTT Broker
## MQTT
The Broker for life Temperature should be running in a docker container.
## Database
Database should be a mariadb running in a docker container.
https://hub.docker.com/_/mariadb; 
https://mariadb.com/kb/en/nodejs-connection-options/
