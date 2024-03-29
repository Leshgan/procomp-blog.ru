---
author: admin
comments: true
date: 2016-06-24 05:49:50+00:00
template: "post"
draft: false
link: /admin/zapuskaem-zakrytuyu-programmu-v-windows
slug: zapuskaem-zakrytuyu-programmu-v-windows
title: Запускаем закрытую программу в Windows
description: "Если в Windows программа по непонятным причинам закрывается"
category:
- Администрирование
tags:
- bat
- cmd
- windows
- командная строка
---

Если ваша или не ваша программа по непонятным причинам закрывается, то лучше, конечно, разобраться по какой причине это происходит. Но бывают случаи, когда проще проверить запущен ли нужный процесс и если нужного процесса нет среди запущенных, то запустить его. Особенно это актуально, если программа чужая и исходников нет.
У меня такая ситуация случилась на сервере с ботами, которые должны трудиться круглые сутки, а они иногда "молча" выключаются.
В крон или планировщик вставляю следующий "батник":

```bash
set fullname=c:\program\program.exe
set name=program.exe

tasklist /FO CSV /NH | find /I "%name%" > nul

if %errorlevel% NEQ 0 (
start %fullname% 
echo %date% %time% "start closed process" >> loader.log
)
```

Пояснение построчно:
- Строка 1: Полный путь к запускаемой программе
- Строка 2: Название процесса, который надо мониторить в списке запущенных процессов
- Строка 4: Команда tasklist получает список всех процессов, а команда find ищет в этом списке процесс, заданные в строке 2.
- Строка 6: Если предыдущая команда (в строке 5) не вернула ошибку, то есть процесс найден в списке, то выполняется строка 7
- Строка 7: запуск программы.
- Строка 8: Запись в лог времени запуска нашей программы.

Можно было строку 2 (название запускаемого процесса) заменить на автоматическое получение из строки 1 таким образом:

```bash
for %%a in ("%fullname%") do set name=%%~nxa
```

Но в моем случае запускаемая программа и процесс имели разные названия.
Чаще всего запускаемый процесс и искомый в памяти - равны, так что лучше использовать в строке 2 вариант автоматического получения имени.
