---
author: admin
comments: true
date: 2013-05-15 07:35:59+00:00
template: "post"
draft: false
link: /admin/konvertiruem-flac-v-mp3-iz-komandnoj-stroki
slug: konvertiruem-flac-v-mp3-iz-komandnoj-stroki
title: Конвертируем flac в mp3 из командной строки
description: "Немного кодинга в cmd Windows"
category:
- Windows
- Администрирование
tags:
- bat
- cmd
- flac
- mp3
- командная строка
---

Решил раз и навсегда закрыть для себя вопрос конвертации *.flac музыки в mp3 формат. Используя знания из статей под тэгом [cmd](/tag/cmd/), а именно из статей [Как организовать цикл в bat или cmd файле](/admin/kak-organizovat-cikl-v-batcmd-fajle/) и [Как узнать размер и дату файла из командной строки](/admin/kak-uznat-razmer-i-datu-fajla-iz-komandnoj-stroki/) подробно распишу как организовать конвертирование файлов из формата FLAC и формат MP3, находящихся в указанной в параметре cmd-скрипта папке и подпапках.
На написание этой статьи меня подтолкнула [статья на хабре](https://habrahabr.ru/post/148171/), только я буду делать скрипт под Windows.
Для конвертирования нам понадобятся установленные [flac](https://xiph.org/flac/) и [lame](https://lame.sourceforge.net/), lame качал с сайта rarewares.org
В конце статьи я выложу архив со скриптом и нужными программами.

```bash
@echo off
echo flac2mp3.cmd [-r] папка
echo [-r] - удалять исходные flac файлы (не обязательно)
echo папка - папка с flac файлами. Обрабатываются так же и вложенные папки. Папка с пробелами указывается в кавычках - &quot;папка&quot;

set r=%1
set workdir=%2
if not exist %workdir% set workdir=%r%
if exist %r% set workdir=%r%
if not exist %workdir% (
echo Каталог не существует
exit
)

if /i %r%==-r (
  set r=1 
) else (
set r=0
)

for /f &quot;tokens=*&quot; %%a in (' dir /s /b %workdir%\*.flac ') do (
echo %%~da %%~pa %%~na
echo &quot;%%~da%%~pa&quot;%%~na.wav
flac -d -f &quot;%%~a&quot;
call :pack &quot;%%~a&quot;
rem lame -b 320 &quot;%%~da%%~pa%%~na.wav&quot; &quot;%%~da%%~pa%%~na.mp3&quot;
del /q &quot;%%~da%%~pa%%~na.wav&quot;
if %r%==1 del /q &quot;%%~a&quot;
)
exit

:pack
for /f &quot;tokens=* delims== &quot; %%i in ('metaflac.exe --show-tag=ARTIST %1 ') do set %%i
for /f &quot;tokens=* &quot; %%i in ('metaflac.exe --show-tag=TITLE %1 ') do set %%i
for /f &quot;tokens=* &quot; %%i in ('metaflac.exe --show-tag=ALBUM %1 ') do set %%i
for /f &quot;tokens=* &quot; %%i in ('metaflac.exe --show-tag=GENRE %1 ') do set %%i
for /f &quot;tokens=* &quot; %%i in ('metaflac.exe --show-tag=TRACKNUMBER %1 ') do set %%i
for /f &quot;tokens=* &quot; %%i in ('metaflac.exe --show-tag=DATE %1 ') do set %%i
echo lame -m j -q 0 -V 0 -s 44.1 --tt &quot;%TITLE%&quot; --tn &quot;%TRACKNUMBER%&quot; --ta &quot;%ARTIST%&quot; --tl &quot;%ALBUM%&quot; --ty &quot;%DATE%&quot; --tg &quot;%GENRE%&quot; &quot;%~d1%~p1%~n1.wav&quot; &quot;%~d1%~p1%~n1.mp3&quot;
lame -m j -q 0 -V 0 -s 44.1 --tt &quot;%TITLE%&quot; --tn &quot;%TRACKNUMBER%&quot; --ta &quot;%ARTIST%&quot; --tl &quot;%ALBUM%&quot; --ty &quot;%DATE%&quot; --tg &quot;%GENRE%&quot; &quot;%~d1%~p1%~n1.wav&quot; &quot;%~d1%~p1%~n1.mp3&quot;
exit /b 0
```
