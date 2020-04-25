---
author: admin
comments: true
date: 2010-08-16 07:05:27+00:00
template: "post"
draft: false
link: http://www.procomp-blog.ru/software/uskoryaem-zapusk-firefox/
slug: uskoryaem-zapusk-firefox
title: Ускоряем запуск FireFox
description: "212"
category:
- Firefox
- Программы
tags:
- firefox
---

Заметил, что спустя некоторое время после установки, Firefox начинает долго запускаться. [Здесь](http://habrahabr.ru/blogs/firefox/65683/) наткнулся на подробное описание проблемы и метода ее решения. Перепечатаю у себя на случай утери источника.





<blockquote>
 И так узкое место при запуске это загрузка .sqlite, базы данных вашего профиля. При интенсивной работе с Фоксом, базы разрастаются, в них появляются «пустые места», ну и главный недостаток, файл базы данных становится сильно фрагментированными. Для решения подобной проблемы существует [специальная команда](http://www.sqlite.org/lang_vacuum.html)  «очистки», точнее операция пересоздаёт файл базы, но уже без пустых мест. Для этого нужно проделать следующее: 

> 
> 

>   1. 
Cкачайте [тут](http://sqlite.org/download.html)  последнюю версию консольного SQLite под вашу ОС или поставьте из репозитория пакет sqlite3. 
  

[Скачать для windows (246 KB)](http://sqlite.org/sqlite-3_6_16.zip)  | Положить в директорию системы ака C:\Windows

> 
  


>   2. 
 **Для Windows** 
  

 Cоздать bat файлик, со следующим скриптиком:

`cd /D "%APPDATA%\Mozilla"  

for /r %%i in (*.sqlite) do echo VACUUM; | sqlite3 "%%i"  

cd /D "%HOMEPATH%\Local Settings\Application Data\Mozilla"  

for /r %%i in (*.sqlite) do echo VACUUM; | sqlite3 "%%i"  

`
  

**Для Linux систем**
  

 Выполнить с командной строки или создать sh скриптик на будущее сами решайте:
  

`cd ~/.mozilla/firefox/*.default/   

for i in *.sqlite; do echo "VACUUM;" | sqlite3 $i ; done  

`
  

 … или ещё один вариант в одну строчку, от [rojer](http://rojer.habrahabr.ru/):
  

`find ~/.mozilla/firefox/ -name *.sqlite -exec sqlite3 {} VACUUM \; `
  

**Для MAC**
 (спасибо, [avanes](http://avanes.habrahabr.ru/))
  

`find ~/Library/Application\ Support/Firefox/Profiles -name '*.sqlite' -exec sqlite3 {} VACUUM \; `
  


> 

>   3. 
Завершаем работу браузера, и выполняем команду/запускаем bat'ник.
  

 Теперь у нас значительно похудевшие и дефрагментированные базы, есть значительные прирост к скорости запуска. Но есть ещё один момент для оптимизации, правда воспользоваться им можно в версиях FF 3.5 и выше. Необходимо включите jit-прекомпиляцию для интерфейса. Для скриптов на страницах она уже включена по-умолчанию. Для этого идём в about:config, вводим jit(в строку поиска) и ставим значение(javascript.options.jit.chrome) в **true**. (У меня после перезапуска, фокс долго не хотел стартовать, но потом ожил)
  

 После этих двух простых действий FF значительно прибавил в скорости. Странно, что Mozilla не предусмотрела подобные манипуляции над базой.
  

 После этих двух простых действий FF значительно прибавил в скорости. Странно, что Mozilla не предусмотрела подобные манипуляции над базой.

> 




</blockquote>
