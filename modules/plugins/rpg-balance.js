import fs from 'fs'

const command = {
    command: ['bal', 'balance'],
    categoria: ['RPG']
}

command.script = async (m, { conn }) => {
    const db = global.dataRPGDB
    const config = global.dataRPG
    const userId = m.sender.id
    const user = db[userId] || { ...config.defaultData, premium: false }

    const balance = `● *Balance del Usuario:*\n` +
        `- Role: ${user.role}\n` +
        `- Nivel: \`${user.nivel}\`\n` +
        `- XP: \`${user.exp}\`\n` +
        `- Monedas: \`${user.coin}\`\n` +
        `- Premium: ${user.premium ? '✅' : '❌'}`;
    return m.reply(balance)
}

export default command
