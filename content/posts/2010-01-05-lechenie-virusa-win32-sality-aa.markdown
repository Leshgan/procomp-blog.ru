---
author: admin
comments: true
date: 2010-01-05 14:41:46+00:00
template: "post"
draft: false
link: http://www.procomp-blog.ru/borba-s-virusami/lechenie-virusa-win32-sality-aa/
# slug: lechenie-virusa-win32-sality-aa
title: Лечение вируса Win32.Sality.aa
description: "Борьба с вирусом Win32.Sality.aa"
category:
- Борьба с вирусами
tags:
- Вирусы
---

Новый год начался весело. Проник вирус Win32.Sality.aa  по классификации [AVP](http://www.securelist.com/ru/descriptions/7196714/Virus.Win32.Sality.aa), он же Win32.Sector.8, Win32.Sector.8, Win32.Sector.9, Win32.Sector.10, Win32.Sector.12, Win32.Sector.17 по классификации Dr.Web.

Я не заметил каких-либо особо вредных действий этого вируса, за исключением невозможности редактирования реестра в инфицированном компьютере (regedit не запускается), а так же невозможность запуска Диспетчера задач (taskmgr.exe). Эти процессы блокируются вирусом. Подробнее о действии этого вируса можно почитать в вирусной энциклопедии Касперского ([прямой линк на описание](http://www.securelist.com/ru/descriptions/7196714/Virus.Win32.Sality.aa)).  Методы борьбы тоже разные и их можно найти в интернете.

Я опишу свой способ.

<!-- more -->

Для удаления потребуются следующие бесплатные  программы:



	
  1. **Dr.Web CureIt** (качать [отсюда](http://www.freedrweb.com/download+cureit/))

	
  2. Утилита от Касперского **SalityKiller.zip** (качать [отсюда](http://support.kaspersky.ru/downloads/utils/salitykiller.zip))

	
  3. Восстановление реестра **Sality_RegKeys.zip** (качать [отсюда](http://support.kaspersky.ru/downloads/utils/sality_regkeys.zip))


Распаковываем утилиту **SalityKiller.zip** в любую папку и получаем файл **SalityKiller.exe**. предположим распакуем в папку c:\temp

Советую не распаковывать на "Рабочий стол" или в "Мои документы".  Лучше всего распаковать в корень диска C или в папку с коротким латинским названием, чтобы потом запускать команду не набирая длинные названия папок.

Рядом с этим файлом создаем cmd файл скажем с именем sk.cmd с содержимым:
[code]
SalityKiller.exe -l %computername%_log.txt -x -a -j -k
[/code]

И Распаковываем  **Sality_RegKeys.zip**

_**Лечение:**_



	
  1. Запускаем c:\temp\sk.cmd и пусть он просканирует весь комп.

	
  2. Далее можно без перезагрузки запустить утилиту SalityKiller в режиме мониторинга. Именно этот режим мне помог.

Итак, делаем Пуск - Выполнить, пишем cmd, запускаем. Далее в cmd пишем c:\temp\**salitykiller -m** и запускаем эту команду.  Ключ **-m** означает, что утилита будет работать в режиме мониторинга и удалять процессы с вирусом Sality  как только такие процессы появятся.

	
  3. Теперь можно запускать CureIt! Пусть проверяет весь компьютер.

	
  4. После того как отработает CureIt! запустите из распакованного архива **Sality_RegKeys.zip** из папки **Sality_RegKeys** файл "Disable autorun.reg" и .reg файл для Вашей операционной системы.


Вот и всё.  На момент написания этой статьи на моём сервере уже доступен запуск редактора реестра regedit,  а так же Диспетчер задач. Операционная система Windwos 2000 Server и 2003 Server

В ближайшие дни отпишусь чем всё закончилось.


sk.cmd
