function gerarMensagemNaTela(msg, color) {
  const body = document.querySelector("body");

  const div = document.createElement("div");
  div.id = "embadmsg";

  const p = document.createElement("p");
  p.innerText = `${msg}`;

  const barraProgresso = document.createElement("div");
  barraProgresso.id = "progress";
  barraProgresso.style.backgroundColor = color;

  div.appendChild(p);
  div.appendChild(barraProgresso);
  body.appendChild(div);

  setTimeout(() => {
    div.classList.add("fadeOut");
    setTimeout(() => div.remove(), 500);
  }, 2000);
}

function validarFormulario() {
  const quantNumeros = document.getElementById("quant").value;
  const letrasMIN = document.getElementById("letrasMIN").checked;
  const letrasMAI = document.getElementById("letrasMAI").checked;
  const numeros = document.getElementById("num").checked;
  const CaracteresEspeciais = document.getElementById("especiais").checked;

  if (quantNumeros < 1) {
    gerarMensagemNaTela(
      "A quantidade de caracteres deve ser maior que 0.",
      "red"
    );
  } else if (!letrasMIN && !letrasMAI && !numeros && !CaracteresEspeciais) {
    gerarMensagemNaTela("Você precisa selecionar ao menos um checkbox.", "red");
  } else {
    gerarSenha(
      quantNumeros,
      letrasMIN,
      letrasMAI,
      numeros,
      CaracteresEspeciais
    );
  }
}

function gerarSenha(
  quantNumeros,
  LetrasMin,
  LetrasMai,
  numeros,
  CaracteresEspeciais
) {
  const minusculas = "abcdefghijklmnopqrstuvwxyz";
  const maiusculas = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const numerosStr = "1234567890";
  const caracteresEspeciaisStr = "!@#$%^&*()-_=+[]{}";

  let caracteresDisponiveis = "";

  if (LetrasMin) caracteresDisponiveis += minusculas;
  if (LetrasMai) caracteresDisponiveis += maiusculas;
  if (numeros) caracteresDisponiveis += numerosStr;
  if (CaracteresEspeciais) caracteresDisponiveis += caracteresEspeciaisStr;

  let senhaArray = caracteresDisponiveis.split("");
  senhaArray = senhaArray.sort(() => Math.random() - 0.5);

  let senhaGerada = senhaArray.slice(0, quantNumeros).join(""); 

  apresentarSenha(senhaGerada);
}

function apresentarSenha(senha) {
  const body = document.querySelector("body");

  const divGeral = document.getElementById("geral");
  divGeral.style.display = "none";

  const div = document.createElement("div");
  div.id = "resSenha";

  const h1 = document.createElement("h1");
  h1.innerText = "Senha Gerada";

  const divSenha = document.createElement("div");
  divSenha.id = "resSenhaDiv";
  divSenha.addEventListener("click", function () {
    navigator.clipboard
      .writeText(senha)
      .then(() => {
        gerarMensagemNaTela("Senha copiada!", "green");
      })
      .catch((err) => {
        gerarMensagemNaTela("Erro ao copiar a senha!", "red");
        console.log(err);
      });
  });

  const h2 = document.createElement("h2");
  h2.innerText = senha;

  const button = document.createElement("button");
  button.innerText = "Voltar";

  button.addEventListener("click", function () {
    divGeral.style.display = "grid";

    div.remove();
  });

  divSenha.appendChild(h2);
  div.appendChild(h1);
  div.appendChild(divSenha);
  div.appendChild(button);

  body.appendChild(div);
}
