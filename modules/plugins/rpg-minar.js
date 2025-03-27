import fs from 'fs'

const command = {
    command: ['minar'],
    categoria: ['RPG']
}

command.script = async (m, { conn }) => {
    const db = global.dataRPGDB
    const userId = m.sender.id
    const user = db[userId] || { ...global.dataRPG.defaultData, premium: false }

    const now = Date.now()
    const cooldown = 15 * 60 * 1000 // 15 minutos

    if (now - (user.miningCooldown || 0) < cooldown) {
        const remainingTime = cooldown - (now - user.miningCooldown)
        return m.reply(`⛏️ Ya estás cansado. Vuelve a minar en: ${formatTime(remainingTime)}.`)
    }

    const exp = Math.random() < 0.1 ? Math.floor(Math.random() * 9000) + 1000 : 3000
    user.exp += exp
    user.miningCooldown = now

    db[userId] = user
    fs.writeFileSync('./system/store/dataRPG.json', JSON.stringify(db, null, 2))

    return m.reply(`⛏️ ¡Encontraste minerales valiosos y ganaste ${exp} XP!`)
}

const formatTime = (duration) => {
    const minutes = Math.floor((duration / (1000 * 60)) % 60)
    const seconds = Math.floor((duration / 1000) % 60)
    return `${minutes} Minutos ${seconds} Segundos`
}

export default command
