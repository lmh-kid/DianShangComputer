#!/bin/bash
set -x
# 进入指定目录
cd ~/release/DianShangComputer

# 更新代码
git fetch --all && git reset --hard origin/main

# 更新与构建项目
# yarn install
# yarn build

# 构建 Docker 镜像
tag=$(date "+%Y%m%d%H%M")
docker build -f Dockerfile -t ds-computer:$tag .

# 删除旧容器并启动新容器
docker stop ds-computer && sudo docker rm ds-computer
docker run -p 86:86 -d --name ds-computer ds-computer:$tag