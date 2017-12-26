<?php
class home{
    function __construct()
    {
        $obj=new db();
        $this->mysql = $obj->mysql;
    }
    function index(){
        include 'App/views/home.html';
    }
    function selectHot(){
        $sql="select * from gonglue where collect =1";
        $data = $this->mysql->query($sql)->fetch_assoc();
        echo json_encode($data);
    }
    function selectCollect(){
        $sql="select * from gonglue where collect =2";
        $data = $this->mysql->query($sql)->fetch_all(1);
        echo json_encode($data);
    }
    function team(){
        $sql="select * from team";
        $data = $this->mysql->query($sql)->fetch_all(1);
        echo json_encode($data);
    }
}