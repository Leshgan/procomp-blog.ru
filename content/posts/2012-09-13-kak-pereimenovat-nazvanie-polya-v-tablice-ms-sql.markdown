---
author: admin
comments: true
date: 2012-09-13 12:59:34+00:00
template: "post"
draft: false
link: /databases/ms-sql/kak-pereimenovat-nazvanie-polya-v-tablice-ms-sql
slug: kak-pereimenovat-nazvanie-polya-v-tablice-ms-sql
title: Как переименовать название поля в таблице MS SQL
description: "Как переименовать поле, колонку или столбец в таблице базы MS SQL уже после создания таблицы"
category:
- MS SQL
tags:
- t-sql
---

Как переименовать поле (колонку, столбец) в таблице базы MS SQL уже после создания таблицы? 
Это можно сделать независимо от того содержит ли столбец данные или нет. Для этого используем системную хранимую процедуру **sp_rename**.
```sql
EXEC sp_rename 'tableName.[oldColumnName]', 'newColumnName', 'COLUMN'
```

Пример:
```sql
EXEC sp_rename 'customers.[contact title]', 'title', 'COLUMN'
```

Эта команда переименует существующий столбец **'contact title'** таблицы **customers** в **'title'**

Подробности надо смотреть в Books Online (BOL)
