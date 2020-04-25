---
author: admin
comments: true
date: 2015-02-13 06:58:16+00:00
template: "post"
draft: false
link: http://www.procomp-blog.ru/programming/kak-programmno-sozdat-filtr-dlya-dxdbgrid/
slug: kak-programmno-sozdat-filtr-dlya-dxdbgrid
title: Как программно создать фильтр для dxDBGrid
description: "756"
category:
- Программирование
tags:
- Delphi
- delphi7
- dxDBGrid
- ExpressQuantumGrid
- filter
- Grid
- Pascal
---

При использовании замечательно компоненты ExpressQuantumGrid Suite удобно в шапке Grid'а устанавливать фильтры. Но если надо установить фильтр программно, то я столкнулся с таким нюансом. Если просто надо отфильтровать данные по какому-то значению, то это делается легко вызовом такой процедуры:

[code language="delphi"]
dxDBGrid1.Filter.Add(AColumn: TdxDBTreeListColumn; const AValue: Variant; const ADisplayValue: string);
[/code]

где 
_AColumn _- какую колонку фильтруем
_AValue _- по какому значению фильтруем
_ADisplayValue _- что отобразить в панели статуса фильтра

Вот мой пример использования:
<!-- more -->


[code language="delphi"]
dxDBGrid1.Filter.Add(dxDBGrid1SOOTVCUSTOMERS, 777, '777');
[/code]

Это значит, что колонка _dxDBGrid1SOOTVCUSTOMERS_ будет отфильтрована по значению, равному _777_ и в панели статуса будет написано: "(Название_колонки = 777)"

Но вот незадача, мне надо отфильтровать не по равенству, а по неравенству, но задать условие **NOT** в этой процедуре нельзя. Заглядываем в код процедуры и видим:

[code language="delphi"]
procedure TdxDBGridFilter.Add(AColumn: TdxDBTreeListColumn; const AValue: Variant; const ADisplayValue: string);
begin
  TdxDBGridCriteria(FCriteria).RemoveItemsByColumn(AColumn);
  TdxDBGridCriteria(FCriteria).AddItem(nil, AColumn, otEqual, AValue, ADisplayValue, False);
  FDBGrid.SetFilterMode;
end;
[/code]

Как видим, вызывается процедура _AddItem_, смотрим и ее код:

[code language="delphi"]
function TdxDBGridCriteria.AddItem(AItemList: TdxCriteriaItemList; AColumn: TdxDBTreeListColumn;
  AOperator: TdxOperatorType; const AValue: Variant; const ADisplayValue: string;
  AIsNot: Boolean): TdxDBGridCriteriaItem;
begin
  if AItemList = nil then
    AItemList := Root;
  Result := TdxDBGridCriteriaItem(AItemList.AddItem(AColumn.Name, AOperator, AValue, ADisplayValue));
  Result.IsNot := AIsNot;
end;
[/code]

Вот тут и стало ясно, что последним параметром как раз идет указание на равенство или неравенство, задаваемому условию. Почему в TdxDBGrid процедура _Filter.Add_ не имеет этого параметра и он указан жестко _false_ остается загадкой.
Можно создать свой класс-наследник от TdxDBGrid и в нем написать свою процедуру AddItem, но тогда нам придется в проекте вручную создавать Grid и все его колонки, что очень не хотелось бы. Поэтому придется написать процедуру добавления фильтра с возможностью указания этого нужного параметра. 
Добавляем два типа: 

[code language="delphi"]
uses dxGrFltr, dxFilter; 

type
  TMyDBGrid = class(TCustomdxDBGrid);
  TMyDBGridFilter = class(TdxDBGridFilter);
[/code]

И пишем в нашем объекте процедуру:

[code language="delphi"]
procedure TForm1.AddFilter(Column: TdxDBTreeListColumn; Value: Variant; DisplayValue: string; Operator: TdxOperatorType = otEqual; NotCriteria: Boolean = False);
var
  Grid: TMyDBGrid;
  Criteria: TdxCriteria;
begin
  if Column = nil then
    Exit;
  Grid := TMyDBGrid(Column.TreeList);
  Criteria := TMyDBGridFilter(Grid.Filter).Criteria;
  with TdxDBGridCriteria(Criteria).AddItem(nil, Column, Operator, Value, DisplayValue, False) do
    if NotCriteria then
      IsNot := True;
  Grid.SetFilterMode;
end;
[/code]

Далее в коде наш фильтр будет выглядеть так:

[code language="delphi"]
AddFilter(dxDBGrid1SOOTVCUSTOMERS, 777, '777', otEqual, true);
[/code]


По материалам статьи [How to create a filter for the Grid at runtime](https://www.devexpress.com/Support/Center/Question/Details/A977)
