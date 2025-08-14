require("dotenv").config();
const { Client, GatewayIntentBits } = require("discord.js");

console.log("TOKEN detectado? ", process.env.TOKEN ? "SIM" : "NÃO");

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

client.on("ready", () => {
  console.log(`✅ Bot online como ${client.user.tag}`);
});

client.login(process.env.TOKEN)
  .then(() => console.log("🔄 Tentando logar no Discord..."))
  .catch(err => console.error("❌ Falha no login:", err));
    process.exit(1);
  });

// servidor express
const app = express();
const PORT = process.env.PORT || 3000;
app.get("/", (req, res) => res.send("Bot está ativo! ✅"));
app.listen(PORT, () => console.log(`🌐 Servidor web rodando na porta ${PORT}`));

// =========================
// Função para enviar mensagem
// =========================
async function enviarMensagem() {
  try {
    console.log("Tentando buscar o canal...");
    const channel = await client.channels.fetch(process.env.CHANNEL_ID);
    if (!channel) {
      console.log("⚠️ Canal não encontrado. Verifique o CHANNEL_ID.");
      return;
    }

    console.log("Canal encontrado, enviando embed...");
    const embed = new EmbedBuilder()
      .setColor("#FFEC00")
      .setDescription(
        `Siga as regras, mantenha o respeito e a humildade. Suas palavras são monitoradas constantemente por todos os participantes da comunidade, evite denúncias e banimento. Para ocorrências abra um Ticket no canal <#1375887183411417239>`,
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

  // Envio de mensagem de teste imediato
  await enviarMensagem();

  // Agendamento diário às 00:00 (horário de São Paulo)
  cron.schedule("0 0 * * *", enviarMensagem, { timezone: "America/Sao_Paulo" });
});

// =========================
// Login do bot
// =========================
if (!process.env.TOKEN) {
  console.error("❌ TOKEN não encontrado!");
  process.exit(1);
}

client.login(process.env.TOKEN).catch((err) => {
  console.error("❌ Falha ao logar no Discord:", err);
  process.exit(1);
});

// =========================
// Logs de erro e desconexão
// =========================
client.on("error", (err) => console.error("Discord client error:", err));
client.on("warn", (warn) => console.warn("Discord client warning:", warn));
client.on("disconnect", (event) =>
  console.log("Discord client desconectado:", event),
);
