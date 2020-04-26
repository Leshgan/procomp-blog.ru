---
author: admin
comments: true
date: 2011-07-27 06:15:20+00:00
template: "post"
draft: true
link: /admin/menyaem-shlyuz-po-umolchaniyu-iz-komandnoj-stroki
slug: menyaem-shlyuz-po-umolchaniyu-iz-komandnoj-stroki
title: Меняем шлюз по умолчанию из командной строки
description: "Изменить шлюз по умолчанию в windows из командной строки"
category:
- Администрирование
tags:
- cmd
- windows
- командная строка
---

Бывают ситуации, когда для автоматизации сетевых соединений необходимо автоматически менять параметры соединений. В этой короткой заметке хочу отобразить как быстро и просто можно из командной строки **Windows** поменять **шлюз по умолчанию** в сетевом соединении.


Для этого есть команда **netsh**.

Вот пример установки нужного шлюза 192.168.0.1 для сетевого соединения "Подключение по локальной сети":

```
netsh interface ip set address name = "Подключение по локальной сети" gateway = 192.168.0.1 gwmetric = 1
```
