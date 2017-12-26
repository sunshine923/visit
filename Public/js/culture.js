$(function(){
    let artTitle=$('.artTitle');
    let article1=$('.article1');
    let article2=$('.article2');
    let index = location.search.slice(location.search.indexOf('=')+1)
    var id = index?index:1;
    var aid,aid1;
    let hmain = $('.hmain');
    $.ajax({
        url:'/visit/index.php/contact/head',
        method:'post',
        dataType:'json',
        success:function(data){
            show(data);
        }
    })
    function show(data){
        hmain.empty();
        let s = `
            <li>
				<a href="/visit/index.php/home">${data[0]['title']}
				</a>
			</li>
			<li><a href="/visit/index.php/tour">${data[1]['title']}</a></li>
			<li style="border-radius: 0 0 9px 0"><a href="/visit/index.php/newslist">${data[2]['title']}</a></li>
			<li style="width: 228px">
				<div class="himg"><img src="/visit/Public/img/mountain.png" alt=""></div>
			</li>
			<li style="border-radius: 0 0 0 9px"><a href="/visit/index.php/about">${data[3]['title']}</a></li>
			<li><a href="/visit/index.php/culture">${data[4]['title']}<div class="blue"><img src="/visit/Public/img/blue.png" alt=""></div></a></li>
			<li><a href="/visit/index.php/contact">${data[5]['title']}
			</a></li>
        `
        hmain.html(s)
    }
       /////////获取文章标题/////////
       $.ajax('/visit/index.php/culture/query',{
           data:{id},
           dataType:'json',
           success:function (data) {
               render(artTitle, data);
           }
       });
    $.ajax({
        url:'/visit/index.php/culture/allSelect',
        dataType:'json',
        success:function (data) {
            for(let i=0;i<data.length;i++){
                if(data[i]['id']==id) {
                    if (i == 0) {
                        $('.prev').text(data[i]['ctitle']);
                        aid = data[i]['id'];
                        $('.next').text(data[i + 1]['ctitle'])
                        aid1 = data[i + 1]['id']
                        $('.prev').off();
                    }else if(i==data.length - 1){
                        $('.next').text(data[data.length - 1]['ctitle'])
                        aid1 = data[data.length - 1]['id'];
                        $('.prev').text(data[i - 1]['ctitle'])
                        aid = data[i - 1]['id']
                        $('.next').off();
                    }else if(i>0&&i<data.length-1){
                        $('.next').text(data[i + 1]['ctitle'])
                        aid1 = data[i + 1]['id']
                        $('.prev').text(data[i - 1]['ctitle'])
                        aid = data[i - 1]['id']
                    }
                }
            }
        }
    })
    //////////////////////////////////上一篇/////////////////////////////////
    $('.butn>a').on('click',function () {
        $.ajax({
            url:'/visit/index.php/culture/change',
            dataType:'json',
            data:{aid},
            success:function (data) {
                location.href=`http://localhost/visit/index.php/culture?id=${aid}`
            }
        })
    })
    $('.butn1>a').on('click',function () {
        $.ajax({
            url:'/visit/index.php/culture/change1',
            dataType:'json',
            data:{aid1},
            success:function (data) {
                console.log(data)
                location.href=`http://localhost/visit/index.php/culture?id=${aid1}`
            }
        })
    })
        // /////////获取内容/////////
        $.ajax('/visit/index.php/culture/queryArticle',{
            data:{id},
            dataType:'json',
            success:function (data) {
                renderArt1(article1,article2, data);
            }
        });

////////////////////////////////函数////////////////////////////

    //////////  获取文章标题  //////////
    function render(obj,data) {
        obj.empty();
            let str='';
                str =`
                    <ul data="${data['id']}">
                        <li>${data['ctitle']}</li>
                        <li>${data['eltitle']}</li>
                        <li></li>
                    </ul>
                `;
                obj.html(function(i,val){
                    return val + str;
                });
    };
    // //////////  获取文章内容  //////////
    function renderArt1(obj,obj2,data) {
        obj.empty();
        obj2.empty();
        ///////内容1/////////////
        let str='';
        // for(let i=0;i<data.length;i++){
            str =`
          <div class="article">
                <div class="title">${data[0]['title']}</div>
                <div class="trans">${data[0]['eltitle']}</div>

                <div class="content">${data[0]['content']}</div>

                <div class="contrans">${data[0]['elcontent']}</div>
                <div class="conpic"></div>
		  </div>
            `;
            obj.html(function(i,val){
                return val + str;
            });
            ////////内容2////////
            let str2='';
            str2=`
            <div class="article">
                <div class="title">${data[1]['title']}</div>
                <div class="trans">${data[1]['eltitle']}</div>
                <div class="content">${data[1]['content']}</div>
                <div class="contrans">${data[1]['elcontent']}</div>
            </div>
                `;
            obj2.html(function(i,val){
                return val + str2;
            })
        // }

    };


})