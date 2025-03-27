import fs from 'fs'

const command = {
    command: ['unregister', 'unreg'],
    categoria: ['RPG']
}

command.script = async (m, { conn }) => {
    const db = global.dataRPGDB
    const userId = m.sender.id
    const codigo = m.args[0]

    if (!db[userId] || db[userId].codigo !== codigo) {
        return m.reply(`Código incorrecto o no estás registrado.`)
    }

    delete db[userId]
    fs.writeFileSync('./system/store/dataRPG.json', JSON.stringify(db, null, 2))

    return m.reply(`✓ Registro eliminado.`)
}

export default command
