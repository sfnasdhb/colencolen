
let PLAYERS = {};

function getHighscoreFor(addr) {
    return PLAYERS[addr] ? PLAYERS[addr].score : 0;
}

function setHighscoreFor(addr, name, score) {
    if (getHighscoreFor(addr) < score) {
        PLAYERS[addr] = {'name': name, 'score': score}
        return true
    }
    return false
}

function updateSelfHighscore(score) {
    const addr = window.webxdc.selfAddr;
    const name = window.webxdc.selfName;
    if (setHighscoreFor(addr, name, score)) {
        const info = name + ' scored ' + score + ' in Tower Building!';
        const payload = {addr: addr, name: name, score: score};
        window.webxdc.sendUpdate({payload: payload, info: info}, info);
    }
}

function getAllHighscores() {
    return Object.keys(PLAYERS).map((addr) => {
        const player = PLAYERS[addr];
        player.addr = addr;
        return player;
    }).sort((a, b) => b.score - a.score);
}

function escapeHtml(raw) {
    return raw.replace(/[&<>"']/g, function onReplace(match) {
        return '&#' + match.charCodeAt(0) + ';';
    });
}

function getAllHighscoresHtml() {
    var ret = "Top Builders:"
    getAllHighscores().forEach(item => {
        const name = item.name.length > 17 ? item.name.substring(0, 15) + '…' : item.name;
        ret += "<br>" + escapeHtml(name) + " - " + item.score
    });
    return ret;
}
