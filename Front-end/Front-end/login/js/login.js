$(document).ready(function() {
  $("#btnLogin").click(function() {
    let $user = $("#user").val();
    let $pwd = $("#pwd").val();
    if($user && $pwd) {
      $.getJSON("http://localhost:8080/users", function( $registros ) {
        if($registros.filter($usuario => $usuario.user === $user && $usuario.pwd === $pwd).length > 0)
          window.location.replace("../index.html");
        else 
          alert("Usuário inválido")
      });
    }
    else  
      alert("Erro: Favor informar o usuário e senha");
  })
});