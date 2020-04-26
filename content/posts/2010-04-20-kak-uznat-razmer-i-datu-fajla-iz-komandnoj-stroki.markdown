---
author: admin
comments: true
date: 2010-04-20 11:37:04+00:00
template: "post"
draft: false
link: /admin/kak-uznat-razmer-i-datu-fajla-iz-komandnoj-stroki
slug: kak-uznat-razmer-i-datu-fajla-iz-komandnoj-stroki
title: Как узнать размер и дату файла из командной строки
description: "Простейший способ получить размер файла из командной строки Windows"
category:
- Администрирование
tags:
- bat
- cmd
- командная строка
---

Супер мини статья :)

Простейший способ получить размер файла из командной строки Windows:
```bash
for %I in (file.ext) do echo %~zI
```

из хелпа по команде For в Cmd:

- *%~zI        - переменная %I расширяется до размера файла*


Аналогично для даты (модификации) файла:
```bash
for %I in (file.ext) do echo %~tI
```

из хелпа по команде For в Cmd:

- *%~tI        - переменная %I расширяется до даты /времени файла*

А вообще команда `for /?` очень полезная.
