# Dragonly

[Dragonfly](http://blog.php-admin.com/extjs4/extjs_dragonfly.md) 是一个使用Codeigniter3 + Extjs4 组合进行RIA(Rich Internet Application)开发的范例项目。

## 特性

* codeigniter3 + Extjs4
* 集成codeigniter-ext-direct简化前后台ajax交互
* 使用Font Awesome Icons
* MVC
* 使用EventDomain捕获ajax请求异常
* 集成中国特色时间插件My97DatePicker

## 不足

* 不是一个完整的项目
* 使用了MySQL专用特性(SQL_CALC_FOUND_ROWS)
* 有些UI并无功能
* 未实现History management（Location hash）

## How to make it fly?

* create database(MySQL)

import sakila-demo.sql (this sql file will create database automatically)

```sql
GRANT ALL ON `sakila`.* TO dragonfly@localhost IDENTIFIED BY 'dragonfly';
FLUSH PRIVILEGES;
```

*  Nginx & PHP(Prefer) or Apache & php

pay attention about param "fastcgi_pass"

```html
server {
    listen 80;
    server_name www.dragonfly.cc;
    root   E:/git/dragonfly/;
    
    index  index.php index.html index.htm;

    location ~* \.(ico|css|js|gif|jpe?g|png)(\?[0-9]+)?$ {
            #expires max;
            log_not_found off;
    }

    location / {
        try_files $uri $uri/ /index.php; 
    } 
    
    location ~* \.php$ { 
        fastcgi_pass 127.0.0.1:9001; 
        include fastcgi.conf; 
        fastcgi_index  index.php;
        fastcgi_param  SCRIPT_FILENAME $document_root$fastcgi_script_name;
    }
}
```


### Sencha Ext JS

Sencha Ext JS 4.2 GPL

### CodeIgniter

The MIT License (MIT)

Copyright (c) 2014 - 2015, British Columbia Institute of Technology