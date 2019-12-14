<?php
  require_once __DIR__ . '/vendor/autoload.php';

  // include('PDF/tcpdf.php');
  $pdf = new \Mpdf\Mpdf(array(
    'mode' => 'c',
    'default_font_size' => 12,
    'default_font' => 'arial',
    // 'defaultPageNumStyle' => 'a',
    'margin_left' => 20,
    'margin_right' => 20,
    'margin_top' => 25,
    'margin_bottom' => 25,
  ));
  // $pdf->setFooter('{PAGENO}');
  $inputPath = '../img/logo.png';
  $footerText.= '<div style="text-align: center; position: fixed; bottom: 0; width: 100%;">';
  $footerText.= '<div style="line-height: 2;">Kostenlos erstellt mit <a style="color: #00b679;" target="_blank" href="https://www.untermietvertrag.com">www.untermietvertrag.com</a></div>';
  $footerText.= '<img height="20" src="'.$inputPath.'"/>';
  $footerText.= '</div>';
  $footerText.= '<div style="font-weight: bold; position: fixed; bottom: 0; right: 0;">{PAGENO}</div>';

  $pdf->SetHTMLFooter($footerText);
  $name = "Temp";
  $pdf->SetAuthor('Untermietvertrag.com');
  $pdf->SetTitle($name);
  $html = '<div>Die Wohnung des Hauptmieters befindet sich in der 
      <span style="font-weight: bold;">This text is supposed to space properly but is overlapping.</span>
      in <span style="font-weight: bold;">I don\'t know why, can anyone help me here?</span>
      in der <span style="font-weight: bold;">It would be greatly appreciated.</span>
      Etage. Es wird ein Raum zu Wohnzwecken und zur ausschließlichen Nutzung an 
      den Untermieter vermietet. Der Vermieter hat der Untervermietung schriftlich zugestimmt.      
    </div><br/><br/><div>Die Wohnung des Hauptmieters befindet sich in der 
      <span style="font-weight: bold;">This text is supposed to space properly but is overlapping.</span>
      in <span style="font-weight: bold;">I don\'t know why, can anyone help me here?</span>
      in der <span style="font-weight: bold;">It would be greatly appreciated.</span>
      Etage. Es wird ein Raum zu Wohnzwecken und zur ausschließlichen Nutzung an 
      den Untermieter vermietet. Der Vermieter hat der Untervermietung schriftlich zugestimmt.      
    </div><br/><br/><div>Die Wohnung des Hauptmieters befindet sich in der 
      <span style="font-weight: bold;">This text is supposed to space properly but is overlapping.</span>
      in <span style="font-weight: bold;">I don\'t know why, can anyone help me here?</span>
      in der <span style="font-weight: bold;">It would be greatly appreciated.</span>
      Etage. Es wird ein Raum zu Wohnzwecken und zur ausschließlichen Nutzung an 
      den Untermieter vermietet. Der Vermieter hat der Untervermietung schriftlich zugestimmt.      
    </div><br/><br/><div>Die Wohnung des Hauptmieters befindet sich in der 
      <span style="font-weight: bold;">This text is supposed to space properly but is overlapping.</span>
      in <span style="font-weight: bold;">I don\'t know why, can anyone help me here?</span>
      in der <span style="font-weight: bold;">It would be greatly appreciated.</span>
      Etage. Es wird ein Raum zu Wohnzwecken und zur ausschließlichen Nutzung an 
      den Untermieter vermietet. Der Vermieter hat der Untervermietung schriftlich zugestimmt.      
    </div><br/><br/><div>Die Wohnung des Hauptmieters befindet sich in der 
      <span style="font-weight: bold;">This text is supposed to space properly but is overlapping.</span>
      in <span style="font-weight: bold;">I don\'t know why, can anyone help me here?</span>
      in der <span style="font-weight: bold;">It would be greatly appreciated.</span>
      Etage. Es wird ein Raum zu Wohnzwecken und zur ausschließlichen Nutzung an 
      den Untermieter vermietet. Der Vermieter hat der Untervermietung schriftlich zugestimmt.      
    </div><br/><br/><div>Die Wohnung des Hauptmieters befindet sich in der 
      <span style="font-weight: bold;">This text is supposed to space properly but is overlapping.</span>
      in <span style="font-weight: bold;">I don\'t know why, can anyone help me here?</span>
      in der <span style="font-weight: bold;">It would be greatly appreciated.</span>
      Etage. Es wird ein Raum zu Wohnzwecken und zur ausschließlichen Nutzung an 
      den Untermieter vermietet. Der Vermieter hat der Untervermietung schriftlich zugestimmt.      
    </div><br/><br/><div>Die Wohnung des Hauptmieters befindet sich in der 
      <span style="font-weight: bold;">This text is supposed to space properly but is overlapping.</span>
      in <span style="font-weight: bold;">I don\'t know why, can anyone help me here?</span>
      in der <span style="font-weight: bold;">It would be greatly appreciated.</span>
      Etage. Es wird ein Raum zu Wohnzwecken und zur ausschließlichen Nutzung an 
      den Untermieter vermietet. Der Vermieter hat der Untervermietung schriftlich zugestimmt.      
    </div><br/><br/><div>Die Wohnung des Hauptmieters befindet sich in der 
      <span style="font-weight: bold;">This text is supposed to space properly but is overlapping.</span>
      in <span style="font-weight: bold;">I don\'t know why, can anyone help me here?</span>
      in der <span style="font-weight: bold;">It would be greatly appreciated.</span>
      Etage. Es wird ein Raum zu Wohnzwecken und zur ausschließlichen Nutzung an 
      den Untermieter vermietet. Der Vermieter hat der Untervermietung schriftlich zugestimmt.      
    </div><br/><br/><div>Die Wohnung des Hauptmieters befindet sich in der 
      <span style="font-weight: bold;">This text is supposed to space properly but is overlapping.</span>
      in <span style="font-weight: bold;">I don\'t know why, can anyone help me here?</span>
      in der <span style="font-weight: bold;">It would be greatly appreciated.</span>
      Etage. Es wird ein Raum zu Wohnzwecken und zur ausschließlichen Nutzung an 
      den Untermieter vermietet. Der Vermieter hat der Untervermietung schriftlich zugestimmt.      
    </div><br/><br/><div>Die Wohnung des Hauptmieters befindet sich in der 
      <span style="font-weight: bold;">This text is supposed to space properly but is overlapping.</span>
      in <span style="font-weight: bold;">I don\'t know why, can anyone help me here?</span>
      in der <span style="font-weight: bold;">It would be greatly appreciated.</span>
      Etage. Es wird ein Raum zu Wohnzwecken und zur ausschließlichen Nutzung an 
      den Untermieter vermietet. Der Vermieter hat der Untervermietung schriftlich zugestimmt.      
    </div><br/><br/><div>Die Wohnung des Hauptmieters befindet sich in der 
      <span style="font-weight: bold;">This text is supposed to space properly but is overlapping.</span>
      in <span style="font-weight: bold;">I don\'t know why, can anyone help me here?</span>
      in der <span style="font-weight: bold;">It would be greatly appreciated.</span>
      Etage. Es wird ein Raum zu Wohnzwecken und zur ausschließlichen Nutzung an 
      den Untermieter vermietet. Der Vermieter hat der Untervermietung schriftlich zugestimmt.      
    </div><br/><br/><div>Die Wohnung des Hauptmieters befindet sich in der 
      <span style="font-weight: bold;">This text is supposed to space properly but is overlapping.</span>
      in <span style="font-weight: bold;">I don\'t know why, can anyone help me here?</span>
      in der <span style="font-weight: bold;">It would be greatly appreciated.</span>
      Etage. Es wird ein Raum zu Wohnzwecken und zur ausschließlichen Nutzung an 
      den Untermieter vermietet. Der Vermieter hat der Untervermietung schriftlich zugestimmt.      
    </div><br/><br/>';
  $pdf->WriteHTML($html);
  $pdf->Output(__DIR__ . '/test.pdf', \Mpdf\Output\Destination::INLINE);

  // $pdf->SetCreator(PDF_CREATOR);
  // $pdf->SetAuthor('test');
  // $pdf->SetTitle("test");
  // $pdf->setPrintHeader(false);
  // $pdf->setPrintFooter(false);
  // $pdf->SetDefaultMonospacedFont(PDF_FONT_MONOSPACED);
  // $pdf->SetMargins(20, PDF_MARGIN_TOP, 20);
  // $pdf->SetHeaderMargin(PDF_MARGIN_HEADER);
  // $pdf->SetFooterMargin(PDF_MARGIN_FOOTER);
  // $pdf->SetAutoPageBreak(TRUE, PDF_MARGIN_BOTTOM);
  // $pdf->setImageScale(PDF_IMAGE_SCALE_RATIO);
  // $pdf->SetFont('dejavusans', '', 12);
  // $pdf->SetFont('helvetica', '', 12, '', true);
  // $pdf->AddPage(); 
  // $html = '<div>Die Wohnung des Hauptmieters befindet sich in der 
  //     <span style="font-weight: bold;">This text is supposed to space properly but is overlapping.</span>
  //     in <span style="font-weight: bold;">I don\'t know why, can anyone help me here?</span>
  //     in der <span style="font-weight: bold;">It would be greatly appreciated.</span>
  //     Etage. Es wird ein Raum zu Wohnzwecken und zur ausschließlichen Nutzung an 
  //     den Untermieter vermietet. Der Vermieter hat der Untervermietung schriftlich zugestimmt.      
  //   </div>';
  // $pdf->writeHTML($html, true, false, true, false, 'L');
  // $pdf->Output(__DIR__ . '/test.pdf', 'I');    
?>