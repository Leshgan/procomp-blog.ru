---
author: admin
comments: true
date: 2010-11-15 08:51:22+00:00
template: "post"
draft: false
link: /borba-s-virusami/lechenie-virusa-usb-wsf
slug: lechenie-virusa-usb-wsf
title: Лечение "вируса" usb.wsf
description: "Лечение вируса VBS:Malware-gen, IS/Autorun, Generic!atr.b, VBS/RiskTool.AutorunStub.A, Sus/AutoInf-A, Mal_Otorun1, Riskware.RiskTool.VBS.AutorunStub!IK, HTML/Rce.Gen, VBS/Worm.AX, not-a-virus:RiskTool.VBS.AutorunStub.a, VBS/Autorun.worm.k, Worm:VBS/Autorun.AG, VBS/RiskTool.AutorunStub.A, Malware.VBS-Runauto, VBS/Autorun-AZZ, VBS.Runauto, Mal_Otorun4"
category:
- Борьба с вирусами
tags:
- Лечить вирусы
---

Не знаю даже толком вирус это или нет, т.к. вредных действий не заметил за ним, но то, что он сам распространяется без спроса и трудно "выводится" в сети предприятия говорит о том, что это вирус.
автор этого скрипта утверждает, что это решение проблемы вирусов-авторанеров с флэшек и других съемных дисков. 
Очень хорошо про этот скрипт и его лечение написано [тут](http://netler.ru/ikt/usb-wsf.htm).
У меня в сети Касперский никак не реагирует на этот вирус. А мой Avast его определяет как **VBS:Malware-gen**.
В отличие от приведенного по ссылке описания его действий, у меня он в "Program Files" создает папку "Съемный диск" и в него помещает файл **usb.wsf**. В реестре прописывается в автозагрузку 
**[HKLM\SOFTWARE\Microsoft\Windows\CurrentVersion\Run\Съемный диск]**.
Лечение простое, если компьютер не в сети. 
Как вылечить один комп можно посмотреть по ссылке выше. 
Вкратце:
1. Удаляем процесс wscript.exe
2. Удаляем папку "Съемный диск" в "Program Files"
3. Удаляем сами файл autorun.inf и usb.wsf в корне флэшки или сетевого диска, или вообще где их увидим :)
4. Удаляем запись в реестре **[HKLM\SOFTWARE\Microsoft\Windows\CurrentVersion\Run\Съемный диск]**

Это казалось бы всё. Но тут одно НО. Windows такая штука, что автозапуск всё равно не отключен и этот вирус моментально появится при открытии флэшки, например.
Поэтому надо отключить этот autorun.
Как отключить autorun я опишу в следующей записи.
