const { Client, GatewayIntentBits } = require('discord');

const { parse } = require('/parser/parse');

const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent] });

client.once('ready', () => {
    console.log(`✅ 로그인 성공: ${client.user.tag}`);
});

// 메세지 기반 반응
client.on('messageCreate', message => {
    if (message.author.bot) return;

    parse(message);

    // if (message.content === '!knock') {
    //     message.channel.send("누가 거기 있나요? 👀\n(봇이 잘 동작 중 이에요!)");
    // } else if (message.content === '!ping') {
    //     message.reply('🏓 Pong!');
    // } else if (message.content === '!welcome') {
    //     message.channel.send("커뜨개차 채널에 오신 것을 환영합니다!\n아래 규칙을 잘 읽어주세요.\n사실 규칙은 없습니다!");
    //
    // } else if (message.content === '!add') {
    //     console.log("message : ", message);
    //     //TODO, 신규 customize command를 추가 합니다.
    // } else if (message.content === '!remove') {
    //     console.log("message : ", message);
    //     //TODO, customize command를 제거 합니다.
    // } else if (message.content === '!help') {
    // }
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
        throw '❌ 봇 시작 중 오류 발생:';
    }
}

module.exports = { start };