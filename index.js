// Importações
const { Client, GatewayIntentBits, EmbedBuilder } = require("discord.js");
const cron = require("node-cron");

// Criar cliente do Discord
const client = new Client({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages]
});

// Quando o bot estiver online
client.once("ready", () => {
  console.log(`✅ Bot online como ${client.user.tag}`);

  // Agendar mensagem todo dia às 00:00
  cron.schedule("0 0 * * *", async () => {
    try {
      const channel = await client.channels.fetch(process.env.CHANNEL_ID);
      if (!channel) return console.log("Canal não encontrado.");

      // Criar Embed
      const embed = new EmbedBuilder()
        .setColor("#FFEC00")
        .setDescription(
          `Siga as regras, mantenha o respeito e a humildade. Suas palavras são monitoradas constantemente por todos os participantes da comunidade, evite denúncias e banimento.\n\nQualquer ocorrência abra um Ticket no canal <#1360720462518157514>`
        );

      await channel.send({ embeds: [embed] });
      console.log("📨 Mensagem enviada com sucesso!");
    } catch (error) {
      console.error("Erro ao enviar a mensagem:", error);
    }
  }, {
    timezone: "America/Sao_Paulo"
  });
});

// Login do bot usando variável de ambiente
client.login(process.env.TOKEN);
