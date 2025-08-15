const { OptParser } = require('../parser/parse');

// Invoke될 명령어
methods = {
    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // 기본 명령어
    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    /**
     * Command Name : chat
     * Response : String
     */
    chat : (client, message, channel, args) => {
        if (!message && !args) {
            message = "기록할 내용이 비어 있습니다!";
        } else if (!message) {
            message = args.join("\n");
        }

        console.log("client  : ", client);

        if (channel === "react") {
            client.channel.send(message);
        } else if (channel === "reply") {
            client.reply(message);
        } else if (typeof(channel) === "string") {
            const _channel = client.guild.channels.cache.find(channel => channel.name === channel);

            if (_channel) {
                throw "채널을 찾지 못했습니다.";
            }

            _channel.send(message);
        } else {
            throw "해석할 수 없는 채널 정보입니다.";
        }
    },
    /**
     * Command Name : clear
     * Response : Void
     */
    clear : (client, args) => {
        const options = {};

    },
    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // 커스터마이즈 명령어 설정
    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    /**
     * Command Name : chat
     * Response : String
     */
    set : (args) => {
        let msg = "";

        if (true) {
            msg = "명령어가 정상적으로 추가되었습니다!";
        } else {
            msg = "명령어 추가에 실패했습니다!";
        }

        return msg;
    },
    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // Music Player
    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // Message Broker
    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // Researcher
    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}

// command의 구성
/**
 * {
 *     cmd : "ping",
 *     channel : "react",
 *     // react: default    // 메세지를 보낸 채널을 대상으로 합니다. message.channel.send("채널 메세지");
 *     // reply             // 메세지를 대상으로 합니다. ex) message.reply("답글");
 *     // 그 외              // channel란에 적힌 명칭을 다음과 같이 찾아옵니다.
 *                          // message.guild.channels.cache.find(channel => channel.name === 'name')
 *
 *     execute : "ping",     // 실행될 메소드를 설정합니다, 생략되면 command 이름과 동일하게 설정됩니다. (cmd 속성과 무관)
 *     query : String,       // 명령어에 대한 쿼리 데이터 타입을 지정합니다.
 *     response : String,    // 명령어에 대한 응답 데이터 타입을 지정합니다.
 *     description :         // 명령어에 대한 설명을 작성합니다.
 *     example : []          // 명령어 사용 예시를 작성합니다.
 * }
 */
commands = [
    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // 기초(core) 명령어(기초에 작성되는 execute는 반드시 Function Type 이어야 합니다.)
    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    {
        cmd : "chat",
        channel : "react",
        execute : methods.chat,
        parser : new OptParser({
            "message" : ["-m", "--message"],
            "channel" : ["-c", "--channel"],
        }),
        response : String,
        description : "봇에게 메세지를 남길 것을 요청합니다.",
        example : [
            "!chat \"순대튀김은 정말 맛있는 음식입니다!\"",
        ]
    },
    {
        cmd : "repl",
        channel : "reply",
        execute : methods.repl,
        response : String,
        description : "봇에게 답글을 남길 것을 요청합니다.",
        example : [
            "!repl \"동감입니다!\"",
        ]
    },
    {
        cmd : "set",
        channel : "reply",
        execute : methods.set,
        response : String,
        description : `
            set: 커스터마이즈 명령어를 추가합니다.
            
            -f (기존 명령어의 기능을 덮어쓰거나, 조합된 명령어를 호출합니다.)\n
            -r 그럴 필요 없이 단순히 텍스트를 표현하고자하면 옵션을 사용합니다.(!chat과 동일한 동작을 합니다.)\n
            -c 어느 채널에 게시할 지 설정합니다. (기본값은 react)\n
            -s 명령어의 설명을 작성합니다.\n
            -x 명령어의 예시를 작성합니다.\n
            -d 해당 커스터마이즈 명령어를 삭제합니다.
        `,
        example : [
            "!set new-ping -f 'ping' -c 'react' -s '핑 커맨드를 두 개씩이나 가지고 있을 필요있을까요?'",
            "!set hi -r '반가워요!' -x [\"!hi\"]",
            "!set rm-ping -f '!remove ping' -c 'react' -s '!remove로 불충분했나요?'",
            "!set rm-ping -d", // 커스터마이즈 명령어를 제거합니다.
        ]
    },
    {
        cmd : ["clear"],
        channel : "react",
        execute : "clear",
        response : null,
        description : `
            clear: 채널의 채팅을 지웁니다.
            
            -a 채널의 모든 채팅을 지웁니다.(지정하지 않는 경우 기본적으로 10줄을 삭제합니다.)\n
        `,
        example : "!clear -a"
    },

    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // 기본 명령어
    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    {
        cmd: "knock",
        channel : "react",
        execute : "!chat \"누가 거기 있나요? 👀\n(봇이 잘 동작 중 이에요!)\"", //  생략되면 command 이름과 동일하게 설정됩니다. (cmd 속성과 무관)
        response : String,
        description : "BOT이 온라인 상태인지 확인합니다.",
        example : "!knock"
    },
    {
        cmd : "ping",
        channel : "reply",
        execute : "!repl \"🏓 Pong!\"",
        response : String,
        description : "BOT이 정상적으로 명령어를 송수신하는지 확인합니다.",
        example : "!ping"
    },
    {
        cmd : "welcome",
        channel : "welcome",
        execute : "!chat \"커뜨개차 채널에 오신 것을 환영합니다!\\n아래 규칙을 잘 읽어주세요.\\n사실 아직 규칙은 없습니다!\"",
        response : String,
        description : "신규 유저가 착륙했을 때 인삿말(공지)을 건넵니다.",
        example : "!welcome"
    },
    {
        cmd : ["help", "h"],
        channel : "react",
        execute : "!chat \"명령어 사용법을 불러옵니다, 이 객체에 주석을 포함시켜 pretty 한 json 형태로 제공할까 생각됩니다\"",
        response : String,
        description : "명령어 사용법을 불러옵니다, 이 객체 자체를 pretty 한 json 형태로 제공할까 생각됩니다.",
        example : "!help"
    },
]

let czCommands = {};

(function() {
    // 항상 저장된 cz commands를 불러옵니다.
})();

module.exports = { commands, methods };