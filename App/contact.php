<?php
class contact{
    public $db;
    function __construct()
    {
        $obj = new db();
        $this->db = $obj->mysql;
    }
    function index(){
        include 'App/views/contact.html';
    }
    function select(){
        $sql = "select * from contact";
        $result =  $this->db->query($sql);
        $data =  [];
        while($row = $result->fetch_assoc()){
            array_push($data,$row);
        }
        echo  json_encode($data);
    }
    function head(){
        $sql = "select * from menu";
        $result =  $this->db->query($sql);
        $data =  [];
        while($row = $result->fetch_assoc()){
            array_push($data,$row);
        }
        echo  json_encode($data);
    }
    function insert(){
        $data = $_POST;
        $keys = array_keys($data);
        $str = '(';

        for ($i=0;$i<count($keys);$i++){
            $str .= $keys[$i].',';
        }
        $str = substr($str,0,-1);
        $str.=') values (';

        foreach ($data as $v){
            $str .= "'{$v}',";
        }
        $str = substr($str,0,-1);
        $str .= ')';

        $sql = "insert into message $str";
        $this->db->query($sql);
        if($this->db->affected_rows){
            echo 'ok';
        }else{
            echo 'error';
        }
    }
}