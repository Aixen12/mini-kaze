import fs from 'fs'

const command = {
    command: ['ppt', 'piedra', 'papel', 'tijera'],
    categoria: ['Juegos']
}

command.script = async (m, { conn }) => {
    const options = ['piedra', 'papel', 'tijera']
    const db = global.dataRPGDB
    const config = global.dataRPG

    const userId = m.sender.id
    const user = db[userId] || { ...config.defaultData, premium: false }

    if (!m.args[0] || !options.includes(m.args[0].toLowerCase())) {
        return m.reply(`Usa el comando así:\n\n*ppt <piedra|papel|tijera>*`)
    }

    const userChoice = m.args[0].toLowerCase()
    const botChoice = options[Math.floor(Math.random() * options.length)]

    let result
    if (userChoice === botChoice) {
        result = 'empate'
    } else if (
        (userChoice === 'piedra' && botChoice === 'tijera') ||
        (userChoice === 'papel' && botChoice === 'piedra') ||
        (userChoice === 'tijera' && botChoice === 'papel')
    ) {
        result = 'victoria'
    } else {
        result = 'derrota'
    }

    let reward = 0
    if (result === 'victoria') {
        reward = config.cantidad.mineria / 10
        user.exp += reward
    }

    const response = `*Juego: Piedra, Papel o Tijera*\n\n*Tu elección:* ${userChoice}\n*Elección del bot:* ${botChoice}\n\n*Resultado:* ${result === 'empate' ? '🤝 Empate' : result === 'victoria' ? '🎉 Victoria' : '😢 Derrota'}\n${
        reward > 0 ? `\nGanaste ${reward} XP!` : ''
    }`

    db[userId] = user
    fs.writeFileSync('./system/store/dataRPG.json', JSON.stringify(db, null, 2))

    return m.reply(response)
}

export default command
