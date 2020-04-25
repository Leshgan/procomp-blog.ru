---
author: admin
comments: true
date: 2011-07-08 10:48:19+00:00
template: "post"
draft: false
link: http://www.procomp-blog.ru/programming/php-programming/kodirovka-utf-8-v-netbeans-ide/
slug: kodirovka-utf-8-v-netbeans-ide
title: Кодировка UTF-8 в Netbeans IDE
description: "476"
category:
- php
- Программы
tags:
- netbeans
---

[caption id="" align="alignleft" width="159"][![NetBeans 7.0](http://www.procomp-blog.ru/images/nb-logo2.gif)](http://www.procomp-blog.ru/programming/php-programming/kodirovka-utf-8-v-netbeans-ide/)[/caption]
Чтобы замечательная среда разработки для PHP, Java и т.д **NetBeans** поддерживала кодировку **utf-8** надо в конфиге программы _netbeans.conf_ (_C:\Program Files\NetBeans 7.0\etc\netbeans.conf_ - в MS Windows) в параметре netbeans_default_options дописать, отделив пробелом: 
[code]
-J-Dfile.encoding=UTF-8
[/code]



Актуально для **NetBeans 7.0**

