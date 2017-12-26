$(function () {
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
				<a href="/visit/index.php/home">${data[0]['title']}<div class="blue"><img src="/visit/Public/img/blue.png" alt=""></div>
				</a>
			</li>
			<li><a href="/visit/index.php/tour">${data[1]['title']}</a></li>
			<li style="border-radius: 0 0 9px 0"><a href="/visit/index.php/newslist">${data[2]['title']}</a></li>
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
    let hot = $('.main');
    let main = $('.main1');
    $.ajax({
        url:'/visit/index.php/home/selectHot',
        dataType:'json',
        success:function (data) {
            render(data)
        }
    })
    function render(data) {
        hot.empty();
        hot.html(
            `<div class="main-left">
			<p class="p1">${data.smalltitle}</p>
			<p class="p2">${data.title}</p>
			<p class="p3">${data.eltitle}</p>
			<div class="line">
				<img src="/visit/Public/img/line.png" alt="">
			</div>
			<a class="p4" href="/visit/index.php/detail?gid=${data.gid}&type=1">${data.description}
			</a>
		</div>
		<div class="mimg">
			<img src="${data.thumb}" alt="">
		</div>
            `
        )
    }
    $.ajax({
        url:'/visit/index.php/home/selectCollect',
        dataType:'json',
        success:function (data) {
           render1(data)
        }
    })
    function render1(data) {
        main.empty();
        main.html(
            `<a class="mbox1" href="/visit/index.php/detail?gid=${data[0]['gid']}&type=6">
			<img src="${data[0]['thumb']}" alt="">
		</a>
		<div class="mbox2">
			<p style="font-weight: 600">${data[0]['title']}</p>
			<p style="font-weight: 600">${data[0]['eltitle']}</p>
			<a class="mb2word" href="/visit/index.php/detail?gid=${data[0]['gid']}&type=6">${data[0]['description']}</a>
			<p style="font-weight: 600">${data[1]['title']}</p>
			<p style="font-weight: 600">${data[1]['eltitle']}</p>
			<a class="mb2word1" href="/visit/index.php/detail?gid=${data[1]['gid']}&type=6">${data[1]['description']}</a>
		</div>
		<a class="mbox3" href="/visit/index.php/detail?gid=${data[1]['gid']}&type=6">
			<img src="${data[1]['thumb']}" alt="">
		</a>
		<div class="mbox4">
			<p style="font-weight: 600">${data[2]['title']}</p>
			<p style="font-weight: 600">${data[2]['eltitle']}</p>
			<a class="mb2word" href="/visit/index.php/detail?gid=${data[2]['gid']}&type=6">${data[2]['description']}</a>
		</div>
		<a class="mbox5" href="/visit/index.php/detail?gid=${data[2]['gid']}&type=6">
			<img src="${data[2]['thumb']}" alt="">
		</a>
		<div class="mbox6">
			<img src="/visit/Public/img/TIM20171101234928.jpg" alt="">
		</div>
            `
        )
    }
    $.ajax({
        url:'/visit/index.php/home/team',
        dataType:'json',
        success:function (data) {
            renderTeam(data)
            renderItem(data)
        }
    })
    function renderTeam(data) {
        $('#slide').empty();
        $.each(data,function (index,value) {
             $('#slide').html(function (i,v) {
                 return v+`
                 <div class="img img${index+1}" data-slide-imgId="${index}"><img src="${value.thumb}"></div>
                 `
             })
        })
    }
    function renderItem(data) {
        let item = $('.slide').children()
        for(let i=0;i<item.length;i++){
            if(item[i].className=='img img3'){
                let index = $(item[i]).attr('data-slide-imgId')
                $('.miaoshu').empty();
                $('.miaoshu').html(
                    `<div class="qm">
				<img src="${data[index]['qm']}" alt="">
			</div>
			<div class="name">${data[index]['title']}</div>
			<div class="star">${creatimg(data[index]['star'])}</div>
			<div class="tword">${data[index]['description']}</div>
                    `
                )
            }
        }
    }
    function creatimg(data) {
        let str = '';
        for(let i =0;i<data;i++){
            str += `<img src="/visit/Public/img/star.png" alt="">`
        }
        return str;
    }
})