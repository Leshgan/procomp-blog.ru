import React from 'react';

const liveInternet = `
      <!--LiveInternet counter--><script type="text/javascript"><!--
    document.write("<a href='http://www.liveinternet.ru/click' "+
    "target=_blank><img src='http://counter.yadro.ru/hit?t14.10;r"+
    escape(document.referrer)+((typeof(screen)=="undefined")?"":
    ";s"+screen.width+"*"+screen.height+"*"+(screen.colorDepth?
    screen.colorDepth:screen.pixelDepth))+";u"+escape(document.URL)+
    ";"+Math.random()+
    "' alt='' title='LiveInternet: показано число просмотров за 24"+
    " часа, посетителей за 24 часа и за сегодня' "+
    "border='0' width='88' height='31'><\/a>")
    //--></script><!--/LiveInternet-->
`;

const mailru = `
    <!--Rating@Mail.ru counter-->
        <script language="javascript" type="text/javascript">//<![CDATA[
    d=document;var a='';a+=';r='+escape(d.referrer);js=10;//]]></script>
        <script language="javascript1.1" type="text/javascript">//<![CDATA[
    a+=';j='+navigator.javaEnabled();js=11;//]]></script>
        <script language="javascript1.2" type="text/javascript">//<![CDATA[
    s=screen;a+=';s='+s.width+'*'+s.height;
    a+=';d='+(s.colorDepth?s.colorDepth:s.pixelDepth);js=12;//]]></script>
        <script language="javascript1.3" type="text/javascript">//<![CDATA[
    js=13;//]]></script><script language="javascript" type="text/javascript">//<![CDATA[
    d.write('<a href="http://top.mail.ru/jump?from=1753696" target="_top">'+
    '<img src="http://d2.cc.ba.a1.top.mail.ru/counter?id=1753696;t=210;js='+js+
    a+';rand='+Math.random()+'" alt="Рейтинг@Mail.ru" border="0" '+
    'height="31" width="88" \/><\/a>');if(11<js)d.write('<'+'!-- ');//]]></script>
          <noscript><a target="_top" href="http://top.mail.ru/jump?from=1753696">
            <img src="http://d2.cc.ba.a1.top.mail.ru/counter?js=na;id=1753696;t=210"
              height="31" width="88" border="0" alt="Рейтинг@Mail.ru" /></a></noscript>
          <script language="javascript" type="text/javascript">//<![CDATA[
    if(11<js)d.write('--'+'&#062');//]]></script>
          <!--// Rating@Mail.ru counter-->
`;

const footer = () => (
  <footer>
    <div dangerouslySetInnerHTML={{ __html: liveInternet }}></div>
    <div dangerouslySetInnerHTML={{ __html: mailru }}></div>
  </footer>
);

export default footer;