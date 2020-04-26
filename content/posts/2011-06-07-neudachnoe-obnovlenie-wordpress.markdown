---
author: admin
comments: true
date: 2011-06-07 06:12:57+00:00
template: "post"
draft: false
link: /wordpress/neudachnoe-obnovlenie-wordpress
slug: neudachnoe-obnovlenie-wordpress
title: Неудачное обновление Wordpress
description: "Что делать, если Wordpress недоступен после обновления"
category:
- Wordpress
tags:
- Wordpress
---

[![Неудачное обновление Wordpress](/media/wp-logo-fire.png)](/wordpress/neudachnoe-obnovlenie-wordpress)

Вот так бывает хочешь как лучше, а получается как всегда. 

Обновляя очередной плагин, получил ошибку "**Briefly unavailable for scheduled maintenance. Check back in a minute.**"

И всё. Ни админка, ни сайт не грузятся, а только вот эта ошибка. Паника! :) Первая мысль: через ftp удалить этот плагин. Но решил не торопиться и нашел решение. Оказывается, при неудачном обновлении, **Wordpress** оставляет в корне сайта файл **.maintenance**. Удаляем его через ftp и всё!
