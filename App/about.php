<?php

class about{
    function __construct()
    {
        $obj=new db();
        $this->mysql = $obj->mysql;
    }
    function index(){
        include 'App/views/about.html';
    }
    //////////获取列表////////////
    function queryList(){
        $sql="select * from about where type=1";
        $data=$this->mysql->query($sql)->fetch_all(1);
        echo json_encode($data);

    }
    ///////获取列表内容/////////////
    function listContent(){
        $aid = $_REQUEST['aid'];
        $sql="select * from about where aid=$aid";
        $result=$this->mysql->query($sql)->fetch_assoc();
        echo json_encode($result);
    }
    ////////////获取企业文化/////////////
    function  queryCom(){
        $sql="select * from about where type=2";
        $data=$this->mysql->query($sql)->fetch_assoc();
        echo json_encode($data);
    }
    //////获取视频/////////////////////
    function  queryVideo(){
        $sql="select * from video";
        $data=$this->mysql->query($sql)->fetch_all(1);
        echo json_encode($data);
    }

}