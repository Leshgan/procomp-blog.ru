---
author: admin
comments: true
date: 2015-01-22 06:41:01+00:00
template: "post"
draft: false
link: /admin/menyaem-programmno-papku-ustanovki-v-inno-setup
slug: menyaem-programmno-papku-ustanovki-v-inno-setup
title: Меняем программно папку установки в Inno Setup
description: "При использовании замечательного установщика Inno setup понадобилось сделать проверку на существование папки для установки программы."
category:
- Администрирование
- Программирование
tags:
- inno setup
---

При использовании замечательного установщика [Inno setup](http://www.jrsoftware.org/isinfo.php) понадобилось сделать проверку на существование папки для установки программы. Если такая папка есть, то переименовать ее по определенному алгоритму (в моем случае добавлять единичку в конце имени) и не озадачивать пользователя переименованием; и уж тем более не перезаписывать программу. Вот такая задача: дать возможность ставить одну программу несколько раз в разные папки.

В скрипте меняем параметр _DefaultDirName_ вот так:
```pascal
DefaultDirName={code:newTargetDir}
```

И в конце скрипта в секции _code_ пишем объявленную функцию _newTargetDir_:
```pascal
function newTargetDir(Param : string):string;
var
 entry: String;
 i: integer;
begin
  entry := ExpandConstant('{sd}') + '\MyProgram\';
  i := 1;
  if DirExists(entry) then
    repeat
      entry := ExpandConstant('{sd}') + '\MyProgram' + IntToStr(i) + '\'; 
      i := i + 1;
    until not dirExists(entry);
  result := entry;
end;
```

Здесь встроенная переменная {sd} означает _системный диск_.
