---
author: admin
comments: true
date: 2014-10-03 09:31:58+00:00
template: "post"
draft: false
link: /databases/kak-ispravit-povrezhdennuyu-bazu-ms-sql-suspect-mode
slug: kak-ispravit-povrezhdennuyu-bazu-ms-sql-suspect-mode
title: Как исправить поврежденную базу MS SQL (Suspect Mode)
description: "Так случилось, что MS SQL база перешла в режим Suspect mode. Никакие манипуляции с базой в таком режиме сделать невозможно, даже отключить."
category:
- MS SQL
- Базы данных
tags:
- sql
- suspect
---

Так случилось, что MS SQL база перешла в "подозрительный" режим (**Suspect mode**). Никакие манипуляции с базой в таком режиме сделать невозможно, даже отключить. Помогла следующая серия команд в management Studio.
Для начала необходимо перевести базу данных в режим EMERGENCY:
```sql
EXEC sp_resetstatus 'yourDBname'
GO
ALTER DATABASE yourDBname SET EMERGENCY
GO
```

Далее появляется выполнять тестирование и исправление базы:
```sql
DBCC checkdb('yourDBname')
GO
ALTER DATABASE yourDBname SET SINGLE_USER WITH ROLLBACK IMMEDIATE
GO
DBCC CheckDB ('yourDBname', REPAIR_ALLOW_DATA_LOSS)
GO
ALTER DATABASE yourDBname SET MULTI_USER
GO
```
