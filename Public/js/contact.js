$(function(){
    let main = $('main');
    let service = $('.service');
    let address = $('.address');

    /////////////////头部header动态获取//////////////////
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
			<li><a href="/visit/index.php/culture">${data[4]['title']}</a></li>
			<li><a href="/visit/index.php/contact">${data[5]['title']}
			<div class="blue"><img src="/visit/Public/img/blue.png" alt=""></div></a></li>
        `
        hmain.html(s)
    }
    //////////////获取数据显示到页面中////////////////////
    $.ajax({
        url:'/visit/index.php/contact/select',
        method:'post',
        dataType:'json',
        success:function(data){
            render(data);
        }
    });
    function render(data){
        service.empty();
        let str = `
            <li>${data[0]['eltitle']}<br> <span style="font-size: 30px;color:#999999">${data[0]['title']}</span></li>
			<li style="font-size: 13px ;color:#d0d0d0">${data[0]['content']}</li>
        `
        service.html(str);
        address.empty();
        let st = `
            <ul>
				<li>${data[1]['eltitle']} <span>${data[1]['title']}</span></li>
				<li>${data[1]['content']}
				</li>
				<li>
					<p>全国热线</p>
					<span>${data[1]['phone']}</span>
				</li>
				<li>
					<p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;邮箱</p>
					<span>${data[1]['email']}</span>
				</li>
				<li>
					<p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;网址</p>
					<span>${data[1]['web']}</span>
				</li>
				<li>
					<p>专属电话</p>
					<span>${data[1]['telphone']}</span>
				</li>
			</ul>
			<img src="/visit/Public/img/contact-2.png" alt="">
        `;
        address.html(st)
    }
    ///////////////////提交留言////////////////////////
    let submit = $('#sub');
    submit.on('click',function(){
        let data = $('form').serialize();
        let formdata = new FormData($('form')[0]);
        formdata.append('aa','zhangsan');
        console.log(data)
        // formdata.append('aa','zhangsan');
        $.ajax({
            url: '/visit/index.php/contact/insert',
            data: $("form").serialize(),
            method:'post',
            success: function (data) {
                if (data == 'ok') {
                    alert ('感谢您的留言！');
                } else if (data == 'error') {

                }
            }
        })
    })
})