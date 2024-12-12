#!/bin/bash
set -x
# 进入指定目录
cd /root/code/douyu-barrage-analysis-web

# 更新代码
git fetch --all && git reset --hard origin/main

# 更新与构建项目
# yarn install
# yarn build

# 构建 Docker 镜像
tag=$(date "+%Y%m%d%H%M")
docker build -f Dockerfile -t douyu-web:$tag .

# 删除旧容器并启动新容器
docker stop douyu-web && sudo docker rm douyu-web
docker run -p 80:80 -d --name douyu-web douyu-web:$tag