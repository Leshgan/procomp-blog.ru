---
author: admin
comments: true
date: 2011-03-25 05:15:20+00:00
template: "post"
draft: false
link: http://www.procomp-blog.ru/admin/kak-podklyuchit-novyj-zhestkij-disk-v-debian-linux/
slug: kak-podklyuchit-novyj-zhestkij-disk-v-debian-linux
title: Как подключить новый жесткий диск в Debian Linux
description: "336"
category:
- Linux
- Администрирование
tags:
- Linux
---

Продолжаю осваивать Linux. 
Имеется установленный Debian 6.0. Подключил новый жесткий SATA диск размером 1Тб для хранения бэкапов. Теперь опишу максимально подробно как сделать чтобы Linux "увидел" этот диск, как отформатировать диск и как его смонтировать.     <!-- more -->
Итак, по порядку. 



	
  * 
Чтобы посмотреть какие физические диски есть в системе выполняем команду **fdisk -l**
На выходе команды получаем что-то вроде:
[code]
root@serv-portal:/home/alex# fdisk -l

Disk /dev/sda: 500.1 GB, 500107862016 bytes
255 heads, 63 sectors/track, 60801 cylinders
Units = cylinders of 16065 * 512 = 8225280 bytes
Sector size (logical/physical): 512 bytes / 512 bytes
I/O size (minimum/optimal): 512 bytes / 512 bytes
Disk identifier: 0x00039b6e

   Device Boot      Start         End      Blocks   Id  System
/dev/sda1           59829       60802     7811073    5  Extended
/dev/sda2   *           1       59829   480572416   83  Linux
/dev/sda5           59829       60802     7811072   82  Linux swap / Solaris

Partition table entries are not in disk order

Disk /dev/sdb: 1000.2 GB, 1000204886016 bytes
255 heads, 63 sectors/track, 121601 cylinders
Units = cylinders of 16065 * 512 = 8225280 bytes
Sector size (logical/physical): 512 bytes / 512 bytes
I/O size (minimum/optimal): 512 bytes / 512 bytes
Disk identifier: 0x16ef9897
[/code]

Первым идет **/dev/sda** размером 500Гб, на нем система, вторым идет **/dev/sdb** размером 1000Гб. Он и есть новый диск. Отлично, операционка видит диск. Осталось нам его отформатировать и смонтировать.


	
  * Для этого выполняем команду **fdisk /dev/sdb**. Далее нажимаем  **n** (создать новый раздел), по умолчанию предлагается создать раздел на всё доступное место винчестера, это мне и нужно было, нажимаем  **w** (записать изменения и выйти). Таким образом у нас создан раздел **/dev/sdb1**


	
  * Создаем файловую систему ext3 командой  **mke2fs -j /dev/sdb1**

	
  * Готовимся к монтированию. Создаем папку **/media/backup**

	
  * В файле **/etc/fstab** пишем:
[code]
/dev/sdb1   /media/backup   ext3   defaults,errors=remount-ro   0   1
[/code]
Теперь диск будет монтироваться при запуске системы.

	
  * Монтируем диск командой:
[code]
mount -t ext3 /dev/sdb1 /media/backup
[/code]


	
  * Проверяем как всё выглядит командой **df -h**



В освоении помогли следующие статьи:

	
  * [Монтирование разделов и дисков в Linux](http://mydebianblog.blogspot.com/2008/09/linux.html)

	
  * [Как подключить жесткий диск (винчестер) в Debian GNU/Linux](http://www.strizhkov.ru/archives/74)

	
  * [cfdisk и mkfs: разметка и форматирование разделов в Linux](http://mydebianblog.blogspot.com/2008/10/cfdisk-mkfs-linux.html)


