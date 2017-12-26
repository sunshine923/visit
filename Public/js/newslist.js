$(function () {
    let newslist = $('.newsmore');
    let btns = $('.btns');
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
			<li style="border-radius: 0 0 9px 0"><a href="/visit/index.php/newslist">${data[2]['title']}<div class="blue"><img src="/visit/Public/img/blue.png" alt=""></div></a></li>
			<li style="width: 228px">
				<div class="himg"><img src="/visit/Public/img/mountain.png" alt=""></div>
			</li>
			<li style="border-radius: 0 0 0 9px"><a href="/visit/index.php/about">${data[3]['title']}</a></li>
			<li><a href="/visit/index.php/culture">${data[4]['title']}</a></li>
			<li><a href="/visit/index.php/contact">${data[5]['title']}
			</a></li>
        `
        hmain.html(s)
    }
    $.ajax({
        url:'/visit/index.php/newslist/centerSelect',
        dataType:'json',
        success:function (data) {
            render(data)
        }
    })

    function render(data) {
        $('.news').empty();
        $.each(data,function (index,value) {
            $('.news').html(function (i,v) {
                return v+`
                <li>
                <a href="/visit/index.php/detail1?gid=${value.gid}&type=${value.type}">
				<div class="newsimg${index+1}">
					<img src="${value.thumb}" alt="">
				</div>
				<div class="newsword${index+1}">
					<p>${value.title}</p>
					<p>${value.eltitle}</p>
					<div class="blueline"></div>
					<p class="message">${value.description}</p>
					<div class="view">
						<div class="viewyuan1"></div>
						<div class="date">${value.time.split(' ')[0]}</div>
						<div class="viewyuan2"></div>
						<div class="num"><span>${value.look}</span>人浏览</div>
					</div>
				</div>
				</a>
			</li>
                `
            })
        })
    }
    $.ajax({
        url: '/visit/index.php/newslist/listpage',
        data:{page:1},
        dataType: 'json',
        success: function success(total) {
            let pages = total/4
            btn(pages);
            fn1(total,1);
            $('.pages').on('click',function () {
                newslist.empty();
                let page = $(this).html().substr(1,1);
                fn1(total,page)
            })
            $('.btn-prev').on('click',function () {
                newslist.html('')
                let page;
                let now = $('.active').html().substr(1,1);
                if(now-1>0){
                    page = now-1;
                }else{
                    page = now;
                }
                fn1(total,page);
            })
            $('.btn-next').on('click',function () {
                newslist.html('')
                let page;
                let now = $('.active').html().substr(1,1);
                if(now*1+1>pages){
                    page = now*1;
                }else{
                    page = now*1 + 1;
                }
                fn1(total,page);
            })
        }
    })
    function fn1(data,page) {
        for(let i=0;i<data;i++){
            $('.pages').removeClass('active')
        }
        $('.pages').eq(page-1).addClass('active');
        $.ajax({
            url: '/visit/index.php/newslist/listCollect',
            data:{page},
            dataType: 'json',
            success:function (data) {
                render1(data,page);
            }
        });
    }
    function render1(data,page) {
        newslist.empty();
        $.each(data,function (index,value) {
            newslist.html(function (i,v) {
                return v+`
                	<li>
                	<a href="/visit/index.php/detail1?gid=${value.gid}&type=${value.type}">
                	<div class="talk">
						<p class="tp1">${value.title}</p>
						<p class="tp2">/</p>
						<p class="tp1 tp3">${value.eltitle}</p>
					</div>
					<div class="nbox">
						<p>${value.description}</p>
						<div class="nimg"><img src="/visit/Public/img/newsline.png" alt=""></div>
					</div>
					</a>
			</li>
                `
            })
        })
    }
    function btn(data) {
        btns.empty();
        btns.html( `<div class="btn-prev"><img src="/visit/Public/img/left.png" alt=""></div>`)
        for(let i =0;i<data;i++){
            btns.html(function (index,value) {
                return value + `<li class="pages">0${i+1}</li>`
            })
        }
        btns.html(function (index,value) {
            return value + `<div class="btn-next"><img src="/visit/Public/img/right.png" alt=""></div>`
        })
    }
})