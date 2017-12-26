<?php
    include 'db.php';
    $type = $_REQUEST['type'];
    $data = $_REQUEST['data'];
    $arr = array_keys($data);
    $str = '(';
    for($i=0;$i<count($arr);$i++){
        $str.=$arr[$i].',';
    }
    $str = substr($str,0,-1);
    $str.=') values (';
    foreach ($data as $v){
        $str.="'".$v."',";
    }
    $str = substr($str,0,-1);
    $str.=")";
    $mysql->query("insert into $type $str");
    if($mysql->affected_rows){
        echo 'ok';
        exit();
    }else{
        echo 'error';
    }
