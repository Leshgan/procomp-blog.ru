---
author: admin
comments: true
date: 2011-04-28 06:58:33+00:00
template: "post"
draft: false
link: http://www.procomp-blog.ru/admin/kak-ya-nastraival-prozrachnyj-proksi-v-linux-ubuntu-server-chast-1/
slug: kak-ya-nastraival-prozrachnyj-proksi-v-linux-ubuntu-server-chast-1
title: Как я настраивал прозрачный прокси в Linux Ubuntu Server. Часть 1
description: "363"
category:
- Linux
- Администрирование
tags:
- Linux
---





Для упрощения доступа в интернет из локальной сети решил всё-таки взять и настроить прозрачный прокси, т.к. очень долго собирался это сделать и давно хотел сделать так, чтобы в локальной сети не заботиться о настройках параметров прокси-сервера. Linux Ubuntu Server уже был установлен и настроен в качестве **LAMP** (Linux Apache MySQL PHP), о чем я ранее писал в [шпаргалке](http://www.procomp-blog.ru/linux/nastrojka-linux-ubuntu-server/), а так же еще в нескольких статьях о [Linux](http://www.procomp-blog.ru/category/linux/)<!-- more -->





Настройка DNS




Настройка NAT




Настройка кэширующего DNS





Итак, исходные данные: 
**ОС:** Linux Ubuntu Server 10.04

    
    
    <strong>eth0</strong> - сетевая карта, подключенная к маршрутизатору (интернет)
    
    iface eth0 inet static
            address 192.168.3.102
            netmask 255.255.255.0
            network 192.168.3.0
            broadcast 192.168.3.255
            gateway 192.168.3.253
    



    
    
    <strong>eth1</strong> - сетевая карта, подключенна к локальной сети
    iface eth1 inet static
            address 192.168.5.104
            netmask 255.255.255.0
            network 192.168.5.0
            broadcast 192.168.5.255
    


Здесь я не буду описывать настройки сети. Частично о командах, помогающих настроить сеть, можно почитать в статье [Настройка Linux Ubuntu Server](http://www.procomp-blog.ru/linux/nastrojka-linux-ubuntu-server/)


И еще один момент. Все настройки я буду выполнять под учетной записью root, поэтому команду **sudo** не пишу.







Вверх








### Настройка DNS


Не буду описывать для чего нужен DNS и что это такое, об этом можно почитать много где. 
Ясно одно, без этих настроек интернет не работал. Указание DNS серверов в настройке сетевой карты не помогло.
Итак, в файле /etc/resolv.conf пишем адреса наших DNS-серверов. Открываем на редактирование этот конфиг:
[code]
nano /etc/resolv.conf
[/code]
И пишем в него данные нашего провайдера:


<blockquote>
nameserver 81.26.129.5
nameserver 81.26.132.6
</blockquote>



Перезапускаем сеть и пробуем ping с самого Linux сервера на какой-нибудь узел
[code]
/etc/init.d/networking restart
[/code]



<blockquote>
root@serv-web:/home/alex# ping ya.ru
PING ya.ru (87.250.251.3) 56(84) bytes of data.
64 bytes from www.yandex.ru (87.250.251.3): icmp_seq=1 ttl=57 time=86.6 ms
64 bytes from www.yandex.ru (87.250.251.3): icmp_seq=2 ttl=57 time=85.0 ms
64 bytes from www.yandex.ru (87.250.251.3): icmp_seq=3 ttl=57 time=86.8 ms
</blockquote>


Отлично, сам сервер инет видит.


Вверх








### Настройка NAT


Опять же. Что такое NAT и для чего он нужен можно почитать [тут](http://ru.wikipedia.org/wiki/NAT). 

От себя скажу своими словами, что NAT позволяет сетевым программам в локальной сети работать как будто они работают в интернет напрямую, а не через какой-то маршрутизатор или другой компьютер. Например, почтовая программа забирает почту по протоколу POP используя порт 110. Если NAT не настроен, то почтовая программа не сможет даже соединиться с сервером почты, если NAT работает, то порт 110 просто "пробрасывается" от компьютера в локальной сети через шлюз (маршрутизатор, на котором работает NAT) к почтовому серверу. 




Для настройки NAT использую **iptables**, поэтому надо будет предусмотреть настройки NAT из скрипта и организацию автозапуска этого скрипта после перезагрузки системы.




Создаю файл-скрипт:
[code]
touch /etc/nat
[/code]



И в этот файл пишу вот такое содержимое:



<blockquote>
#!/bin/sh

# Включаем форвардинг пакетов
echo 1 > /proc/sys/net/ipv4/ip_forward

# Разрешаем трафик на loopback-интерфейсе
iptables -A INPUT -i lo -j ACCEPT

# Разрешаем доступ из внутренней сети наружу
iptables -A FORWARD -i eth1 -o eth0 -j ACCEPT

# Включаем NAT
iptables -t nat -A POSTROUTING -o eth0 -s 192.168.5.0/24 -j MASQUERADE
# Разрешаем ответы из внешней сети
iptables -A FORWARD -i eth0 -m state --state ESTABLISHED,RELATED -j ACCEPT 
# Запрещаем доступ снаружи во внутреннюю сеть
iptables -A FORWARD -i eth0 -o eth1 -j REJECT
</blockquote>





После сохранения файла **/etc/nat** помещаю его в автоматическую загрузку. Для этого в конце файла **/etc/network/interfaces** дописываю строчку:
[code]
post-up /etc/nat
[/code]





Для того, чтобы скрип запускался, надо дать ему права на запуск:
[code]
sudo chmod +x /etc/nat
[/code]
Подробнее о правах доступа в Linux написано [в этой статье](http://www.procomp-blog.ru/linux/prava-dostupa-v-linux/)





Теперь можно перезапустить сеть командой **/etc/init.d/networking restart** и на компьютере в локальной сети установить в настройке сети адрес шлюза по умолчанию равным адресу нашего Linux сервера. У меня это адрес 192.168.5.104 Но интернет еще не работает, т.к. остался не настроен DNS. То есть с компьютера локальной сети уже можно пинговать и заходить на сайты по IP адресу, а не по имени.




Вверх








### Настройка кэширующего DNS


Устанавливаем кэширующий DNS сервер Dnsmasq:
[code]
apt-get install dnsmasq
[/code]


После установки открываем конфиг **/etc/dnsmasq.conf** на редактирование, ищем и раскомментируем параметр **listen-address**. В моем случае он выглядит так:


<blockquote>
listen-address=127.0.0.1, 192.168.5.104
</blockquote>


Как он выглядел до редактирования я уже не помню, но обязательно нужно указать адрес интерфейса локальной сети (у меня 192.168.5.104).
Перезапускаем **Dnsmasq**:
[code]
/etc/init.d/dnsmasq restart
[/code]
После этого на компьютерах в локальной сети работает интернет без указания прокси.





На этом пока всё. В следующей статье опишу как я "завернул" интернет на прокси **Squid**

.



Вверх
