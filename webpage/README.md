# Webpage
This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 11.2.1.

## Prerequists
add an environment.prod.ts with the Adress of the API

## Development server
Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Build
Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Deployment
@Windows
docker build ./webpage -t nginx-webpage --platform linux/arm/v7
docker save -o webpage-image.tar nginx-webpage
scp ./webpage-image.tar usr@<piip>:/home/usr

@Pi
sudo mv ~/webpage-image.tar /opt/docker
docker load -i webpage-image.tar
docker run --name nginx-webpage -d -p <piport>:80 nginx-webpage

