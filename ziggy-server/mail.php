<?php

require 'PHPMailer/PHPMailerAutoload.php';

// Read incoming JSON
$json = file_get_contents('php://input');
$data = json_decode($json);

$body = $data->html;

// Mail Settings
$smtp_secure = 'ssl';
$mail_host = 'mail.ziggycomidanatural.com.br';
$mail_port = 465;
$mail_user = 'contato@ziggycomidanatural.com.br';
$mail_pass = 'D[?0w0D2zN,u';

// Mail Sender
$sender_email = 'contato@ziggycomidanatural.com.br';
$sender_name = 'Ziggy Comida Natural';

// Mail Receiver
$receiver_email = 'antoniolebla@gmail.com';
$receiver_name = 'Antonio Leblanc';


// SENDING EMAIL
$mail = new PHPMailer;
$mail->isSMTP();
$mail->SMTPAuth = true;

$mail->SMTPSecure = $smtp_secure;
$mail->Host = $mail_host;
$mail->Port = $mail_port;
$mail->Username = $mail_user;
$mail->Password = $mail_pass;

$mail->isHTML(true);
$mail->setFrom($sender_email, $sender_name);
$mail->addAddress($receiver_email, $receiver_name);
// $mail->addReplyTo('info@example.com', 'Information');

$mail->Subject = "Pedido de Plano";
$mail->Body = $body;
$mail->AltBody = 'This is the body in plain text for non-HTML mail clients';

if(!$mail->send()) {
    echo 'Message could not be sent.';
    echo 'Mailer Error: ' . $mail->ErrorInfo;
} else {
    echo 'Email do plano enviado';
}

?>