---
author: admin
comments: true
date: 2013-02-14 07:21:18+00:00
template: "post"
draft: false
link: /programming/delphi-vyzov-procedury-po-stroke-s-eyo-nazvaniem
slug: delphi-vyzov-procedury-po-stroke-s-eyo-nazvaniem
title: Delphi. Вызов процедуры по строке с её названием
description: "Как вызвать процедуру в Delphi если название процедуры не известно заранее"
category:
- Delphi
- Программирование
---

Иногда бывает нужно вызвать процедуру, название которой не известно в момент выполнения программа. Ну, бывает такое :) В скриптовых языках программирования с этим нет проблем, а вот в компилируемых языках, таких как Pascal/Delphi с этим не так просто.
Небольшая заметка как это реализовать на **Delphi**

Для начала в типах объявляем тип: 
```pascal
type
  myproc = procedure;stdcall;
```

Далее в **implementation** пишем пример процедуры, название которой будет неизвестно в момент выполнения.

```pascal
procedure Proc1;
begin
  ShowMessage('Hello From Proc1');
end;
```


А вот код вызова для кнопки Button1 на форме Form1:

```pascal
procedure TForm1.Button1Click(Sender: TObject);
var
  p:myproc;
  h:HWND;
begin
  h:=GetModuleHandle(nil);
  p:=GetProcAddress(h,'Proc1');
  ShowMessage(IntToStr(h));
  p; // вот он сам вызов процедуры
  p:=nil;
end;
```

Понятно, что вместо **'Proc1'** может быть строковая переменная.
В конце модуля экспортируем процедуру:
```pascal
exports Proc1;
```

Пожалуй вот и всё.
