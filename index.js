// =========================
// Importações
// =========================
const { Client, GatewayIntentBits, EmbedBuilder } = require("discord.js");
const cron = require("node-cron");
const express = require("express");

// =========================
// Criar cliente do Discord
// =========================
const client = new Client({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages]
});

// =========================
// Servidor web para UptimeRobot
// =========================
const app = express();

app.get("/", (req, res) => {
  res.send("Bot está ativo! ✅");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🌐 Servidor web rodando na porta ${PORT}`);
});

// =========================
// Função para enviar a mensagem
// =========================
async function enviarMensagem() {
  try {
    const channel = await client.channels.fetch(process.env.CHANNEL_ID);
    if (!channel) return console.log("⚠️ Canal não encontrado.");

    const embed = new EmbedBuilder()
      .setColor("#FFEC00")
      .setDescription(
        `Siga as regras, mantenha o respeito e a humildade. Suas palavras são monitoradas constantemente por todos os participantes da comunidade, evite denúncias e banimento.\n\nQualquer ocorrência abra um Ticket no canal <#1360720462518157514>`
      );

    await channel.send({ embeds: [embed] });
    console.log("📨 Mensagem enviada com sucesso!");
  } catch (error) {
    console.error("❌ Erro ao enviar a mensagem:", error);
  }
}

// =========================
// Quando o bot estiver online
// =========================
client.once("ready", async () => {
  console.log(`✅ Bot online como ${client.user.tag}`);

  // Envio imediato de teste
  await enviarMensagem();

  // Agendar mensagem todo dia às 00:00
  cron.schedule(
    "0 0 * * *",
    enviarMensagem,
    { timezone: "America/Sao_Paulo" }
  );
});

// =========================
// Login do bot com tratamento de erro
// =========================
if (!process.env.TOKEN) {
  console.error("❌ TOKEN do Discord não encontrado nas variáveis de ambiente!");
  process.exit(1);
}

client.login(process.env.TOKEN).catch((err) => {
  console.error("❌ Falha ao logar no Discord:", err);
  process.exit(1);
});

// =========================
// Log para reconexões e erros
// =========================
client.on("error", (err) => console.error("Discord client error:", err));
client.on("warn", (warn) => console.warn("Discord client warning:", warn));
client.on("disconnect", (event) => console.log("Discord client desconectado:", event));
