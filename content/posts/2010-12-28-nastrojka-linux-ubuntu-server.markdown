---
author: admin
comments: true
date: 2010-12-28 13:55:21+00:00
template: "post"
draft: false
link: /linux/nastrojka-linux-ubuntu-server
slug: nastrojka-linux-ubuntu-server
title: Настройка Linux Ubuntu Server
description: "Разные настройки Linux Ubuntu Server"
category:
- Linux
tags:
- Linux
---

Статья-шпаргалка, для себя.
Настройка сетевых интерфейсов:
- команда **`ifconfig`** показывает информацию о сетевых интерфейсах
- **`sudo infonfig eth0 up`** запускает интерфейс eth0. [Тут](https://www.guruadmin.ru/page/ifconfig-7-examples-to-configure-network-interface) 7 примеров использования.
- **`sudo /etc/init.d/networking restart`** перезапускает сетевую службу и применяются все настройки
- настройки сетевых интерфейсов находятся в файле **`/etc/network/interfaces`**

Разное: 

- настройки ДНС кроме файла **`/etc/network/interfaces`** находятся в файле **`/etc/resolv.conf`**
- текстовые редакторы: **vi, nano, pico**
- для удаленного управления использую putty
- **`aptitude search <имя_пакета>`** или **`aptitude search <имя_пакета>`** - поиск пакета для установки когда не знаешь его точное название.
- **`sudo apt-get install <имя_пакета>`** - установка пакета.
- **` dpkg --get-selections > installed-software`** получить список установленных пакетов
- **`cat /etc/passwd`** - список пользователей, показывает в какой группе пользователь
- **`dpkg-reconfigure имя_пакета`** - переконфигурация пакета, если при инсталле неверно отконфигурировался
- **lshw** - команда выведет полную информацию о железе, следует выполнять с правами root'а (sudo lshw).
- **hwinfo** - вывод информации о железе. Предварительно требуется установить утилиту (sudo apt-get install hwinfo).
- **uname -a** - вывод информации о системе, версии ядра, дистрибутиве и архитектуре (32/64 бита).
- **lsb_release -a** - выведет название и версию используемого дистрибутива.
- **cat /etc/*release*** - аналогично предыдущей команде, плюс информация о базовом дистрибутиве (например, для Linux Mint 9 выведет еще и Ubuntu 10.04, как базовый дистрибутив).
- **ls -clt / | tail -n 1 | awk '{ print $7, $6, $8 }'** - с помощью этой команды можно узнать дату и время установки системы.
- **ls -dl /var/log/installer/** - аналогично предыдущей команде (но немного иного принципа), позволяет узнать дату и время установки системы.
- Добавить скрипт или команду в **автозагрузку** можно добавив запуск скрипта или команды в файл /etc/rc.local



