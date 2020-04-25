---
author: admin
comments: true
date: 2011-05-17 11:08:38+00:00
template: "post"
draft: false
link: http://www.procomp-blog.ru/linux/kak-pereustanovit-linux-ubuntu-debian-mint-i-soxranit-vse-programmy/
slug: kak-pereustanovit-linux-ubuntu-debian-mint-i-soxranit-vse-programmy
title: Как переустановить Linux Ubuntu, Debian, Mint и сохранить все программы
description: "442"
category:
- Linux
tags:
- Linux
---

[![Как переустановить Linux Ubuntu, Debian, Mint и сохранить все программы](http://www.procomp-blog.ru/wp-content/uploads/linux.png)](http://www.procomp-blog.ru/linux/kak-pereustanovit-linux-ubuntu-debian-mint-i-soxranit-vse-programmy)



Меня часто от переустановки системы, не важно какой, **Windows** или **Linux** сдерживает переустановка и настройка всех программ. К счастью в **Linux** с этим делом всё обстоит гораздо лучше, чем в **Windows** и без помощи внешних программ.




Есть два способа. Графический и консольный.


<!-- more -->


### Графический способ (Gnome)




Меню **Система->Администрирование->Менеджер пакетов Synaptic**-меню **Файл-Сохранить выделенное как (Save marking As)**, пишем название файла и всё готово. В новой системе остается аналогично открыть меню **Система->Администрирование->Менеджер пакетов Synaptic**-меню **Файл-Чтение из списка (Read Markings)** и выбрать сохраненный в старой системе файл. Далее останется только нажать кнопку **Применить (Apply)**





### Консольный способ


Мой любимый способ общения с **Linux** :)


В консоли исходной системы с правами супер пользователя набираем:


[code]
dpkg --get-selections > installed_programs.txt
[/code]
Таким образом сохраняем список установленных пакетов в файл installed_programs.txt 


Записываем файл installed_programs.txt в новую систему и набираем в консоли так же с правами рута:


[code]
dpkg --set-selections < installed_programs.txt
[/code]
И далее:
[code]
apt-get -u dselect-upgrade
[/code]
или 
[code]
apt-get dselect-upgrade
[/code]

Вот и всё ;-)
