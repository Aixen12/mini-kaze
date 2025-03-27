import fs from 'fs'

const command = {
    command: ['slot'],
    categoria: ['Juegos']
}

command.script = async (m, { conn }) => {
    const db = global.dataRPGDB
    const userId = m.sender.id
    const user = db[userId] || { ...global.dataRPG.defaultData, premium: false }

    if (user.exp < 300) {
        return m.reply('Necesitas al menos 300 XP para jugar.')
    }

    const frutas = ['🍎', '🍊', '🍇', '🍓', '🍒', '🍍', '🥝', '🍌']
    const rueda = () => frutas[Math.floor(Math.random() * frutas.length)]
    const resultado = [
        [rueda(), rueda(), rueda()],
        [rueda(), rueda(), rueda()],
        [rueda(), rueda(), rueda()]
    ]

    let message = `🎰 Resultado:\n\n` +
        `   ${resultado[0][0]} | ${resultado[1][0]} | ${resultado[2][0]}\n` +
        `   ${resultado[0][1]} | ${resultado[1][1]} | ${resultado[2][1]}\n` +
        `   ${resultado[0][2]} | ${resultado[1][2]} | ${resultado[2][2]}\n\n`;

    if (resultado[0][1] === resultado[1][1] && resultado[1][1] === resultado[2][1]) {
        user.exp += 1000
        message += '🎉 ¡Felicidades! Ganaste 1000 XP.'
    } else if (resultado[0][1] === resultado[1][1] || resultado[1][1] === resultado[2][1] || resultado[0][1] === resultado[2][1]) {
        user.exp += 500
        message += '🎉 Dos frutas iguales. Ganaste 500 XP.'
    } else {
        user.exp = Math.max(0, user.exp - 200)
        message += '● Todas las frutas diferentes. Perdiste 200 XP.'
    }

    db[userId] = user
    fs.writeFileSync('./system/store/dataRPG.json', JSON.stringify(db, null, 2))

    return m.reply(message)
}

export default command
