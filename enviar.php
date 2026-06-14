<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $mensagem = trim($_POST["mensagem"]);
    $destino = "contato@differentpipocas.com.br";
    $assunto = "Mensagem enviada pelo site";
    $headers = "From: contato@differentpipocas.com.br\r\n" .
               "Reply-To: contato@differentpipocas.com.br\r\n" .
               "Content-Type: text/plain; charset=UTF-8\r\n";

    if (mail($destino, $assunto, $mensagem, $headers)) {
        echo "Mensagem enviada com sucesso!";
    } else {
        echo "Erro ao enviar a mensagem.";
    }
}
?>
