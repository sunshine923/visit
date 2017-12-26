<?php
class db{
    public $mysql;
    function __construct()
    {
        $this->config();
    }
    function config(){
        $this->mysql =  new mysqli('rm-uf67944189w34o6pnqo.mysql.rds.aliyuncs.com','root','pyt931028!','tour',3306);
        $this->mysql->query('set names utf8');
    }
}