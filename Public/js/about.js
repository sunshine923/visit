$(function(){
        let typeName=$('.typeName');
        let typeCont=$('.contain');
        let word2=$('.text');
        let piclip=$('.piclip');
        let pos=$('.pos');
        let play=$('.bofang')

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
			<li style="border-radius: 0 0 0 9px"><a href="/visit/index.php/about">${data[3]['title']}<div class="blue"><img src="/visit/Public/img/blue.png" alt=""></div></a></li>
			<li><a href="/visit/index.php/culture">${data[4]['title']}</a></li>
			<li><a href="/visit/index.php/contact">${data[5]['title']}</a></li>
        `
        hmain.html(s)
    }
    ////////选项卡/////////////////
    $.ajax('/visit/index.php/about/listContent',{
        data:{aid:1},
        dataType:'json',
        success:function (data) {
            renderTypeCont(data);
        }
    });

    typeName.on('click','li',function(){
        let aid = $(this).attr('data')
        $.ajax('/visit/index.php/about/listContent',{
            data:{aid},
            dataType:'json',
            success:function (data) {
                renderTypeCont(data);
            }
        });
    });

       /////////获取列表/////////
       $.ajax('/visit/index.php/about/queryList',{
           method:'post',
           dataType:'json',
           success:function (data) {
               render(typeName, data);
           }
       });

    //////////获取企业文化///////////////////////
        $.ajax('/visit/index.php/about/queryCom',{
            method:'post',
            dataType:'json',
            success:function (data) {
                renderComCon(data);
                conIdea(piclip,data);
                conDes(pos,data);
            }

        });
        /////////////////////视频/////////////////
  play.on('click',function () {
      let video = $('video')[0];
      if (video.paused) {
          video.play();
          play.css({display:'none'})
          $('.b1').css({display:'none'})
      } else {
          video.pause();
      }
  })
    $('.quene').on('click','div',function () {
        if($(this)[0].className=='q1'){
            $('video').attr('src','/visit/Public/video/333.mp4')
            $('.quene>div').eq(1).children().attr('src',"/visit/Public/img/video2.jpg")
            $('.quene>div').eq(2).children().attr('src',"/visit/Public/img/video3.jpg")
            $(this).children().attr('src',"/visit/Public/img/b1.png")
            $('.b1').children().attr('src',"/visit/Public/img/video1.jpg")
        }else if($(this)[0].className=='q2'){
            $('.quene>div').eq(0).children().attr('src',"/visit/Public/img/video1.jpg")
            $('.quene>div').eq(2).children().attr('src',"/visit/Public/img/video3.jpg")
            $('video').attr('src','/visit/Public/video/111.mp4')
            $(this).children().attr('src',"/visit/Public/img/b1.png")
            $('.b1').children().attr('src',"/visit/Public/img/video2.jpg")
        }else if($(this)[0].className=='q3'){
            $('.quene>div').eq(0).children().attr('src',"/visit/Public/img/video1.jpg")
            $('.quene>div').eq(1).children().attr('src',"/visit/Public/img/video2.jpg")
            $('video').attr('src','/visit/Public/video/333.mp4')
            $(this).children().attr('src',"/visit/Public/img/b1.png")
            $('.b1').children().attr('src',"/visit/Public/img/video3.jpg")
        }
    })
////////////////////////////////函数////////////////////////////

    //////////  获取列表  //////////
    function render(obj,data) {
        obj.empty();
        let str='';
        for (let i=0;i<data.length;i++){
            str =`
                 <li data="${data[i]['aid']}">
                    <span>${data[i]['title']}</span>
                    <span>${data[i]['eltitle']}</span>
			     </li>
            `;
            obj.html(function(i,val){
                return val + str;
            })
        }
    };
    //////////   获取列表内容  ///////////
    function renderTypeCont(data) {
        typeCont.empty();
        typeCont.html(
            `
          <div class="a">
			<div class="square"></div>
			<span>${data.title}</span>/
			<div class="weight">${data.eltitle}</div>
		</div>
		<p>${data.content}</p>
		<p>${data.elcontent}</p>
            `
        )
    }

    /////////////////获取企业内容////////////////
    function renderComCon(data) {
        word2.empty();
        word2.html(
            `<p>${data.content}</p>
             <p>${data.elcontent}</p>
            `
        )

    };
    /////////////获取企业理念////////////
    function conIdea(obj,data) {
        obj.empty();
        obj.html(`
             <div>
					<p>${data['p1']}</p>
					<div class="square center" ></div>
				</div>
				<div>
					<p>${data['p2']}</p>
					<div class="square center"></div>
				</div>
				<div>
					<p>${data['p3']}</p>
					<div class="square center"></div>
				</div>
				<div>
					<p>${data['p4']}</p>
					<div class="square center"></div>
				</div>
				<div class="desc2 weight">WELCOME TO<span style="color:#ffc25c">&nbsp; COME</span></div>
        `)
    };
    /////////////获取企业理念////////////
    function conDes(obj,data) {
            obj.empty();
            obj.html(
                ` <div class="posit">
					<div class="positTitle">
						<p><span style="color:#fff">${data['title']}</p>
						<p class="weight">/&nbsp;&nbsp;${data['eltitle']}
						</p>
						<p class="square "></p>
					</div>
					<div></div>
					<div>${data['description']}</div>
				</div>
                `
            )
    };
    ///////////获取图片/////////
    ///////////获取视频/////////
    // function conVideo(obj,data){
    //     obj.empty();
    //     let str='';
    //     for (let i=0;i<data.length;i++) {
    //         str = `
    //            <div class="video">
    //                 <div><img src="${data[i]['image']}" alt=""></div>
    //                 <div class="quene">
    //                     <div><img src="${data[i]['image']}" alt=""></div>
    //                     <div><img src="${data[i]['image']}" alt=""></div>
    //                     <div><img src="${data[i]['image']}" alt=""></div>
    //                 </div>
		//         </div>
    //             `;
    //         obj.html(function (i, val) {
    //             return val + str;
    //         })
    //     }
    // };





})