<?php
    include 'db.php';
    $type = $_REQUEST['type'];
    $data = $_REQUEST;
    $arr = array_keys($data);
    $id = $data[$arr[0]];
    $sql="delete from $type where $arr[0] = $id";
    $mysql->query($sql);
    if($mysql->affected_rows){
        echo 'ok';
        exit();
    }else{
        echo 'error';
    }