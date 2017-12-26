<?php
if(is_uploaded_file($_FILES['file']['tmp_name'])){
    if(!file_exists('upload')){
        mkdir('upload');
    }
}
if(!file_exists('upload/'.date('y-m-d'))){
    mkdir('upload/'.date('y-m-d'));
}
$path = 'upload/'.date('y-m-d').'/'.$_FILES['file']['name'];

if(move_uploaded_file($_FILES['file']['tmp_name'],$path)){
    echo '/visit/'.$path;
}