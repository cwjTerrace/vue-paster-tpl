# {{ name }}

> {{ description }}

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

## docker dev

``` bash
# Build an image [promo/vuetpl] from a Dockerfile
docker build -t promo/vuetpl .

# attach image [promo/vuetpl] 并且 [-d] 启用守护进程
docker run -d -p 8090:8018 promo/vuetpl

# 运行并且进入交互式
docker run -t -i promo/vuetpl /bin/bash

# open
http://<host>:8090
```
