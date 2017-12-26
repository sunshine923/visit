<?php
    include 'db.php';
    $type = $_REQUEST['type'];
    $data = $_REQUEST['data'];
    $arr = array_keys($data);
    $str = '';
    for($i=1;$i<count($arr);$i++){
        $str.=$arr[$i]."='";
        $str.=$data[$arr[$i]]."',";
    }
    $str = substr($str,0,-1);
    $str.=' where ';
    $str.=$arr[0]."=".$data[$arr[0]];
    $sql = "update $type set $str";
    $mysql->query($sql);
    if($mysql->affected_rows){
        echo 'ok';
        exit();
    }else{
        echo 'error';
    }