<?php
    include 'db.php';
    $name = $_POST['name'];
    $pass = md5($_POST['pass']);
    $code = strtolower($_POST['code']);
    session_start();
    $oldCode=$_SESSION['code'];
    if($code == $oldCode){
        $data = $mysql->query("select * from admin")->fetch_all(1);

        for($i=0;$i<count($data);$i++){
            if($data[$i]['user']==$name){
                if($data[$i]['pass']==$pass){
                    $_SESSION['user'] =$name;
                    echo 1;
                    exit();
                }else{
                    echo 2;
                    exit();
                }
            }
        }
        echo 3;
    }else{
        echo 4;
    }


