---
author: admin
comments: true
date: 2012-09-13 12:59:34+00:00
template: "post"
draft: false
link: http://www.procomp-blog.ru/databases/ms-sql/kak-pereimenovat-nazvanie-polya-v-tablice-ms-sql/
slug: kak-pereimenovat-nazvanie-polya-v-tablice-ms-sql
title: Как переименовать название поля в таблице MS SQL
description: "629"
category:
- MS SQL
tags:
- t-sql
---

Как переименовать поле (колонку, столбец) в таблице базы MS SQL уже после создания таблицы? 
Это можно сделать независимо от того содержит ли столбец данные или нет. Для этого используем системную хранимую процедуру **sp_rename**.
[code language="sql"]
EXEC sp_rename 'tableName.[oldColumnName]', 'newColumnName', 'COLUMN'
[/code]

Пример:
[code language="sql"]
EXEC sp_rename 'customers.[contact title]', 'title', 'COLUMN'
[/code]

Эта команда переименует существующий столбец **'contact title'** таблицы **customers** в **'title'**

Подробности надо смотреть в Books Online (BOL)
