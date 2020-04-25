---
author: admin
comments: true
date: 2010-02-01 12:57:28+00:00
template: "post"
draft: false
link: http://www.procomp-blog.ru/admin/odbc-iz-komandnoj-stroki-windows/
slug: odbc-iz-komandnoj-stroki-windows
title: ODBC из командной строки Windows
description: "Создание алиаса ODBC из командной строки Windows"
category:
- Администрирование
tags:
- ODBC
- odbcconf
- командная строка
---

[![ODBC алиас из командной строки Windows](http://www.procomp-blog.ru/images/odbc.png)](http://www.procomp-blog.ru/admin/odbc-iz-komandnoj-stroki-windows)
В этой статье хочу рассказать как просто создать [ODBC](http://ru.wikipedia.org/wiki/ODBC) из командной строки в Windows XP.
ODBC строки подключения бывают Пользовательские, то есть доступны для текущего пользователя; Системные - доступны для всех пользователей компьютера и Файловые. Я использую системные. Для чего вообще нужно создавать из командной строки? Ведь можно просто зайти в **Панель управления - Администрирование - Источники данных (ODBC)** и создать нужное соединение с базой вручную. Да, совершенно верно, можно и так. Но! Если у вас много компьютеров? А если вы передаете свой дистрибутив программы заказчику на самостоятельную установку? Проще делать это из командной строки.
<!-- more -->
Итак, для создания нового источника данных (или еще можно сказать - алиаса) ODBC из командной строки я использую встроенную в Windows XP утилиту **odbcconf.exe**. Вызвав "odbcconf /?" можно посмотреть ключи запуска. Всё очень просто: для создания системного источника нам нужен параметр CONFIGSYSDSN. 
Проще будет показать примеры готовых cmd файлов.
Этот пример показывает создание источника данных с именем Alias базы MyBase  для MS SQL сервера на сервере с именем SERVER и аутентификацией Windows:
[code]
odbcconf CONFIGSYSDSN "SQL server" "DSN=Alias|Server=SERVER|database=MyBase|Trusted_Connection=Yes"
[/code]

Пример создания источника для MS Access с именем Client для таблицы C:\client.mdb:
[code]
odbcconf CONFIGSYSDSN "Microsoft Access Driver (*.mdb)" "DSN=Client|Driver=C:\WINDOWS\system32\odbcjt32.dll|FIL=MS Access|DBQ=C:\client.mdb|UID=DBA|PWD=pass|Description=Client"
[/code]
Здесь Имя пользователя DBA, пароль pass, описание Client.

Видно, что для каждого типа источника, будь то MS SQL, Access или Visual FoxPro, нужны разные имена параметров. Все их знать не обязательно. И вот тут очень простая хитрость. Даже не хитрость, а так :)
Все системные источники данных хранятся в реестре Windows. Путь их хранения: **HKEY_LOCAL_MACHINE\SOFTWARE\ODBC\ODBC.INI\**. Если нужно создать источник данных для любого драйвера БД, я вручную создаю его через **Панель управления - Администрирование - Источники данных (ODBC)**, затем открываю реестр, нахожу созданный источник и в его значениях все эти имена параметров как на ладони. Например, нам нужно узнать какие параметры будут нужны в командной строке для создания источника подключения к Excel. Для этого вручную создаем источник с именем test к файлу c:\test.xls. Смотрим в реестр и видим:
![cтрока ODBC хранится в реестре Windows](http://www.procomp-blog.ru/images/reg.jpg)

Аккуратно переписываем параметры и получаем по аналогии с вышеуказанными примерами следующую командную строку для создания такого ODBC подключения:
[code]
odbcconf CONFIGSYSDSN "Microsoft Excel Driver (*.xls)" "DSN=test|DBQ=c:\test.xls|DefaultDir=C:|Description=Test"
[/code]

Итак, что мы имеем. Варьируя вручную параметры алиаса из Панели Управления и наблюдая результат в реестре Windows по адресу **HKEY_LOCAL_MACHINE\SOFTWARE\ODBC\ODBC.INI\**, можно создать любой ODBC алиас из командной строки Windows.

Это всё. Если есть вопросы или у Вас есть что дополнить к этой теме, пишите в комментариях.
