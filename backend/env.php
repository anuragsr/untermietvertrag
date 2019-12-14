<?php
  header('Access-Control-Allow-Origin: *');
  header('Access-Control-Allow-Headers: Content-Type');
  header('Access-Control-Allow-Methods: GET, POST, OPTIONS');

  class Common{
    public static function respond($data, $message, $result){
      echo json_encode(array(
        "data" => $data,
        "message" => $message,
        "result" => $result
      ));
    }
  }

  $params = json_decode($_REQUEST["params"], true);  
  
  // Choose an env -> ["local", "eca", "prod"]
  // $envtype = "eca";
?>