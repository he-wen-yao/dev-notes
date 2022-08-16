const baidu_code = "4d4d50fd2441860647e18fcec2f2067a"

export default {
  title: '开发笔记',
  description: '记录工作学习中遇到的技术问题',
  head: [
    // 改变title的图标
    [
      'link', { rel: 'icon', href: '/favicon.ico', },
    ],
    [
      'link', { rel: 'stylesheet', href: '/main.css', },
    ],
    [
      'script', { src: 'https://hm.baidu.com/hm.js?' + baidu_code }
    ]
  ],
  themeConfig: {
    nav: [
      {
        text: '首页', link: '/', activeMatch: ''
      },
      {
        text: 'Nginx', link: '/nginx/', activeMatch: '/nginx'
      },
      {
        text: 'Elastic-Stack',
        items: [
          { text: 'ElasticSearch', link: '/elk/es/', activeMatch: '/elk/es/' },
          { text: 'Kibanna', link: '/elk/kibana/', activeMatch: '/elk/kibana/' },
          { text: 'Filebeat', link: '/elk/filebeat/', activeMatch: '/elk/filebeat/'}
        ]
      },
      {
        text: '数据库',
        items: [
          { text: 'Redis', link: '/db/redis/', activeMatch: '/db' },
          { text: 'MySQL', link: '/db/mysql/index-01', activeMatch: '/db' }
        ]
      },
      {
        text: '消息队列',
        items: [
          { text: 'Kafka', link: '/mq/kafka/', activeMatch: '/mq/kafka/' }
        ]
      },
      {
        text: '分布式系统',
        items: [
          { text: '分布式协议与算法', link: '/components/about/raft', activeMatch: '/components/about/' },
          { text: 'zookeeper', link: '/components/zookeeper/', activeMatch: '/components/zookeeper/' }
        ]
      },
      {
        text: 'DevOps相关技术',
        items: [
          { text: 'Docker', link: '/devops/docker/', activeMatch: '/devops/docker/' }
        ]
      }
    ],
    sidebar: {
      'devops/docker': [
        {
          text: 'Docker 基础',
          collapsible: true,
          items: [
            { text: 'Docker - 初识与安装部署', link: '/devops/docker/' },
            { text: 'Docker - 基础-仓库、镜像、容器', link: '/devops/docker/base-01' },
            { text: 'Docker - Dockerfile 命令详解', link: '/devops/docker/base-02' },
          ]
        },
      ],
      'components/zookeeper': [
        {
          text: 'ZooKeeper 入门',
          collapsible: true,
          items: [
            { text: 'ZooKeeper 初识', link: '/components/zookeeper/' },
            { text: 'ZooKeeper 安装部署', link: '/components/zookeeper/install' }
          ]
        },
        {
          text: 'ZooKeeper 代码实战',
          collapsible: true,
          items: [
            { text: 'ZooKeeper 增删改查', link: '/components/zookeeper/code/crud' },
            { text: 'ZooKeeper 权限管理', link: '/components/zookeeper/code/permissions' },
            // { text: 'ZooKeeper Watch机制', link: '/components/zookeeper/code/watch' }
          ]
        }
      ],
      'mq/kafka': [
        {
          text: 'Kafka 安装部署',
          collapsible: true,
          items: [
            { text: '初识 Kafka', link: '/mq/kafka/' },
            { text: '常见用法', link: '/mq/kafka/use-cases' },
            { text: 'Kafka 安装部署', link: '/mq/kafka/install' },
            { text: 'Kafka 常用命令', link: '/mq/kafka/command' }
          ]
        }
      ],
      'nginx': [
        {
          text: 'Nginx实战',
          collapsible: true,
          items: [
            { text: 'Nginx 配置 https', link: '/nginx/' }
          ]
        }
      ],
      'elk/es': [
        {
          text: 'ES 相关部署',
          collapsible: true,
          items: [
            { text: 'ES 部署', link: '/elk/es/' }
          ]
        },
        {
          text: 'ES 进阶调优',
          collapsible: true,
          items: [
            { text: 'reindex', link: '/elk/es/reindex', },
            { text: '数据迁移/导入速度优化', link: '/elk/es/data-transfer', }
          ]
        }
      ],
      'elk/kibana': [
        {
          text: 'Kibana 相关部署',
          link: '/elk/kibana/'
        },
      ],
      'elk/filebeat': [
        {
          text: 'filebeat 介绍',
          link: '/elk/filebeat/'
        }
      ],
      'db/redis': [
        {
          text: 'redis 基础',
          collapsible: true,
          items: [
            { text: 'redis 配置文件', link: '/db/redis/config' }
          ]
        },
        {
          text: 'redis 进阶',
          collapsible: true,
          items: [
            { text: 'redis 进阶之排行榜实现', link: '/db/redis/' }
          ]
        }
      ],
      'db/mysql': [
        {
          text: 'MySQL 索引相关',
          collapsible: true,
          items: [
            { text: '索引初步了解', link: '/db//mysql/index-01' }
          ]
        }
      ],
      '/components/about': [
        {
          text: '分布式算法',
          collapsible: true,
          items: [
            { text: 'raft 算法', link: '/components/about/raft' }
          ]
        }
      ]

    },
    footer: {
      copyright: 'Copyright © 2021-present he.weneyao'
    }
  },
  markdown: {
    theme: 'material-palenight',
    lineNumbers: true
  }
}
