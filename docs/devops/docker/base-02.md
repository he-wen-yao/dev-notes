## FROM

**描述：** 定制的镜像都是基于 FROM 的镜像，比如 `FROM nginx` 这里的 nginx 就是定制需要的基础镜像，后续的操作都是基于 nginx。

## LABEL

**描述：** LABEL 指令用来给镜像添加一些元数据（metadata），以键值对的形式，语法格式如下： **格式：**

```shell
LABEL <key>=<value> <key>=<value> <key>=<value> ...
```

**实例：**

比如我们可以添加镜像的作者

```shell
LABEL authors="he.wenyao" 
```

## MAINTAINER

不在推荐使用，使用 LABEL 设置镜像信息

## RUN

**描述：** 构建镜像执行的命令，每一次RUN都会构建一层

**格式：** 

1. **shell 格式**
   
   ```shell
   RUN <命令行命令>
   # <命令行命令> 等同于，在终端操作的 shell 命令。
   ```

2. **exec 格式**
   
   ```shell
   RUN ["可执行文件", "参数1", "参数2"]
   # 例如 ：
   # RUN ["./main.go", "dev", "offline"] 等价于 RUN ./main.go dev offline
   ```

## CMD

**描述：** 类似于 RUN 指令，用于运行程序，但二者运行的时间点不同:

- CMD 在 `docker run` 时运行。

- RUN 在 `docker build`。

为启动的容器指定默认要运行的程序，程序运行结束，容器也就结束。`CMD` 指令指定的程序可被 `docker run` 命令行参数中指定要运行的程序所覆盖。

**注意：** 如果 Dockerfile 中如果存在多个 CMD 指令，仅最后一个生效。

**格式：**

1. **shell 命令**
   
   ```shell
   CMD <shell 命令> 
   ```

2. **exec 格式 （一）**
   
   ```shell
   CMD ["<可执行文件或命令>","<param1>","<param2>",...
   ```

3. **exec 格式（二）** 
   
   ```shell
   CMD ["<可执行文件或命令>","<param1>","<param2>",...]  # 该写法是为 ENTRYPOINT 指令指定的程序提供默认参数
   ```

**推荐使用第二种格式**，执行过程比较明确。第一种格式实际上在运行的过程中也会自动转换成第二种格式运行，并且默认可执行文件是 sh。

## ENTRYPOINT

**描述：** 类似于 `CMD` 指令，但其不会被 `docker run` 的命令行参数指定的指令所覆盖，而且这些命令行参数会被当作参数送给 `ENTRYPOINT` 指令指定的程序。但是, 如果运行 `docker run` 时使用了 `--entrypoint`选项，将覆盖 `ENTRYPOINT`指令指定的程序。

**优点：** 在执行 `docker run` 的时候可以指定 `ENTRYPOINT` 运行所需的参数。

**注意：** 如果 `Dockerfile`中如果存在多个 `ENTRYPOINT`指令，仅最后一个生效。

**格式：**

```shell
ENTRYPOINT ["<executeable>","<param1>","<param2>",...]
```

可以搭配 CMD 命令使用：一般是变参才会使用 CMD ，这里的 CMD 等于是在给 ENTRYPOINT 传参，以下示例会提到。

**示例：**

假设已通过 Dockerfile 构建了 nginx:test 镜像：

```shell
FROM nginx
ENTRYPOINT ["nginx", "-c"] # 定参
CMD ["/etc/nginx/nginx.conf"] # 变参
```

1. 不传参运行
   
   ```shell
   docker run nginx:test
   # 容器内会默认运行以下命令，启动主进程。
   # nginx -c /etc/nginx/nginx.conf
   ```

2. 传参运行
   
   ```shell
    docker run  nginx:test -c /etc/nginx/new.conf
   # 容器内会默认运行以下命令，启动主进程(/etc/nginx/new.conf:假设容器内已有此文件)
   # nginx -c /etc/nginx/new.conf
   ```

## COPY

**描述：** 复制指令，从上下文目录中复制文件或者目录到容器里指定路径。

**格式：**

```shell
COPY [--chown=<user>:<group>] <源路径1>...  <目标路径>
COPY [--chown=<user>:<group>] ["<源路径1>",...  "<目标路径>"]
```

**参数：** 

1.  [--chown=< user >:< group >]：可选参数，用户改变复制到容器内文件的拥有者和属组。

2. **<源路径>**：源文件或者源目录，这里可以是通配符表达式，其通配符规则要满足 Go 的 filepath.Match 规则。例如：
   
   ```shell
   COPY hom* /mydir/
   COPY hom?.txt /mydir/
   ```

  3. **<目标路径>**：容器内的指定路径，该路径不用事先建好，路径不存在的话，会自动创建。

## ADD

**描述：** ADD 指令和 COPY 的使用格类似（同样需求下，官方推荐使用 COPY）。功能也类似，不同之处如下：

- ADD 的优点：在执行 <源文件> 为 tar 压缩文件的话，压缩格式为 gzip, bzip2 以及 xz 的情况下，会自动复制并解压到 <目标路径>。

- ADD 的缺点：在不解压的前提下，无法复制 tar 压缩文件。会令镜像构建缓存失效，从而可能会令镜像构建变得比较缓慢。具体是否使用，可以根据是否需要自动解压来决定

## ENV

**描述：** 设置环境变量，定义了环境变量，那么在后续的指令中，就可以使用这个环境变量。

**格式：**

```shell
ENV <key> <value>
ENV <key1>=<value1> <key2>=<value2>...
```

以下示例设置 NODE_VERSION = 7.2.0 ，在后续的指令中可以通过 $NODE_VERSION 引用：

```shell
ENV NODE_VERSION 7.2.0

RUN curl -SLO "https://nodejs.org/dist/v$NODE_VERSION/node-v$NODE_VERSION-linux-x64.tar.xz" \
 && curl -SLO "https://nodejs.org/dist/v$NODE_VERSION/SHASUMS256.txt.asc"
```

## ARG

**描述：** 构建参数，与 ENV 作用一致。不过作用域不一样。ARG 设置的环境变量仅对 Dockerfile 内有效，也就是说只有 docker build 的过程中有效，构建好的镜像内不存在此环境变量。构建命令`docker build` 中可以用 `--build-arg <参数名>=<值>`来覆盖。

**格式：**

```shell
ARG <参数名>[=<默认值>]
```

## VOLUME

**描述：** 定义匿名数据卷。在启动容器时忘记挂载数据卷，会自动挂载到匿名卷。

**作用：**

避免重要的数据，因容器重启而丢失，这是非常致命的。
避免容器不断变大。
**格式：**

```shell
VOLUME ["<路径1>", "<路径2>"...]
VOLUME <路径>
```

在启动容器 `docker run` 的时候，我们可以通过 `-v` 参数修改挂载点。

## EXPOSE

**描述：** 仅仅只是声明端口。帮助镜像使用者理解这个镜像服务的守护端口，以方便配置映射。在运行时使用随机端口映射时，也就是 docker run -P 时，会自动随机映射 EXPOSE 的端口。
**格式：**

```shell
EXPOSE <端口1> [<端口2>...]
```

## WORKDIR

**描述：** 指定工作目录。用 WORKDIR 指定的工作目录，会在构建镜像的每一层中都存在。（ `WORKDIR`指定的工作目录，必须是提前创建好的）。`docker build` 构建镜像过程中的，每一个 RUN 命令都是新建的一层。只有通过 `WORKDIR`创建的目录才会一直存在。

**格式：**

```shell
WORKDIR <工作目录路径>
```

## USER

**描述：** 用于指定执行后续命令的用户和用户组，这边只是切换后续命令执行的用户（用户和用户组必须提前已经存在）。

**格式：**

```shell
USER <用户名>[:<用户组>]
```

## HEALTHCHECK

**描述：** 用于指定某个程序或者指令来监控 docker 容器服务的运行状态。

**格式：**

```shell
HEALTHCHECK [选项] CMD <命令>：设置检查容器健康状况的命令
HEALTHCHECK NONE：如果基础镜像有健康检查指令，使用这行可以屏蔽掉其健康检查指令
HEALTHCHECK [选项] CMD <命令> : 这边 CMD 后面跟随的命令使用，可以参考 CMD 的用法。
```

## ONBUILD

**描述：** 用于延迟构建命令的执行。简单的说，就是 Dockerfile 里用 ONBUILD 指定的命令，在本次构建镜像的过程中不会执行（假设镜像为 test-build）。当有新的 Dockerfile 使用了之前构建的镜像 FROM test-build ，这时执行新镜像的 Dockerfile 构建时候，会执行 test-build 的 Dockerfile 里的 ONBUILD 指定的命令。

**格式：**

```shell
ONBUILD <其它指令>
```