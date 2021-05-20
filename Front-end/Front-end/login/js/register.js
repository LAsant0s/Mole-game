
$(document).ready(function() {
  $("#btnCadastro").click(function() {
    let $user = $("#user").val();
    let $pwd = $("#pwd").val();
    if($user && $pwd) {
      setUsers($user, $pwd);
    }
    else
      $(".registered").css("display", "none");
      $(".userExists").css("display", "none");
      $(".blackUser").css("display", "block");
      //alert("Erro: Favor informar o usuário e senha");
  })
});

function setUsers($user, $pass) {
  verifyUser($user, $pass);
}

function verifyUser($user, $pass) {
  $.getJSON("http://localhost:8080/users", function( $registros ) {
    const user = $registros.find($usuario => $usuario.user === $user && $usuario.pwd === $pass);
    if(user) {
      $(".blackUser").css("display", "none");
      $(".registered").css("display", "none");
      $(".userExists").css("display", "block");
      return;
    }
    else {
      let data = {"user": $user, "pwd": $pass};
      let url = "http://localhost:8080/users/newUser";
      axios.post(url, data);
      $(".blackUser").css("display", "none");
      $(".userExists").css("display", "none");
      $(".registered").css("display", "block");
      return;
    }
  });
}