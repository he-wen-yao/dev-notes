## ngx_http_log_module 模块

`ngx_http_log_module` 模块按指定的格式记录访问日志。请求在处理结束时，会按请求路径的配置上下文记录访问日志。通过访问日志，你可以得到用户地域来源、跳转来源、使用终端、某个URL访问量等相关信息。你也可以记录错误日志，通过错误日志，你可以得到系统某个服务或server的性能瓶颈等。

## 配置 access_log 来记录访问日志

`access_log` 访问日志主要记录客户端的请求。客户端向 `Nginx` 服务器发起的每一次请求都记录在这里。客户端 IP，浏览器信息，referer，请求处理时间，请求URL等信息都可以在访问日志中得到。当然具体要记录哪些信息，你可以通过log_format指令来定义。

语法： 
