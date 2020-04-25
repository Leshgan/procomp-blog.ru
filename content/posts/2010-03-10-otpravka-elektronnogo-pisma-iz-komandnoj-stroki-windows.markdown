---
author: admin
comments: true
date: 2010-03-10 11:47:10+00:00
template: "post"
draft: false
link: http://www.procomp-blog.ru/admin/otpravka-elektronnogo-pisma-iz-komandnoj-stroki-windows/
slug: otpravka-elektronnogo-pisma-iz-komandnoj-stroki-windows
title: Отправка электронного письма из командной строки Windows
description: "123"
category:
- Администрирование
tags:
- командная строка
---

[![Отправка электронного письма из командной строки Windows](http://www.procomp-blog.ru/images/blat.png)](http://www.procomp-blog.ru/admin/otpravka-elektronnogo-pisma-iz-komandnoj-stroki-windows)

Возникла необходимость отправлять данные через почтовый сервис, но чтобы не загружать пользователя ненужными действиями решил прибегнуть к консольной утилите для отправки e-mail под Windows - [blat](http://www.blat.net)
Т.к. для отправки письма по протоколу SMTP без аутентификации уже не обойтись, то я для себя составил такой формат командной строки и вывел его в пакетный cmd файл:

[code]
blat.exe -server server.ru -f e-mail-from@server.ru -u e-mail-from@server.ru -pw pass  -to e-mail-to@server.ru -subject SUBJ -body "Текст сообщения" -attach FILE
[/code]

Немного пояснений:



	
  * -server server.ru - сервер Исходящей почты. Несмотря на то, что мы отправляем из командной строки, но сервер, с которого будет уходить письмо, должен быть!

	
  * -f e-mail-from@server.ru - адрес отправителя. Как и в случае с сервером. Письмо должно быть от кого-то ;)

	
  * -u e-mail-from@server.ru - имя пользователя (логин) для сервера Исходящей почты. Используется для упомянутой выше SMTP аутентификации. В моем случае логин должен состоять из имени пользователя на сервере (то есть имя@сервер), это зависит от сервера. На других серверах может быть просто e-mail-from

	
  * -pw pass - пароль для той же аутентификации.

	
  * -to e-mail-to@server.ru - адрес получателя 

	
  *  -subject SUBJ - тема письма. Должна быть в кавычках, если есть пробелы!

	
  * -body "Текст сообщения"  - текст письма. Должен быть в кавычках, если есть пробелы!

	
  * -attach FILE - собственно то, ради чего это всё я затеял. Путь к файлу и имя файла FILE :)



Все имена серверов и электронные адреса вымышлены. Совпадения случайны.
Если у кого-нибудь есть дополнения или уточнения по этому вопросу, вэлкам в каменты.
