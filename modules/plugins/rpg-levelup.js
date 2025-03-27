import fs from 'fs'

const command = {
    command: ['levelup', 'level'],
    categoria: ['RPG']
}

command.script = async (m, { conn }) => {
    const db = global.dataRPGDB
    const userId = m.sender.id
    const user = db[userId] || { ...global.dataRPG.defaultData, premium: false }

    const xpPerLevel = 3000
    const currentLevel = user.nivel
    const nextLevelXP = (currentLevel + 1) * xpPerLevel

    if (user.exp < nextLevelXP) {
        return m.reply(`● No tienes suficiente experiencia para subir de nivel.\n\n- Nivel Actual: ${user.nivel}\n- XP Actual: ${user.exp}\n- *XP Necesario para el Próximo Nivel:* ${nextLevelXP}`)
    }

    user.nivel += 1
    const expExcedente = user.exp - nextLevelXP
    user.exp = expExcedente > 0 ? expExcedente : 0
    db[userId] = user
    fs.writeFileSync('./system/store/dataRPG.json', JSON.stringify(db, null, 2))

    return m.reply(
        `¡Felicidades! Subiste al nivel ${user.nivel}.\n` +
        `● *XP Restante:* ${user.exp}`)
}

export default command
