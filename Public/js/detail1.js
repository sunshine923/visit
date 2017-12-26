$(function () {
    let a =location.search.split('&');
    let id = a[0].slice(location.search.indexOf('=')+1)
    let type = a[1].slice(location.search.indexOf('=')+1)
    let content = $('.co-content');
    let btns = $('.btns');
    let text = $('textarea')
    $('.mp1').empty();
    if(type==1){
        $('.mp1').html(`<img src="/visit/Public/img/hot.png" alt="">`)
        $('.aaa').html(`
        <a href="/visit/index.php/tour">
					<div class="sty"  style="width:48px">
						<p>GONGLUE</p>
						<div>
							<span style="width: 44px"></span>
							<span></span>
						</div>
					</div>
					<p>旅游攻略</p>
				</a>`)
    }else if(type==2){
        $('.mp1').html(`<img src="/visit/Public/img/food.png" alt="">`)
        $('.aaa').html(`
        <a href="/visit/index.php/tour">
					<div class="sty"  style="width:48px">
						<p>GONGLUE</p>
						<div>
							<span style="width: 44px"></span>
							<span></span>
						</div>
					</div>
					<p>旅游攻略</p>
				</a>`)
    }else if(type==3){
        $('.mp1').html(`<img src="/visit/Public/img/poor.png" alt="">`)
        $('.aaa').html(`
        <a href="/visit/index.php/tour">
					<div class="sty"  style="width:48px">
						<p>GONGLUE</p>
						<div>
							<span style="width: 44px"></span>
							<span></span>
						</div>
					</div>
					<p>旅游攻略</p>
				</a>`)
    }else if(type==4){
        $('.mp1').html(`<img src="/visit/Public/img/newscenter.png" alt="">`)
        $('.aaa').html(`
        <a href="/visit/index.php/newslist">
					<div class="sty"  style="width:48px">
						<p>NEWSLIST</p>
						<div>
							<span style="width: 44px"></span>
							<span></span>
						</div>
					</div>
					<p>新闻中心</p>
				</a>`)
    }else if(type==5){
        $('.mp1').html(`<img src="/visit/Public/img/newslist.png" alt="">`)
        $('.aaa').html(`
        <a href="/visit/index.php/newslist">
					<div class="sty"  style="width:48px">
						<p>NEWSLIST</p>
						<div>
							<span style="width: 44px"></span>
							<span></span>
						</div>
					</div>
					<p>新闻中心</p>
				</a>`)
    }
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
        let s;
        if(type==1 ||type==2 ||type==3){
            s = `
            <li>
				<a href="/visit/index.php/home">${data[0]['title']}
				</a>
			</li>
			<li><a href="/visit/index.php/tour">${data[1]['title']}<div class="blue"><img src="/visit/Public/img/blue.png" alt=""></div></a></li>
			<li style="border-radius: 0 0 9px 0"><a href="/visit/index.php/newslist">${data[2]['title']}</a></li>
			<li style="width: 228px">
				<div class="himg"><img src="/visit/Public/img/mountain.png" alt=""></div>
			</li>
			<li style="border-radius: 0 0 0 9px"><a href="/visit/index.php/about">${data[3]['title']}</a></li>
			<li><a href="/visit/index.php/culture">${data[4]['title']}</a></li>
			<li><a href="/visit/index.php/contact">${data[5]['title']}
			</a></li>
        `
        }else{
             s = `
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
        }


        hmain.html(s)
    }
    $.ajax({
        url:'/visit/index.php/detail1/select',
        data:{gid:id},
        dataType:'json',
        success:function (data) {
            fn(data[0])
            render(data)
        }
    })
    function fn(data) {
        $('.top').empty();
        $('.top').html(
            `<div class="eltitle">${data.english}</div>
				<div class="title">${data.title}</div>
				<div class="description">${data.description}</div>
				<div class="liulan">
					<div class="heng"></div>
					<div class="l1"><div class="circle"></div><span>${data.look}</span>人浏览</div>
					<div class="l1"><div class="circle1"></div><span>${data.time.split(' ')[0]}</span></div>
					<div class="heng"></div>
				</div>
            `
        )
    }
    function render(data) {
        $('.first').empty();
        let str='';
        for(let i=0;i<2;i++){
             str +=`
            <div class="p1">
				<div class="p1-top">
					<div class="square"></div>
					<div class="p1-title">${data[i]['name']}</div>/
					<div class="py">${data[i]['py']}</div>
				</div>
				${data[i]['content']}
			</div>
            `
        }
        $('.first').html(str)

        $('.second').empty();
        let str1='';
        for(let i=2;i<4;i++){
            str1 +=`
            <div class="p1">
				<div class="p1-top">
					<div class="square"></div>
					<div class="p1-title">${data[i]['name']}</div>/
					<div class="py">${data[i]['py']}</div>
				</div>
				${data[i]['content']}
			</div>
            `
        }
        $('.second').html(str1)

        $('#slide').empty().css('display','block')
        $.each(data,function (index,value) {
            if(value.image){
                $('#slide').html(function (i,v) {
                    return v+`
                    <div class="img img${index+1}" data-slide-imgId="${index}"><img src="${value.image}"></div>
                    `
                })
            }

        })
        $('.an').empty();
        $('.an').html(function (i,v) {
            return v+=`
            <div class="left" onclick="left()"></div>
					<div class="right"  onclick="right()"></div>`
        })
    }
    //////////////////////////评论////////////////////////////
    let count;
    $.ajax({
        url: '/visit/index.php/detail1/page',
        data:{page:1,gid:id},
        dataType: 'json',
        success: function success(total) {
            count = total;
            let pages = total/3
            btn(pages);
            fn1(total,1);
            $('.pages').on('click',function () {
                content.empty();
                let page = $(this).html().substr(1,1);
                fn1(total,page)
            })
            $('.btn-prev').on('click',function () {
                content.html('')
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
                content.html('')
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
            url: '/visit/index.php/detail1/commentCollect',
            data:{page,gid:id},
            dataType: 'json',
            success:function (data) {
                render1(data,page);
            }
        });
    }
    function render1(data,page) {
        content.empty();
        $.each(data,function (index,value) {
            content.html(function (i,v) {
                return v+`
                	<li>
				<div class="image">
					<img src="${value['cthumb']}" alt="">
				</div>
				<div class="message">
					<div class="message-top"><span>${value.user}.</span>${value.time}</div>
					<div class="message-bottom">${value.content}</div>
				</div>
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
    $.ajax({
        url:'/visit/index.php/detail1/commentSelect',
        data:{gid:id},
        dataType:'json',
        success:function (data) {
            comment(data)
        }
    })
    function comment(data) {
        content.html('');
        $.each(data, function (index, value) {
            content.html(function (i, v) {
                return v + `
                <li>
				<div class="image">
					<img src="${value['cthumb']}" alt="">
				</div>
				<div class="message">
					<div class="message-top"><span>${value['user']}.</span>${value['time']}</div>
					<div class="message-bottom">${value['content']}</div>
				</div>
			</li>
                `
            })
        })
    }
    ////////////////////////////////提交////////////////////////////////////////////////////
    text.val('');
    let message;
    text.on('keyup',function () {
        $('.place').css('display','none');
        let length = text.val().length;
        $('.word>span').text('')
        $('.word>span').text(300 - length)
        message = text.val();
    })
    $('button').on('click',function () {
        $.ajax({
            url:'/visit/index.php/detail1/insert',
            data:{message,gid:id},
            success(data){
                if(data=='ok'){
                    text.val('');
                    $('.word>span').text('300')
                    count++;
                    let pages = count/3
                    btn(pages);
                    fn1(count,1);
                    $('.pages').on('click',function () {
                        content.empty();
                        let page = $(this).html().substr(1,1);
                        fn1(count,page)
                    })
                    $('.btn-prev').on('click',function () {
                        content.html('')
                        let page;
                        let now = $('.active').html().substr(1,1);
                        if(now-1>0){
                            page = now-1;
                        }else{
                            page = now;
                        }
                        fn1(count,page);
                    })
                    $('.btn-next').on('click',function () {
                        content.html('')
                        let page;
                        let now = $('.active').html().substr(1,1);
                        if(now*1+1>pages){
                            page = now*1;
                        }else{
                            page = now*1 + 1;
                        }
                        fn1(count,page);
                    })
                }else{
                    '留言失败'
                }

            }
        })
    })
    ///////////////////////////////////////上一篇/////////////////////////////////////////////////
    let gid,gid1;
    $.ajax({
        url:'/visit/index.php/detail1/allSelect',
        data:{type},
        dataType:'json',
        success:function (data) {
            for(let i=0;i<data.length;i++){
                if(data[i]['gid']==id) {
                    if (i == 0) {
                        $('.prev>a').text(data[i]['title']);
                        gid = data[i]['gid'];
                        $('.next>a').text(data[i + 1]['title'])
                        gid1 = data[i + 1]['gid']
                        $('.prev>a').off();
                    }else if(i==data.length - 1){
                        $('.next>a').text(data[data.length - 1]['title'])
                        gid1 = data[data.length - 1]['gid'];
                        $('.prev>a').text(data[i - 1]['title'])
                        gid = data[i - 1]['gid']
                        $('.next>a').off();
                    }else if(i>0&&i<data.length-1){
                        $('.next>a').text(data[i + 1]['title'])
                        gid1 = data[i + 1]['gid']
                        $('.prev>a').text(data[i - 1]['title'])
                        gid = data[i - 1]['gid']
                    }
                }
            }
        }
    })
    $('.prev>a').on('click',function () {
        $.ajax({
            url:'/visit/index.php/detail1/change',
            dataType:'json',
            data:{gid,type},
            success:function (data) {
                location.href=`http://localhost/visit/index.php/detail1?gid=${gid}&type=${type}`
            }
        })
    })
    $('.next>a').on('click',function () {
        $.ajax({
            url:'/visit/index.php/detail1/change1',
            dataType:'json',
            data:{gid1,type},
            success:function (data) {
                location.href=`http://localhost/visit/index.php/detail1?gid=${gid1}&type=${type}`
            }
        })
    })
})