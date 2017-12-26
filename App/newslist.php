<?php
class newslist{
    function __construct()
    {
        $obj=new db();
        $this->mysql = $obj->mysql;
    }
    function index(){
        include 'App/views/newslist.html';
    }
    function centerSelect(){
        $sql = "select * from gonglue where type =4";
        $result = $this->mysql -> query($sql);
        $data = $result->fetch_all(MYSQL_ASSOC);
        echo json_encode($data);
    }
    function listpage(){
        $totle = $this->mysql->query("select count(*) as totle from gonglue where type = 5")->fetch_assoc()['totle'];
        echo $totle;
    }
    function listCollect(){
        $page = isset($_GET['page'])?$_GET['page']:1;
        $num = 3;
        $offset = ($page-1)*$num;

        $sql = "select * from gonglue where type = 5 limit $offset,$num";
        $result = $this->mysql -> query($sql);
        $data = $result->fetch_all(MYSQL_ASSOC);

        echo json_encode($data);
    }
}