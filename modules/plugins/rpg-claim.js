import fs from 'fs'

const command = {
    command: ['claim', 'reclamar'],
    categoria: ['RPG']
}

command.script = async (m, { conn }) => {
    const db = global.dataRPGDB
    const config = global.dataRPG

    const userId = m.sender.id
    const user = db[userId] || { ...config.defaultData, premium: false }

    const now = Date.now()
    const cooldown = config.cantidad.tiempoClaim // 24 horas
    const remainingTime = cooldown - (now - (user.lastClaim || 0))

    const formatTime = (duration) => {
        const hours = Math.floor((duration / (1000 * 60 * 60)) % 24)
        const minutes = Math.floor((duration / (1000 * 60)) % 60)
        const seconds = Math.floor((duration / 1000) % 60)

        const formattedHours = hours < 10 ? `0${hours}` : hours
        const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes
        const formattedSeconds = seconds < 10 ? `0${seconds}` : seconds

        return `${formattedHours} Horas ${formattedMinutes} Minutos ${formattedSeconds} Segundos`
    }
    
    if (remainingTime > 0) {
        return m.reply(
            `Ya reclamaste tus recompensas diarias.\n` +
            `Inténtalo nuevamente en: ${formatTime(remainingTime)}.`
        )
    }

    const expReward = user.premium ? 5000 : 3000
    const coinReward = 5

    user.exp += expReward
    user.coin += coinReward
    user.lastClaim = now

    db[userId] = user
    fs.writeFileSync('./system/store/dataRPG.json', JSON.stringify(db, null, 2))

    return m.reply(
        `● *Recompensas Diarias Reclamadas*\n` +
        `- XP Ganado: ${expReward}\n` +
        `- Monedas Ganadas: ${coinReward}\n\n` +
        `¡Vuelve mañana para reclamar más recompensas!`)
}

export default command
