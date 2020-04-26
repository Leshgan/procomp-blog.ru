---
author: admin
comments: true
date: 2011-07-08 10:48:19+00:00
template: "post"
draft: false
link: /programming/php-programming/kodirovka-utf-8-v-netbeans-ide
slug: kodirovka-utf-8-v-netbeans-ide
title: Кодировка UTF-8 в Netbeans IDE
description: "Чтобы замечательная среда разработки для PHP, Java и т.д NetBeans поддерживала кодировку utf-8..."
category:
- php
- Программы
tags:
- netbeans
---

[![Netbeans 7.0](/media/nb-logo2.gif)](/programming/php-programming/kodirovka-utf-8-v-netbeans-ide/)
Чтобы замечательная среда разработки для PHP, Java и т.д **NetBeans** поддерживала кодировку **utf-8** надо в конфиге программы _netbeans.conf_ (_C:\Program Files\NetBeans 7.0\etc\netbeans.conf_ - в MS Windows) в параметре netbeans_default_options дописать, отделив пробелом: 
```
-J-Dfile.encoding=UTF-8
```

Актуально для **NetBeans 7.0**

