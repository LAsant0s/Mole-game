
$(document).ready(function() {
  $("#btnCadastro").click(function() {
    let $user = $("#user").val();
    let $pwd = $("#pwd").val();
    if($user && $pwd) {
      setUsers($user, $pwd);
    }
    else  
      alert("Erro: Favor informar o usuário e senha");
  })
});

function setUsers($user, $pass) {
  let data = {"user": $user, "pwd": $pass};
  let url = "http://localhost:8080/";
  axios.post(url, data);
}