---
author: admin
comments: true
date: 2011-03-21 16:10:57+00:00
template: "post"
draft: false
link: /databases/mysql/nevernaya-kodirovka-v-mysql-iz-php-voprosy-vmesto-slov
slug: nevernaya-kodirovka-v-mysql-iz-php-voprosy-vmesto-slov
title: Неверная кодировка в MySql из PHP. Вопросы вместо слов
description: "mysql данные из php выводятся в неверной кодировке, вместо слов знаки вопросов"
category:
- mysql
tags:
- mysql
- php
---

- сайт делается в кодировке **utf8**, о чем указано в заголовке страницы между тегами head:
[code]<meta http-equiv="content-type" content="text/html; charset=utf-8">[/code]
- страница создается в редакторе в кодировке utf8
- сама база создана с указанием кодировки utf8

При этом получилось так, что при извлечении данных из базы я получал вместо строк с русским текстом знаки **вопросов**, хотя браузер правильно понимал кодировку. 
Решение данной проблемы оказалось простым. Надо после соединения с MySql базой из PHP указать явную кодировку запросом set names utf8 
Например, так:
`$result = mysql_query ("set names utf8", $link);`
где $link - линк на идентификатор соединения с базой (см. mysql_connect())
Всё, теперь данные выводятся в верной кодировке. 
Вообще-то эта проблема имеет и другие корни с соответственно другими методами решения. Более подробно о проблемах с кодировками в MySQL можно почитать в следующих источниках:

1. [phpMyadmin по-русски](http://php-myadmin.ru/learning/mysql-cir.html). Очень доходчиво, по полочкам все разложено и в доступной краткой форме.
2. [PHP FAQ](http://www.phpfaq.ru/charset). Так же полезная информация, но еще рассказывается что делать если требуется перекодировка данных.
3. [Linux.by wiki pages](http://www.linux.by/wiki/index.php/FAQ_PHP_MySQL_charset). А это вообще целый вики на эту тему.
