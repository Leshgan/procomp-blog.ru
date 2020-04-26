---
author: admin
comments: true
date: 2014-04-05 19:35:43+00:00
template: "post"
draft: false
link: /programming/kak-vvodit-tolko-cifry-v-uitextfield-i-ogranichit-dlinu-stroki-vvoda
slug: kak-vvodit-tolko-cifry-v-uitextfield-i-ogranichit-dlinu-stroki-vvoda
title: Как вводить только цифры в UITextField и ограничить длину строки ввода
description: "Чтобы в UITextField вводить только цифры и не позволить вводить длинные строки, делаем следующее..."
category:
- Xcode
- Программирование
tags:
- iOS
- objective-c
- UITextField
---

Чтобы в UITextField вводить только цифры и не позволить вводить длинные строки, делаем следующее:

Объявим константы
```swift
#define NUMBERS_ONLY @"1234567890"
#define CHARACTER_LIMIT 4
```

И пишем в делегате UITexField
```swift
-(BOOL)textField:(UITextField *)textField shouldChangeCharactersInRange:(NSRange)range replacementString:(NSString *)string
{
    NSUInteger newLength = [textField.text length] + [string length] - range.length;
    NSCharacterSet *cs = [[NSCharacterSet characterSetWithCharactersInString:NUMBERS_ONLY] invertedSet];
    NSString *filtered = [[string componentsSeparatedByCharactersInSet:cs] componentsJoinedByString:@""];
    return (([string isEqualToString:filtered])&&(newLength <= CHARACTER_LIMIT));
}
```
