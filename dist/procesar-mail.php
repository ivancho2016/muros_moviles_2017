<?php 

$errores = '';
$enviado = '';

if (isset($_POST['enviar'])) {
	$nombre = $_POST['nombre'];
	$email = $_POST['email'];
	$mensaje = $_POST['mensaje'];

	//nombre
	if (!empty($nombre)) {
		$nombre = trim($nombre);
		$nombre = filter_var($nombre, FILTER_SANITIZE_STRING);
	} else {
		$errores .= '<div>Por favor ingresa tu nombre</div> <br>';
	}

	//email
	if (!empty($email)) {
		$email = filter_var($email, FILTER_SANITIZE_EMAIL);

		if(!filter_var($email, FILTER_VALIDATE_EMAIL)) {
			$errores .= "Por favor ingresa un correo valido <br/>";
		}
	} else {
		$errores .= 'Por favor ingresa un correo <br/>';
	}

	//mensaje
	if (!empty($mensaje)) {
		$mensaje = htmlspecialchars($mensaje);
		$mensaje = trim($mensaje);
		$mensaje = stripslashes($mensaje);
	} else {
		$errores .= 'Por favor ingresa el mensaje <br/>';
	}

	//mensaje mensaje
	if (!$errores) {
		$para = 'jgmuros-moviles@hotmail.es';
		$titulo = 'Mensaje enviado desde murosacusticosgarcia.com.mx';
		$mensajeFinal = "
		  <p>Email desde el sitio web</p>
		  <table>
		    <tr>
		      <td>Nombre: </td><td>$nombre</td>
		    </tr>
		    <tr>
		      <td>Email: </td><td>$email</td>
		    </tr>
		    <tr>
		      <td>Mensaje: </td><td>$mensaje</td>
		    </tr>
		  </table>
		";
		$cabeceras  = 'MIME-Version: 1.0' . "\r\n";
		$cabeceras .= 'Content-type: text/html; charset=iso-8859-1' . "\r\n";

		mail($para, $titulo, $mensajeFinal, $cabeceras);
		//$enviado = true;
		echo "<script language='javascript'>";
		echo "alert('Enviado Correctamente. Gracias')";
		echo "</script>";
	} else {
		echo "<script language='javascript'>";
		echo "alert('Hubo un problema para envíar tu email, intenta más tarde. Gracias')";
		echo "</script>";
	}
}

require 'contactanos.html';

?>