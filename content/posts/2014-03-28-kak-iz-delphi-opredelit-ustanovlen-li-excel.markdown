---
author: admin
comments: true
date: 2014-03-28 06:45:43+00:00
template: "post"
draft: false
link: http://www.procomp-blog.ru/programming/kak-iz-delphi-opredelit-ustanovlen-li-excel/
slug: kak-iz-delphi-opredelit-ustanovlen-li-excel
title: Как из Delphi определить установлен ли Excel
description: "699"
category:
- Delphi
- Программирование
---

Небольшая заметка-памятка. Перед работой с MS Excel желательно проверить установлен ли в системе MS Office.

[code language="delphi"]
Uses ActiveX;

if not IsOLEObjectInstalled('Excel.Application') then
  ShowMessage('MS Excel не установлен!')
else
  ShowMessage('MS Excel установлен!');

function IsOLEObjectInstalled(Name: String): boolean;
var
  ClassID: TCLSID;
begin
  Result := CLSIDFromProgID(PWideChar(WideString(Name)), ClassID) = S_OK;
end;

[/code]
