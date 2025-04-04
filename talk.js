const API_KEY = "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";
const apiUrl = "https://api.openai.com/v1/chat/completions";

let mensagens = [];

document.getElementById("enviar-msg").addEventListener("click", async () => {
  const inputMsg = document.getElementById("input-msg").value.trim();
  if (inputMsg !== "") {
    adicionarMensagem("Você", inputMsg);
    document.getElementById("input-msg").value = "";


    const resposta = await obterResposta(inputMsg);
    adicionarMensagem("IA", resposta);
  }
});

async function obterResposta(mensagem) {

    mensagens.push({ role: "user", content: mensagem });

  const bodyData = {
    model: "gpt-3.5-turbo",
    messages: mensagens,
    max_tokens: 150
  };

  try {
    const resposta = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${"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"}`,
      },
      body: JSON.stringify(bodyData)
    });

    const dados = await resposta.json();
    const respostaIA = dados.choices[0].message.content.trim();


    mensagens.push({ role: "assistant", content: respostaIA });

    return respostaIA;
  } catch (error) {
    console.error("Erro ao obter resposta:", error);
    return "Erro ao se comunicar com a IA. Tente novamente.";
  }
}

function adicionarMensagem(remetente, mensagem) {
  const divMsg = document.createElement("div");
  divMsg.textContent = `${remetente}: ${mensagem}`;
  document.getElementById("messages").appendChild(divMsg);
  document.getElementById("chat-box").scrollTop = document.getElementById("chat-box").scrollHeight;
}