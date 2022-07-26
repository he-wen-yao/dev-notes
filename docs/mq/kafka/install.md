## Kafka 安装

### 使用 Docker 安装 Kafka

#### 下载镜像

```shell
docker pull wurstmeister/zookeeper # 下载 zookeeper 
docker pull wurstmeister/kafka # 下载 kafka
```

#### docker 创建 network : kanet，用作 zookeeper 与 docker 通信

```shell
docker network create kanet
```

#### 启动 zookeeper 镜像

```shell
# docker 启动参数说明: -d:后台启动,--restart=always:如果挂了总是会重启,--name:设置容器名
# -p: 设置宿主机与容器之间的端口映射,例如:9902:9092,表示将容器中9092端口映射到宿主机的9902端口,当有请求访问宿主机的9902端口时,会被转发到容器内部的9092端口.
# -v:设置宿主机与容器之间的路径或文件映射,例如: /data/docker/zoo/data:/data,表示将容器内部的路径 /data 目录映射到宿主机的 /data/docker/zoo/data 目录,可以方便的从宿主机 /data/docker/zoo/data 就能访问到容器内的目录
# 一般数据文件夹,配置文件均可如此配置,便于管理和数据持久化
# wurstmeister/zookeeper 表示使用docker镜像名称为 wurstmeister/zookeeper

mkdir -p /data/docker/zoo/data
mkdir -p /etc/docker/zoo/conf


docker stop zookeeper
docker rm zookeeper
docker run -d --restart=always --name zookeeper -p 2181:2181 --network kanet --network-alias zookeepernet \
-v /data/docker/zoo/data:/data -v /etc/docker/zoo/conf:/conf wurstmeister/zookeeper
```

#### 启动 kafka

```shell
mkdir -p /data/docker/kafka/data
mkdir -p /etc/docker/kafka/conf

-v /data/docker/kafka/data:/data \
-v /etc/docker/kafka/conf:/conf \
#docker 启动参数说明: -d:后台启动,--restart=always:如果挂了总是会重启,--name:设置容器名
# -p: 设置宿主机与容器之间的端口映射,例如:9902:9092,表示将容器中9092端口映射到宿主机的9902端口,当有请求访问宿主机的9902端口时,会被转发到容器内部的9092端口.
# -v:设置宿主机与容器之间的路径或文件映射,例如: /data/docker/kafka/data:/data,表示将容器内部的路径 /data 目录映射到宿主机的 /data/docker/kafka/data 目录,可以方便的从宿主机 /data/docker/kafka/data 就能访问到容器内的目录.
# 一般数据文件夹,配置文件均可如此配置,便于管理和数据持久化
# -e 设置环境变量参数,例如-e KAFKA_BROKER_ID=1,表示将该环境变量设置到容器的环境变量中,容器在启动时会读取该环境变量,并替换掉容器中配置文件的对应默认配置(server.properties文件中的 broker.id=1)
# kafka:latest 表示使用docker镜像名称为kafka,并且版本为latest的镜像来启动

docker stop kafka-node-1
docker rm kafka-node-1

docker run -d --restart=always --name kafka-node-1 \
--network kanet --network-alias zookeepernet \
-p 9092:9092 \
-e KAFKA_BROKER_ID=1 \
-e KAFKA_ZOOKEEPER_CONNECT=zookeepernet:2181 \
-e KAFKA_DEFAULT_REPLICATION_FACTOR=3 \
-e KAFKA_LOG_RETENTION_HOURS=72 \
-e KAFKA_ADVERTISED_LISTENERS=PLAINTEXT://zookeepernet:9092 \
-e KAFKA_LISTENERS=PLAINTEXT://0.0.0.0:9092 \
wurstmeister/kafka
```

#### 进入 kafka 容器进行测试

##### 创建 topic

```shell
# 进入容器内部
docker exec -it kafka-node-1 /bin/bash
# 进入 kafka bin 目录 
cd /opt/kafka_2.13-2.8.1/bin

# 创建名字为 kafkatest 的主题
$ bin/kafka-topics.sh --create --bootstrap-server localhost:9092 --replication-factor 1 --partitions 1 --topic kafkatest
```

##### 向 topic 发送消息

```shell
# 添加消息
bin/kafka-console-producer.sh --broker-list localhost:9092 --topic kafkatest
> 你好
```

##### 从 topic 消费消息

```shell
# 消费消息
kafka-console-consumer.sh --bootstrap-server --topic kafkatest --from-beginningt
你好
```

::: tip

如果你打开了两个窗口，分别执行发送和消费消息的命令，那么就可以在发送完毕就能看见消息消费。

:::

## 

## Kafka Kraft 模式安装

> Kafka在使用的过程当中，会出现一些问题。由于重度依赖Zookeeper集群，当Zookeeper集群性能发生抖动时，Kafka的性能也会收到很大的影响。因此，在Kafka发展的过程当中，为了解决这个问题，提供KRaft模式，来取消Kafka对Zookeeper的依赖。

### Docker 安装 Kafka （Kraft）

```shell
docker search kafka # 查找镜像，选择第一个 bitnami/kafka

docker pull bitnami/kafka # 拉取镜像

docker run -d --name kafka-server  \
-e KAFKA_ENABLE_KRAFT=yes \
-e ALLOW_PLAINTEXT_LISTENER=TRUE \
-e KAFKA_CFG_BROKER_ID=1 \
-e KAFKA_CFG_CONTROLLER_QUORUM_VOTERS=1@localhost:9093 \
-e KAFKA_CFG_PROCESS_ROLES=broker,controller \
-e KAFKA_CFG_CONTROLLER_LISTENER_NAMES=CONTROLLER \
-e KAFKA_CFG_INTER_BROKER_LISTENER_NAME=PLAINTEXT \
-e KAFKA_CFG_LISTENERS=PLAINTEXT://0.0.0.0:9092,CONTROLLER://0.0.0.0:9093 \
-e KAFKA_CFG_ADVERTISED_LISTENERS=PLAINTEXT://localhost:9092
-e KAFKA_CFG_LISTENER_SECURITY_PROTOCOL_MAP=CONTROLLER:PLAINTEXT,PLAINTEXT:PLAINTEXT \
-p 9092:9092 -p 9093:9093 bitnami/kafka # 运行镜像
```

### 测试是否安装成功

```shell
docker ps -a # 查看正在运行的容器，发现 kafka-server 正常运行，如果容器挂掉需要 docker logs -f kafka-server 查看报错日志
docker exec -it kafka-server /bin/bash # 进入容器内部
cd /opt/bitnami/kafka/bin
> kafka-topics.sh --bootstrap-server localhost:9092 --create --topic testtopic # 创建一个主题
> Created topic testtopic.
> kafka-topics.sh --bootstrap-server localhost:9092 --list # 查看主题
> testtopic
```

## kafka 可视化

#### 下载镜像

```shell
docker pull sheepkiller/kafka-manager
```

#### 启动 kafka-manager

```shell
docker run -d --name kafka-manager -p 9000:9000 \
--network kanet --network-alias kmanager \
--env ZK_HOSTS=zookeepernet:2181  \
sheepkiller/kafka-manager
```

#### 访问 kafka-manger

```
ip + 9000 即可访问
```
