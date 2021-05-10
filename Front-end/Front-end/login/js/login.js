$(document).ready(function() {
  $("#btnLogin").click(function() {
    let $user = $("#user").val();
    let $pwd = $("#pwd").val();
    if($user && $pwd) {
      $.getJSON("http://localhost:8080/users", function( $registros ) {
        const user = $registros.find($usuario => $usuario.user === $user && $usuario.pwd === $pwd);
        if(user) {
          localStorage.setItem('user', JSON.stringify(user));
          window.location.replace("../index.html");
        }
        else 
          alert("Usuário inválido")
      });
    }
    else  
      alert("Erro: Favor informar o usuário e senha");
  })
});