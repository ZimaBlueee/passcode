#!/bin/bash

echo '==============开始部署前端=============='

cd /home/naleme/film-search || exit 1

#git checkout master
#git checkout .
echo '==============开始拉取最新代码==========='
git pull --rebase
echo '==============拉取最新代码成功=========='

sleep 1

echo '==============开始打包镜像================'
docker-compose build
echo '==============镜像打包成功================'

echo '==============开始部署容器================'
docker-compose up -d
echo '==============容器部署成功================'

echo '==============前端发布成功!================'
