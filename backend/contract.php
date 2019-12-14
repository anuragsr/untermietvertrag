<?php
  include('env.php');
  // ini_set('display_errors', 1);
  // ini_set('display_startup_errors', 1);
  // ini_set("log_errors", 1);
  // ini_set("error_log", __DIR__ . "/php-error.log");
  // error_reporting(E_ALL);

  require_once __DIR__ . '/vendor/autoload.php';
  class Contract extends \Mpdf\Mpdf{

    function __construct($opts){
      parent::__construct($opts);
    }
    
    public function makeDir($path, $perm = 0755){
      return mkdir($path, $perm, true);
    }
    
    public function createPDF($input){
      $name = "Untermietvertrag - ".$input["id"]." Created at ".date("Y-m-d").".pdf";

      $logoPath = '../img/logo.png';
      $footerText.= '<div style="text-align: center; position: fixed; bottom: 0; width: 100%;">';
      $footerText.= '<div style="line-height: 2.65; font-size: 9px;">Kostenlos erstellt mit <a style="color: #00b679;" target="_blank" href="https://www.untermietvertrag.com">www.untermietvertrag.com</a></div>';
      $footerText.= '<img height="20" src="'.$logoPath.'"/>';
      $footerText.= '</div>';
      $footerText.= '<div style="font-weight: bold; position: fixed; bottom: 0; right: 0;">{PAGENO}</div>';

      $this->SetHTMLFooter($footerText);      
      $this->SetAuthor('Untermietvertrag.com');
      $this->SetTitle($name);
      $this->WriteHTML($input["html"]);
      $this->Output(__DIR__ . '/test.pdf', \Mpdf\Output\Destination::FILE);

      $dir = "../upload/".$input["id"];
      if(file_exists($dir)){
        $fileName = $dir."/".$name;
      }else{
        $fileName = "../upload/temp/".$name;
      }
      rename("test.pdf", $fileName);

      Common::respond(array(
        "path" => substr($fileName, 3),
        "name" => $name
      ), "", true);
    }

    public function createHTML($input){
      if(!file_exists("../upload/".$input["id"])){
        $this->makeDir("../upload/".$input["id"]);
      }

      // Save HTML file
      $res = 
      file_put_contents(__DIR__ . "/saved.html", $input["html"])
        &&
      rename("saved.html", "../upload/".$input["id"]."/saved.html");

      if($res){
        Common::respond("", "Erfolgreich gespeichert!", true);
      }else{
        Common::respond("", "Speichern nicht möglich, bitte erneut versuchen!", false);        
      }
    }

    public function getHTML($input){
      if(!file_exists("../upload/".$input["id"])){
        Common::respond("", "Es gibt kein Dokument mit dieser ID!", false);        
      }else{
        Common::respond(file_get_contents("../upload/".$input["id"]."/saved.html"), "", true);        
      }
    }
  }

  $c = new Contract(array(
    'mode' => 'c',
    'default_font_size' => 12,
    'default_font' => 'arial',
    'margin_left' => 20,
    'margin_right' => 20,
    'margin_top' => 25,
    'margin_bottom' => 25,
  ));

  switch ($params["t"]) {
    case 'pdf':
      $c->createPDF($params["d"]);
    break;
    
    case 'save':
      $c->createHTML($params["d"]);
    break;
    
    case 'get':
      $c->getHTML($params["d"]);
    break;
  }
?>