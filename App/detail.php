<?php
class detail{
    function __construct()
    {
        $obj=new db();
        $this->mysql = $obj->mysql;
    }
    function index(){
        include 'App/views/detail.html';
    }
    function select(){
        $gid = $_REQUEST['gid'];
        $sql = "select glextra.*,gonglue.* from glextra,gonglue where gonglue.gid=glextra.gid and glextra.gid = $gid ";
        $data = $this->mysql->query($sql)->fetch_all(1);
        echo json_encode($data);
    }
    function page(){
        $gid = $_REQUEST['gid'];
        $totle = $this->mysql->query("select count(*) as totle from comment where gid = $gid")->fetch_assoc()['totle'];
        echo $totle;
    }
    function commentCollect(){
        $gid = $_REQUEST['gid'];
        $page = isset($_GET['page'])?$_GET['page']:1;
        $num = 3;
        $offset = ($page-1)*$num;

        $sql = "select * from comment where gid = $gid ORDER BY cid DESC limit $offset,$num ";
        $result = $this->mysql -> query($sql);
        $data = $result->fetch_all(MYSQL_ASSOC);

        echo json_encode($data);
    }
    function insert(){
        $gid = $_REQUEST['gid'];
        $content = $_REQUEST['message'];
        $sql="insert into comment (user,gid,cthumb,content) VALUES ('匿名',$gid,'/visit/upload/17-12-14/01b67b5741dae26ac725ac3f506020.jpg@900w_1l_2o.jpeg','{$content}')";
        $this->mysql -> query($sql);
        if($this->mysql->affected_rows){
            echo 'ok';
            exit();
        }else{
            echo 'error';
        }
    }
    ////////////////////////////////////上一篇////////////////////////////
    function allSelect(){
        $type = $_REQUEST['type'];
        $sql="select * from gonglue where type = $type";
        $data = $this->mysql->query($sql)->fetch_all(1);
        echo json_encode($data);
    }
    function change(){
        $gid = $_REQUEST['gid'];
        $sql = "select glextra.*,gonglue.* from glextra,gonglue where gonglue.gid=glextra.gid and glextra.gid = $gid ";
        $data = $this->mysql->query($sql)->fetch_all(1);
        echo json_encode($data);
    }
    function change1(){
        $gid = $_REQUEST['gid1'];
        $sql = "select glextra.*,gonglue.* from glextra,gonglue where gonglue.gid=glextra.gid and glextra.gid = $gid ";
        $data = $this->mysql->query($sql)->fetch_all(1);
        echo json_encode($data);
    }
}