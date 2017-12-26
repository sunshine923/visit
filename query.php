<?php
include 'db.php';
$type = $_REQUEST['type'];
$ids = $_REQUEST['id'];

$id = array_keys($ids);

$tid = $id[0];
$v = $ids[$id[0]];

$data = $mysql->query("select * from $type where $tid = $v")->fetch_assoc();
echo json_encode($data);
