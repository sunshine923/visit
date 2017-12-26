<?php
class tour{
    function __construct()
    {
        $obj=new db();
        $this->mysql = $obj->mysql;
    }
    function index(){
        include 'App/views/tour.html';
    }
    //////////////////////热门攻略////////////////////////////
    function hotpage(){
        $totle = $this->mysql->query("select count(*) as totle from gonglue where type = 1")->fetch_assoc()['totle'];
        echo $totle;
    }
    function hotCollect(){
        $page = isset($_GET['page'])?$_GET['page']:1;
        $num = 3;
        $offset = ($page-1)*$num;

        $sql = "select * from gonglue where type = 1 limit $offset,$num";
        $result = $this->mysql -> query($sql);
        $data = $result->fetch_all(MYSQL_ASSOC);

        echo json_encode($data);
    }
    //////////////////////////美食攻略///////////////////////////////
    function foodpage(){
        $totle = $this->mysql->query("select count(*) as totle from gonglue where type = 2")->fetch_assoc()['totle'];
        echo $totle;
    }
    function foodCollect(){
        $page = isset($_GET['page'])?$_GET['page']:1;
        $num = 4;
        $offset = ($page-1)*$num;

        $sql = "select * from gonglue where type = 2 limit $offset,$num";
        $result = $this->mysql -> query($sql);
        $data = $result->fetch_all(MYSQL_ASSOC);

        echo json_encode($data);
    }
    ///////////////////////////////穷游攻略//////////////////////////////////////////////
    function poorpage(){
        $totle = $this->mysql->query("select count(*) as totle from gonglue where type = 3")->fetch_assoc()['totle'];
        echo $totle;
    }
    function poorCollect(){
        $page = isset($_GET['page'])?$_GET['page']:1;
        $num = 3;
        $offset = ($page-1)*$num;

        $sql = "select * from gonglue where type = 3 limit $offset,$num";
        $result = $this->mysql -> query($sql);
        $data = $result->fetch_all(MYSQL_ASSOC);

        echo json_encode($data);
    }
}