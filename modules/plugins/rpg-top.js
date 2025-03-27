import fs from 'fs'

const command = {
    command: ['top'],
    categoria: ['RPG']
}

command.script = async (m, { conn }) => {
    const db = global.dataRPGDB;
    const users = Object.entries(db).map(([id, data]) => ({ id, ...data }))

    const getTop5 = (key) => {
        return users
            .sort((a, b) => b[key] - a[key])
            .slice(0, 5)
            .map((user, index) => `${index + 1}. +${user.id} (${user[key]})`)
            .join('\n')
    }

    const topCoins = getTop5('coin')
    const topExp = getTop5('exp')
    const topLevel = getTop5('nivel')
    const message = `*🏆 Ranking de Usuarios*\n\n` +
        `*💵 Top Coins:*\n${topCoins || 'No hay datos disponibles'}\n\n` +
        `*📈 Top Exp:*\n${topExp || 'No hay datos disponibles'}\n\n` +
        `*⭐ Top Nivel:*\n${topLevel || 'No hay datos disponibles'}`;

    return m.reply(message)
}

export default command
