const { Client, GatewayIntentBits } = require("discord.js");
const express = require("express");

// Servidor Express para manter o Render vivo
const app = express();
const PORT = process.env.PORT || 3000;
app.get("/", (req, res) => res.send("Bot está ativo ✅"));
app.listen(PORT, () => console.log(`🌐 Servidor web rodando na porta ${PORT}`));

// Teste de variáveis de ambiente
console.log("TOKEN encontrado?", !!process.env.TOKEN);
console.log("CHANNEL_ID encontrado?", !!process.env.CHANNEL_ID);

// Criar cliente do Discord
const client = new Client({
  intents: [GatewayIntentBits.Guilds]
});

// Quando o bot entrar online
client.once("ready", () => {
  console.log(`✅ Bot online como ${client.user.tag}`);
});

// Login do bot
if (!process.env.TOKEN) {
  console.error("❌ TOKEN não configurado!");
  process.exit(1);
}

client.login(process.env.TOKEN).catch(err => {
  console.error("❌ Erro ao logar no Discord:", err);
});
