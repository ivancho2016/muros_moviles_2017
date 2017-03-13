<?php 

$errores = '';
$enviado = '';

if (isset($_POST['submit'])) {
	$nombre = $_POST['nombre'];
	$email = $_POST['email'];
	$mensaje = $_POST['mensaje'];

	if (!empty($nombre)) {
		$nombre = trim($nombre);
		$nombre = filter_var($nombre, FILTER_SANITIZE_STRING);
	} else {
		$errores .= 'Por favor ingresa un nombre <br/>';
	}

	if (!empty($email)) {
		$email = filter_var($email, FILTER_SANITIZE_EMAIL);

		if(!filter_var($email, FILTER_VALIDATE_EMAIL)) {
			$errores .= "Por favor ingresa un email valido <br/>";
		}
	} else {
		$errores .= 'Por favor ingresa un email <br/>';
	}

	if (!empty($mensaje)) {
		$mensaje = htmlspecialchars($mensaje);
		$mensaje = trim($mensaje);
		$mensaje = stripslashes($mensaje);
	} else {
		$errores .= 'Por favor ingresa el mensaje <br/>';
	}

	if (!$errores) {
		$enviar_a = 'leodan_hijo@hotmail.com';
		$asunto = 'email enviado desde mi página web';
		$mensaje = "De:  $nombre \n";
		$mensaje .= "email:  $email \n";
		$mensaje .= "Mensaje: " . $mensaje;

		mail($enviar_a, $asunto, $mensaje_preparado);
		$enviado = true;
	}

}

// Esto llamara a la vista del index, que contiene el formulario
require 'contactanos.html';

?>