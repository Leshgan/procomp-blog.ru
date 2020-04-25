---
author: admin
comments: true
date: 2013-02-14 07:21:18+00:00
template: "post"
draft: false
link: http://www.procomp-blog.ru/programming/delphi-vyzov-procedury-po-stroke-s-eyo-nazvaniem/
slug: delphi-vyzov-procedury-po-stroke-s-eyo-nazvaniem
title: Delphi. Вызов процедуры по строке с её названием
description: "655"
category:
- Delphi
- Программирование
---

Иногда бывает нужно вызвать процедуру, название которой не известно в момент выполнения программа. Ну, бывает такое :) В скриптовых языках программирования с этим нет проблем, а вот в компилируемых языках, таких как Pascal/Delphi с этим не так просто.
Небольшая заметка как это реализовать на **Delphi**

Для начала в типах объявляем тип: 
[code lang="delphi"]
type
  myproc = procedure;stdcall;
[/code]

Далее в **implementation** пишем пример процедуры, название которой будет неизвестно в момент выполнения.

[code lang="delphi"]
procedure Proc1;
begin
  ShowMessage('Hello From Proc1');
end;
[/code]


А вот код вызова для кнопки Button1 на форме Form1:

[code lang="delphi"]
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
[/code]

Понятно, что вместо **'Proc1'** может быть строковая переменная.
В конце модуля экспортируем процедуру:
[code lang="delphi"]
exports Proc1;
[/code]

Пожалуй вот и всё.
