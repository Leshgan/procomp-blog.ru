---
author: admin
comments: true
date: 2015-01-20 05:30:58+00:00
template: "post"
draft: false
link: /programming/kopirovanie-v-bufer-obmena-v-delphi
slug: kopirovanie-v-bufer-obmena-v-delphi
title: Копирование в буфер обмена в Delphi
description: "Обычное копирование в буфер обмена командой"
category:
- Delphi
- Программирование
tags:
- delphi7
---

Обычное копирование в буфер обмена командой
```pascal
Clipboard.AsText := str;
```
работает если копируется строка с английскими символами и/или цифрами. 
Строка из русских букв будет скопирована в неверной кодировке. 
Вот [тут](http://www.sql.ru/forum/852176-1/pravilnoe-kopirovanie-v-bufer-obmena) нашел простое решение:
```pascal
type
    TMyClipboard = class(TClipboard);

  procedure StrToClipboard(const AStr :string);
  var
    vLangID :LANGID;
  begin
    with TMyClipboard(Clipboard) do begin
      Open;
      try
        AsText := AStr;
        vLangID := GetUserDefaultLangID;
        SetBuffer(CF_LOCALE, vLangID, SizeOf(vLangID));
      finally
        Close;
      end;
    end;
  end;
```
