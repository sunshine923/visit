<?php
/*
 * width height letter lineNum pxNum  fontFile img  result
 *
 *
 * 创建图片
 * 画线
 * 画点
 * 产生验证码
 * 画文字
 * 输出
 *
 *
 * imagecreatetruecolor()  创建帧彩色图片
 * imagecolorallocate（）产生颜色
 * imagefill()填充
 * mt_rand  随机数 0,107 浅色
 * output(){header:content-type:image/png}
 * imagedestroy 销毁资源、
 *
 *
 * imageline 画线
 *imagesetpixel 画点
 * imagettftext 画文字
 *
 *
 * strlen()  字符串长度
 * strtolower
 * */
class Code{
    public $width = 120;
    public $height = 40;
    public $letter = '9874563qwertyuipasdfghjkxcvbnm';
    public $lineNum = 4;
    public $pxNum = 50;
    public $fontFile ='UTM AvoBold_Italic.ttf';
    public $img;
    public $result;

    function creat(){
        $this->img=imagecreatetruecolor($this->width,$this->height);
        $arr = $this->bgClolor();
        $color = imagecolorallocate($this->img,$arr[0],$arr[1],$arr[2]);
        imagefill($this->img,0,0,$color);
    }
    function drawline(){
        for($i=0;$i<$this->lineNum;$i++){
            $x1= mt_rand(0,$this->width/2);
            $y1 = mt_rand(0,$this->height/2);
            $x2 = mt_rand($this->width/2,$this->width);
            $y2 = mt_rand($this->height/2,$this->height);
            $arr = $this->bgClolor();
            $color = imagecolorallocate($this->img,$arr[0],$arr[1],$arr[2]);
            if($i>=2){
                imageline($this->img,$x1,$y2,$x2,$y1,$color);
            }else{
                imageline($this->img,$x1,$y1,$x2,$y2,$color);
            }
        }
        for($i=0;$i<$this->pxNum;$i++){
            $arr = $this->bgClolor();
            $color = imagecolorallocate($this->img,$arr[0],$arr[1],$arr[2]);
            imagesetpixel($this->img,mt_rand(0,$this->width),mt_rand(0,$this->height),$color);
        }
    }
    function drawtext(){
        $str = $this->getChar();

        for($i=0;$i<4;$i++){
            $arr = $this->textClolor();
            $x=$this->width/4;
            $y = $this->height/2;
            $color = imagecolorallocate($this->img,$arr[0],$arr[1],$arr[2]);
            imagettftext($this->img,mt_rand(14,24),mt_rand(-15,15),$x*$i+5,$y+10,$color,$this->fontFile,substr($str,$i,1));
        }


    }

    function getChar(){
        $len = strlen($this->letter)-1;
        $str ='';
        for($i=0;$i<4;$i++){
            $str.=substr($this->letter,mt_rand(0,$len),1);
        }
        $this->result = strtolower($str);
        return  $str;
    }
    function bgClolor(){
        $arr = [];
        $arr[0]=mt_rand(0,107);
        $arr[1]=mt_rand(0,107);
        $arr[2]=mt_rand(0,107);
        return $arr;
    }
    function textClolor(){
        $arr = [];
        $arr[0]=mt_rand(107,255);
        $arr[1]=mt_rand(107,255);
        $arr[2]=mt_rand(107,255);
        return $arr;
    }
    function outPut(){
        header('Content-type:image/png');
        $this->creat();
        $this->drawline();
        $this->drawtext();
        imagepng($this->img);
        imagedestroy($this->img);
    }


}
$code = new Code();
$code->outPut();
session_start();
$_SESSION['code']=$code->result;
