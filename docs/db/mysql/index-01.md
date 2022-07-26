## 什么是索引？

在我们学习某一项技术想深入了解其配置时，翻阅技术文档时我们肯定不是一页一页去找配置相关的内容，我们肯定优先寻找目录中和配置相关的目录，然后根据目录指示的页码在去查看配置相关的内容。文档中的目录，就是一个索引，方便我们快速查找文档的内容，索引是以空间换时间的思想。

在 MySQL 数据库中，索引的定义就是帮助**存储引擎**快速获取数据的一种数据结构，形象的说就是索引是数据的目录。**存储引擎** 说白了就是一个具体解决如何存储、更新、查询、删除数据等技术的解决方案。MySql的核心就是插件式存储引擎。

MySQL 存储引擎有 MyISAM 、InnoDB、Memory，其中 InnoDB 是在 MySQL 5.5 之后成为默认的存储引擎，`SHOW ENGINES;` 这个命令可以查看 MySQL **存储引擎**。

## 索引的分类

### 按「数据结构」分类：

  B+tree索引、Hash索引、Full-text索引。常用存储引擎支持情况如下表：

    

|             | InnoDB       | MyISAM | Memory |
|:-----------:|:------------:|:------:|:------:|
| B+tree索引    | √            | √      | √      |
| Hash索引      | ×            | ×      | √      |
| Full-text索引 | √（MySQL5.6+） | √      | ×      |

> 注：InnoDB实际上也支持Hash索引，但是InnoDB中Hash索引的创建由存储引擎引擎自动优化创建，不能人为干预是否为表创建Hash索引

### 按「物理存储」分类：

  聚簇索引（主键索引）、二级索引（辅助索引）。



- 按「字段特性」分类：

  主键索引、唯一索引、普通索引、前缀索引。

- 按「字段个数」分类：

  单列索引、联合索引 （复合索引、组合索引）。
