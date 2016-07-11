# Dragonly

[Dragonfly](http://blog.php-admin.com/extjs4/extjs_dragonfly.md) is a project to demonstrate how to use Codeigniter3 & Extjs4 developing RIA(Rich Internet Application) applications。

## Features

* codeigniter3 & Extjs4
* Using codeigniter-ext-direct to simplify ajax processing
* Using Font Icons in Ext 
* MVC
* Using EventDomain
* Using My97DatePicker(a date/time control with Chinese-style)

## Shortcomings

* not a complete project
* targeting MySQL
* some UI components are non-interactive
* History management（not yet implemented）

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