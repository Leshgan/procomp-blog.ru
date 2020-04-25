---
author: admin
comments: true
date: 2010-12-08 14:17:43+00:00
template: "post"
draft: false
link: http://www.procomp-blog.ru/admin/kak-otklyuchit-avtozapusk-diskov-v-windows/
slug: kak-otklyuchit-avtozapusk-diskov-v-windows
title: Как отключить автозапуск дисков в Windows
description: "241"
category:
- Администрирование
- Борьба с вирусами
tags:
- autorun
- Лечить вирусы
---

Как и обещал в статье о [Лечение “вируса” usb.wsf](http://www.procomp-blog.ru/borba-s-virusami/lechenie-virusa-usb-wsf/) опишу метод гарантированного отключения автозапуска (autorun) съемных и сетевых дисков в Windows. 
Для чего это надо? Во-первых, для меня это изначально было сомнительным удобством, я бы даже сказал напрягало всегда то, что после ставки диска/флэшки появлялось окно с выбором действий или просто молча поверх остальных окон появлялось окно с содержимым диска/флэшки. Во-вторых, с появлением различных autorun-вирусов это стало реальной проблемой, особенно если есть локальная сеть. 
Можно через редактор реестра, а можно через импорт в реестр [этого](/wp-content/uploads/!!!FLASH_FIX.reg) файла.
Этот файл в реестре меняет следующие строки:

[code]
[HKEY_LOCAL_MACHINE\SOFTWARE\Microsoft\Windows NT\CurrentVersion\IniFileMapping\Autorun.inf]
@="@SYS:DoesNotExist"
[HKEY_LOCAL_MACHINE\SOFTWARE\Microsoft\Windows\CurrentVersion\policies\Explorer]
"NoDriveTypeAutoRun"=dword:000000DF
[/code]


Первая строка
`
[HKEY_LOCAL_MACHINE\SOFTWARE\Microsoft\Windows NT\CurrentVersion\IniFileMapping\Autorun.inf]
@="@SYS:DoesNotExist"
`
заменяет в реестре значение файла Autorun.inf на значение "не существует" и система просто не воспринимает эти файлы.

Вторая строка
`
[HKEY_LOCAL_MACHINE\SOFTWARE\Microsoft\Windows\CurrentVersion\policies\Explorer]
"NoDriveTypeAutoRun"=dword:000000DF
`
отключает автозапуск всем дискам, кроме CD-ROM'a
Значение DF формируется из следующих данных:
`
0x01 (DRIVE_UNKNOWN) — привод, тип которого не может быть определен
0x02 (DRIVE_NO_ROOT_DIR) — диск с невалидным корнем (сетевые “шары”?)
0x04 (DRIVE_REMOVABLE) — съемный диск (дискеты, флешки)
0x08 (DRIVE_FIXED) — несъемный диск (жесткий диск)
0x10 (DRIVE_REMOTE) — сетевой диск
0x20 (DRIVE_CDROM) — CD-привод
0x40 (DRIVE_RAMDISK) — виртуальный диск (RAM-диск)
0x80 (DRIVE_FUTURE) — будущие типы устройств
`

Сумма всех этих значений равна 0xFF, но 0xFF - 0x20 = 0xDF и таким образом оставляем автозапуск для CD-привода.
