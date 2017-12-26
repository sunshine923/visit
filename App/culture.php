<?php

class culture{
    public $db;
    function __construct()
    {
        $obj=new db();
        $this->db=$obj->mysql;
    }
    function index(){
        include 'App/views/culture.html';
    }
    //////////获取文章////////////
    function query(){
        $id = $_REQUEST['id'];
        $sql="select * from culture where id = $id";
        $data=$this->db->query($sql)->fetch_assoc();
        echo json_encode($data);

    }
    function allSelect(){
        $sql="select * from culture";
        $data=$this->db->query($sql)->fetch_all(1);
        echo json_encode($data);
    }
    function queryArticle(){
        $id = $_REQUEST['id'];
        $sql="select culture.*,cultureextra.* from culture,cultureextra where culture.id=cultureextra.id and cultureextra.id=$id";
        $data=$this->db->query($sql)->fetch_all(1);
        echo json_encode($data);

    }
    function change(){
        $id = $_REQUEST['aid'];
        $sql = "select culture.*,cultureextra.* from culture,cultureextra where culture.id=cultureextra.id and  cultureextra.id = $id ";
        $data = $this->db->query($sql)->fetch_all(1);
        echo json_encode($data);
    }
    function change1(){
        $id = $_REQUEST['aid1'];
        $sql = "select culture.*,cultureextra.* from culture,cultureextra where culture.id=cultureextra.id and  cultureextra.id = $id ";
        $data = $this->db->query($sql)->fetch_all(1);
        echo json_encode($data);
    }

}