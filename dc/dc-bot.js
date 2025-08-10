const { Client, GatewayIntentBits } = require('discord.js');

const { execute } = require('../parser/parse.js');
const { settings } = require('../conf/settings.js');

const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent] });
client.once('ready', () => {
    console.log(`✅ 로그인 성공: ${client.user.tag}`);
});
// 메세지 기반 반응
client.on('messageCreate', message => {
    if (message.author.bot) return;

    // 접두어가 없으면 무시
    if (!message.content.startsWith(settings.prefix)) {
        return;
    }

    execute(message, message.content);
});

// 신규 참여자 이벤트
client.on('guideMemberAdd`', message => {
    message.channel.send(`환영합니다, ${message.author.username}! 커뜨개차에 오신 것을 환영합니다!`);
});

// 음성 채팅 이동
client.on('voiceStateUpdate`', args => {
    console.log("args : ", args);
    // message.channel.send(`환영합니다, ${message.author.username}! 커뜨개차에 오신 것을 환영합니다!`);
});

const start = async () => {
    try {
        await client.login(process.env.DISCORD_TOKEN);
        console.log('✅ 봇이 성공적으로 시작되었습니다.');
    } catch (error) {
        throw '❌ 봇 시작 중 오류 발생, 당장은 아마 토큰이 없어서일거에요.';
    }
}

module.exports = { start };