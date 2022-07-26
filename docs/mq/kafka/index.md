## Kafka 简介

**Kafka 传统定义**：Kafka是一个分布式的 **基于发布/订阅模式的消息队列**（Message Queue），主要应用于大数据实时处理领域。

**Kafka 最新定义** ： Kafka是 一个开源的 **分布式事件流平台**（Event Streaming Platform），被数千家公司用于高性能数据管道、流分析、数据集成和关键任务应用。

## Kafka 特性

1. 高吞吐量、低延迟：每秒处理几十万消息，延迟最低只有几毫秒，每个主题可以分区，消费组对分区进行消费。

2. 可扩展性：kafka集群支持热扩展。

3. 持久性、可靠性：信息可以持久化到磁盘，且支持消息备份防止信息丢失。

4. 容错性：允许集群中节点失败（若副本数为n,可以允许n-1个节点失败）。

5. 高并发：支持数千个客户端同时读写。

## Kafka 可以做什么

1. 存储系统（日志收集、用户行为、运营指标）

2. 消息系统

3. 流式处理平台

## Kafka 相关概念

1. **Broker**：一台 Kafka 机器就是一个 Broker。一个集群是由多个 Broker 组成的且一个 Broker 可以容纳多个 Topic。

2. **Topic**：Kafka将消息分门别类，每一类的消息称之为一个主题，可以简单理解为队列，生产者和消费者面向的都是同一个 Topic。。

3. **Producer**：即消息生产者，向 Kafka Broker 发消息的客户端。

4. **Consumer**：即消息消费者，从 Kafka Broker 读消息的客户端。

5. **Consumer Group （CG）**： 消费者组，由多个 consumer 组成。 消费者组内每个消费者负责消费不同分区的数据，一个分区只能由一个组内消费者消费；消费者组之间互不影响。 所有的消费者都属于某个消费者组，即消费者组是逻辑上的一个订阅者。

6. **Partition**： 为了实现扩展性，一个非常大的 topic 可以分布到多个 broker（即服务器）上，一个 topic 可以分为多个 partition，每个 partition 是一个有序的队列。

7. **Replica**： 副本（Replication），为保证集群中的某个节点发生故障时， 该节点上的 partition 数据不丢失，且 Kafka 仍然能够继续工作， Kafka 提供了副本机制，一个 topic 的每个分区都有若干个副本，一个 leader 和若干个 follower。

8. **Leader**： 每个分区多个副本的 “主”，生产者发送数据的对象，以及消费者消费数据的对象都是 leader。

9. **Follower**： 每个分区多个副本中的 “从”，实时从 leader 中同步数据，保持和 leader 数据的同步。 leader 发生故障时，某个 Follower 会成为新的 leader。

10. **Offset**：消费者消费的位置信息，监控数据消费到什么位置，当消费者挂掉再重新恢复的时候，可以从消费位置继续消费。
11. **ZooKeeper服务**：Kafka 集群能够正常工作，需要依赖于 ZooKeeper，ZooKeeper 帮助 Kafka 存储和管理集群元数据信息。在最新版本中, 已经慢慢要脱离 ZooKeeper。
## Kafka 为何这么快

Kafka 实现了`零拷贝`能够来快速移动数据，避免了内核之间的切换。Kafka 可以将数据记录分批发送，从生产者到文件系统（Kafka 主题日志）到消费者，可以端到端的查看这些批次的数据。批处理能够进行更有效的数据压缩并减少 I/O 延迟，Kafka 采取顺序写入磁盘的方式，避免了随机磁盘寻址的浪费。总结一下其实就是四个要点：

- 顺序读写
- 零拷贝
- 消息压缩
- 分批发送
