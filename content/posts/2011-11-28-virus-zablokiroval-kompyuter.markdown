---
author: admin
comments: true
date: 2011-11-28 18:51:50+00:00
template: "post"
draft: false
link: http://www.procomp-blog.ru/borba-s-virusami/virus-zablokiroval-kompyuter/
slug: virus-zablokiroval-kompyuter
title: Вирус заблокировал компьютер
description: "569"
category:
- Борьба с вирусами
tags:
- Лечить вирусы
---

Если вирус заблокировал компьютер с операционной системой MS **Windows**, первым делом надо со второго компьютера :) или с компьютера друга поискать метод лечения на сайтах Касперского [тут](http://sms.kaspersky.ru), [тут](http://support.kaspersky.ru/faq/?qid=208637133), а так же [тут](http://support.kaspersky.ru/viruses/solutions?qid=208638485), полезно на такие случаи иметь диск [Kaspersky Rescue Disk](http://support.kaspersky.ru/viruses/rescuedisk) и [Kaspersky Virus Removal Tool 2011](http://support.kaspersky.ru/viruses/avptool2011); еще обязательно надо поискать визуально картинку блокировщика на сайте Dr.Web [тут](http://www.drweb.com/unlocker/?lng=ru). 



Вирус действует путем подмены стандартной Shell или Userinit на свою в реестре по адресу **HKEY_LOCAL_MACHINE\SOFTWARE\Microsoft\Windows NT\CurrentVersion\Winlogon**. Для этого нужно любым способом добраться до реестра своей операционной системы и установить параметрам Shell и Userinit значения **explorer.exe** и **C:\WINDOWS\system32\userinit.exe** соответственно. Вручную исправить реестр недоступной системы можно с помощью всевозможных дисков-реаниматоров, коих полно в сети. 






Так же **Kaspersky Rescue Disk** - очень хорошее средство. Если после удаления им вируса, Windows продолжает встречать окном с сообщением об отправке СМС, значит скорее всего вирус подменил служебный файл userinit.exe. Именно такая ситуация была у меня. Помогло выкачивание этого файла из интернета и замена в нерабочей системе. Искать нужно файл из нужной вам версии Windows, а так же с нужным сервис-паком. В моем случае меня спасла статья [И снова вирус просит пополнить счет](http://it-web-log.ru/2011/04/i-snova-virus-prosit-popolnit-schet/), где в конце выложен файл для Windows XP SP3.

