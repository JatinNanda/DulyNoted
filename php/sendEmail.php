<?php
  require_once('libs/PHPMailer-master/class.phpmailer.php');
  require('libs/PHPMailer-master/PHPMailerAutoload.php');
  require('libs/fpdf17/fpdf.php');
  $data = _POST['textdata'];
  $pdf = new FPDF();
  $pdf->AddPage();
  $pdf->SetFont('Arial','B',16);
  $pdf->Cell(20,20, $data);
  $content = $pdf->Output('File.pdf','F');
  $email = new PHPMailer();
  $email->IsSMTP();
  $email->SMTPDebug = true;
  $email->CharSet = 'UTF-8';
  $email->Host = '74.125.22.108';
  $email->SMTPAuth= true;
  $email->Port = 587; // Or 587
  $email->Username= 'ghiblade';
  $email->Password= 'sparta300';
  $email->SMTPSecure = 'tls';
  $email->From      = 'ghiblade@gmail.com';
  $email->FromName  = 'Bilbo';
  $email->Subject   = 'Bernard';
  $email->Body      = 'ThetextOFLife';
  $email->AddAddress('mdutta7@gatech.edu');

  $file_to_attach = '/Users/manavdutta1/Downloads/HackDuke/File.pdf';

  $email->AddAttachment($file_to_attach , 'File.pdf' );
  if(!$email->send()){
      echo "Mailer Error: " . $email->ErrorInfo;
  }else{
      echo "E-Mail has been sent";
   }
  return $email->Send();
?>
