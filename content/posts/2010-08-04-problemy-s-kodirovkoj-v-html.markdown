---
author: admin
comments: true
date: 2010-08-04 11:35:22+00:00
template: "post"
draft: false
link: /web-dizajn/problemy-s-kodirovkoj-v-html
slug: problemy-s-kodirovkoj-v-html
title: Проблемы с кодировкой в Html
description: "Неверная кодировка html, проблемы с кодировкой страниц"
category:
- Web-дизайн
---

Делая шаблон для сайта, наткнулся на такую особенность. В `<head>` прописал кодировку документа utf-8
```
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
```

 сам документ естественно тоже в кодировке utf-8. Но ни локальный денвер, ни на хостинге - не отображали корректно мой шаблон. 
Для опытных в веб-дизайне это пустяк, а для меня было не понятно. 
В итоге разобрался и немного перепечатаю для статью <a href="http://www.sdelaysite.com/kniga/verstka-kniga/html-kodirovka">отсюда</a> 
Три способа объявить кодировку документа:
1. мета-тэг 
```
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
```

2.файл .htaccess

>Для HTML-файлов в кодировке utf-8 в .htaccess нужно написать одну строку:

>`AddDefaultCharset UTF-8`

>Для HTML-файлов в кодировке Windows-1251:

>`AddDefaultCharset Windows-1251`

>Если ваш хостинг хитро-мудрый и не обращает внимания на эти директивы, то можно попробовать:

>`charsetdisable on`

>`AddDefaultCharset Off`


3. PHP-инструкция, указывающая кодировку по умолчанию.


>В файле, который нужно отобразить в желаемой кодировке, не смотря на настройки сервера хостинг-провайдера, в самом начале указывается директива с php-кодом:
```
<?php header('Content-type: text/html; charset=utf-8')>
```
>Этот php-код отправит заголовок сервера с указанием кодировки по умолчанию для браузера. В приведенном примере, для отображения страницы, будет применяться кодировка utf-8.

>Против такого лома, обычно, приемов в настройках сервера хостинг-провайдера не остается.

>Хочу заметить, что для обработки php-инструкций сервером, html-файл должен иметь расширение .php (например index.php).


Спасибо владельцу блога <a class="nohide" href="http://www.sdelaysite.com">www.sdelaysite.com</a>
:)