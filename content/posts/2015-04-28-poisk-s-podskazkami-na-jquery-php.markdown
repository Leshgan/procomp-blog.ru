---
author: admin
comments: true
date: 2015-04-28 13:21:31+00:00
template: "post"
draft: false
link: http://www.procomp-blog.ru/programming/php-programming/poisk-s-podskazkami-na-jquery-php/
slug: poisk-s-podskazkami-na-jquery-php
title: Поиск с подсказками на jQuery + PHP
description: "766"
category:
- js
- mysql
- php
tags:
- ajax
- autocomplete
- html
- jQuery
- php
---

[![autocomplete](http://www.procomp-blog.ru/wp-content/uploads/autocomplete.png)](http://www.procomp-blog.ru/wp-content/uploads/autocomplete.png) В этой статье я кратко опишу свой опыт в реализации поиска в базе MySQL с автодополнением (это когда по мере набирания текста, во всплывающем окошке показываются похожие результаты, такое можно наблюдать при наборе текста в поисковиках и уже во многих сайтах). Это очень удобно, так как при поиске товара или чего-либо еще на сайте, рядом со строкой поиска появляется окно с уже найденными вариантами написания и пользователю уже легче ориентироваться, а так же меньше надо набирать текст.
<!-- more -->
Для этого я использую **jQuery** виджет [Autocomplete](https://jqueryui.com/autocomplete/). На сайте виджета можно почитать документацию, а так же скачать примеры и посмотреть как оно работает.

[code language="html"]
<!DOCTYPE html>
<html>
<head>
	<link rel="stylesheet" href="jquery-ui.css">
</head>
<style>
	.ui-autocomplete {
		max-height: 20em;
		overflow: hidden;
		overflow-y: scroll;
	}
</style>

<body>
<label>Поиск с автодополнением:</label>
<input name="tag" type="text" id="tag" size="20"/>

<script src="jquery.js"></script>
<script src="jquery-ui.js"></script>
<script>
	$(function() {
		$( "#tag" ).autocomplete({
			source: "search.php" ,
		});
	});
</script>
</body>
</html>
[/code]

Тут всё просто. Подключается стиль jquery-ui.css, скрипты jquery.js и jquery-ui.js.
А так же пишем яваскрипт, в котором объявляется функция, которая и осуществляет этот автоматический поиск. Функция работает с тэком, у которого id=tag и вызывает выполнение скрипта search.php. Это всё, что надо тут знать (остальное в документации по **Autocomplete**). Т.к. параметр _source_ может принимать на входе _Array_, _String_ или функцию, то, в нашем случае, результатом работы скрипта search.php должен быть либо массив, либо данные в формате **JSON**.
Вот приблизительное содержимое скрипта **search.php**: 

[code language="php"]
<?php

require_once 'safemysql.class.php'; 
require_once 'db.php';

$q = $_GET["term"]; // на входе получаем переменную term
$q = str_replace(array("'","\""), "", $q); //убираем возможные служебные символы
$db = new SafeMySQL(array('user' => $databaseusername, 'pass' => $databasepassword,'db' => $databasename, 'charset' => 'UTF8')); // соединяемся с базой
 
$list = $db->getAll("select value from $databasetable where upper(descr) like upper('%?p%') group by descr", $q); // делаем запрос к базе
if (count($list)>1) { // если массив данных содержит более 1 записи, то мы ее выдаем
echo json_encode($list); // конвертируем массив данных в формат JSON
}
?>
[/code]

В этом скрипте используется [Класс для безопасной и удобной работы с MySQL](http://phpfaq.ru/safemysql). Всё просто. Хотелось бы отметить одну особенность виджета **Autocomplete**: он сам добавляет к вызываемому скрипту search.php GET переменную _term_, которую в php-скрипте мы и обрабатываем.
