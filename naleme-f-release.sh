#!/bin/bash

echo '==============开始部署前端=============='

cd /home/naleme/film-search || exit 1

#git checkout master
#git checkout .
git pull
echo '==============git pull success=========='

sleep 1

docker-compose build
echo '==============镜像打包成功================'

docker-compose up -d
echo '==============容器部署成功================'

echo '==============run success================'
