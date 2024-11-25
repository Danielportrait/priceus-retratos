let multiplicador = 1;
let deslocamento = 0;
let desconto = 0;

// Função para ajustar o multiplicador de preço de acordo com o dia da semana
function calcularMultiplicador() {
  const radio = document.querySelector('input[name="diaEnsaio"]:checked');
  if (radio) {
    multiplicador = parseFloat(radio.value) || 1; // Define como 1 se nenhum valor for encontrado
  }
  calcularValorTotal();
}

// Função para ajustar o valor do deslocamento conforme a cidade escolhida
function calcularDeslocamento() {
  const radio = document.querySelector('input[name="cidadeEnsaio"]:checked');
  if (radio) {
    deslocamento = parseFloat(radio.value) || 0; // Define como 0 se nenhum valor for encontrado
    console.log("Deslocamento atualizado:", deslocamento); // Log para depuração
  } else {
    deslocamento = 0; // Garantir que o deslocamento será 0 caso nenhuma cidade seja selecionada
    console.log("Nenhuma cidade selecionada. Deslocamento é 0.");
  }
  calcularValorTotal(); // Atualizar o valor total após o deslocamento ser ajustado
}

// Função para calcular o valor total, incluindo pacotes, looks, hora extra, deslocamento e multiplicador
function calcularValorTotal() {
  const radioPacote = document.querySelector('input[name="pacote"]:checked');
  const radioLook = document.querySelector('input[name="look"]:checked');
  const radioHoraExtra = document.querySelector('input[name="hora"]:checked');

  let total = 0;

  // Adiciona o valor do pacote
  if (radioPacote) {
    total += parseFloat(radioPacote.value) * multiplicador;
  }

  // Adiciona o valor do look extra
  if (radioLook) {
    total += parseFloat(radioLook.value);
  }

  // Adiciona o valor da hora extra
  if (radioHoraExtra) {
    total += parseFloat(radioHoraExtra.value);
  }

  // Adiciona o valor de deslocamento
  total += deslocamento;

  console.log("Valor total atualizado com deslocamento:", total); // Log para depuração

  // Atualiza a exibição na página
  document.getElementById("valorTotalFinal").textContent = `Valor total do pacote: R$ ${total.toFixed(2)}`;

  // Divide o pagamento (50% agora, 50% no dia)
  const entrada = (total * 0.5).toFixed(2);
  const restante = (total * 0.5).toFixed(2);
  document.getElementById("pagamentoDetalhes").textContent = `Pague R$ ${entrada} agora para agendar e R$ ${restante} no dia do ensaio.`;
}

// Função para enviar as informações pelo WhatsApp
function enviarWhatsApp() {
  // 1. Dados do Cliente
  const nomeCliente = document.getElementById("nomeCliente").value;
  const email = document.getElementById("email").value;
  const idade = document.getElementById("idade").value;
  const whatsapp = document.getElementById("whatsapp").value;

  if (!nomeCliente || !email || !idade || !whatsapp) {
    alert("Por favor, preencha seu nome, e-mail, idade e WhatsApp.");
    return;
  }

  // 2. Cidade do ensaio
  const cidadeRadio = document.querySelector('input[name="cidadeEnsaio"]:checked');
  const cidade = cidadeRadio ? cidadeRadio.parentNode.textContent.trim() : "Cidade não informada";
  const valorDeslocamento = cidadeRadio ? parseFloat(cidadeRadio.value) : 0;

  // 3. Dia da semana ou fim de semana
  const diaRadio = document.querySelector('input[name="diaEnsaio"]:checked');
  const diaEscolhido = diaRadio ? diaRadio.parentNode.textContent.trim() : "Dia não informado";

  // 4. Tipo de ensaio
  const tipoEnsaioRadio = document.querySelector('input[name="tipoEnsaio"]:checked');
  const tipoEnsaio = tipoEnsaioRadio ? tipoEnsaioRadio.parentNode.textContent.trim() : "Tipo de ensaio não informado";

  // 5. Pacote escolhido
  const pacoteRadio = document.querySelector('input[name="pacote"]:checked');
  const pacoteDescricao = pacoteRadio ? pacoteRadio.dataset.descricao : "Pacote não especificado";
  const valorPacote = pacoteRadio ? parseFloat(pacoteRadio.value) : 0;

  // 6. Look extra
  const lookRadio = document.querySelector('input[name="look"]:checked');
  const lookDescricao = lookRadio ? lookRadio.dataset.descricao : "Sem look extra";
  const valorLook = lookRadio ? parseFloat(lookRadio.value) : 0;

  // 7. Hora extra
  const horaRadio = document.querySelector('input[name="hora"]:checked');
  const horaDescricao = horaRadio ? horaRadio.dataset.descricao : "Sem hora extra";
  const valorHora = horaRadio ? parseFloat(horaRadio.value) : 0;

  // 8. Horário do ensaio
  const horarioRadio = document.querySelector('input[name="horarioEnsaio"]:checked');
  const horarioEnsaio = horarioRadio ? horarioRadio.parentNode.textContent.trim() : "Horário não informado";

  // Calcular valor total
  let total = valorPacote * multiplicador + valorLook + valorHora + valorDeslocamento;

  // Dividir o pagamento (50% agora e 50% no dia)
  const valorAgendamento = (total * 0.5).toFixed(2);
  const valorRestante = (total * 0.5).toFixed(2);

  // Mensagem formatada
  let mensagem = `Olá, ${nomeCliente}! Aqui está o resumo das suas escolhas para o ensaio:\n\n`;
  mensagem += `1️⃣ Nome: ${nomeCliente}\n📧 E-mail: ${email}\n🔢 Idade: ${idade}\n📱 WhatsApp: ${whatsapp}\n\n`;
  mensagem += `2️⃣ Cidade do ensaio: ${cidade}\n💰 Valor deslocamento: R$ ${valorDeslocamento.toFixed(2)}\n\n`;
  mensagem += `3️⃣ Dia escolhido: ${diaEscolhido}\n\n`;
  mensagem += `4️⃣ Tipo de ensaio: ${tipoEnsaio}\n\n`;
  mensagem += `5️⃣ Pacote escolhido: ${pacoteDescricao}\n💰 Valor do pacote: R$ ${valorPacote.toFixed(2)}\n\n`;
  mensagem += `6️⃣ Look extra: ${lookDescricao}\n💰 Valor look extra: R$ ${valorLook.toFixed(2)}\n\n`;
  mensagem += `7️⃣ Hora extra: ${horaDescricao}\n💰 Valor hora extra: R$ ${valorHora.toFixed(2)}\n\n`;
  mensagem += `8️⃣ Horário do ensaio: ${horarioEnsaio}\n\n`;
  mensagem += `💸 Valor total: R$ ${total.toFixed(2)}\n\n`;
  mensagem += `💳 *Forma de pagamento*: 50% no agendamento e 50% no dia do ensaio.\n`;
  mensagem += `📌 Valor para agendamento (via PIX): R$ ${valorAgendamento}\n`;
  mensagem += `🔑 *Chave PIX*: 34999048840\n`;
  mensagem += `📅 Valor restante a ser pago no dia: R$ ${valorRestante}\n`;

  // Gerar link do WhatsApp
  const url = `https://api.whatsapp.com/send?phone=5534999048840&text=${encodeURIComponent(mensagem)}`;
  console.log("URL gerada:", url); // Debug no console
  window.open(url, "_blank");
}
