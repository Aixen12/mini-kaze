import fs from 'fs'

const command = {
    command: ['registrar', 'reg', 'verificar'],
    categoria: ['RPG']
}

function generarCodigo() {
    return Math.random().toString(36).substring(2, 12);
}

command.script = async (m, { conn }) => {
    const db = global.dataRPGDB
    const userId = m.sender.id
    const args = m.args[0]?.split('.') || []

    if (args.length !== 2 || isNaN(args[1])) {
        return m.reply(`Formato incorrecto. Usa: /reg Nombre.Edad\nEjemplo: /reg Syllkom.16`)
    }

    const [nombre, edad] = args
    const age = parseInt(edad)

    if (db[userId]?.registrado) {
        const userData = db[userId]
        return m.reply(
            `Ya estás registrado.\n\n` +
            `- Nombre de Registro: ${userData.nombre}\n` +
            `- Edad: ${userData.edad}\n` +
            `- Código de Registro: ${userData.codigo}`
        )
    }
    const codigo = generarCodigo();
    db[userId] = {
        ...global.dataRPG.defaultData,
        registrado: true,
        nombre,
        edad: age,
        codigo,
        exp: 3000,
        coin: 50
    }
    fs.writeFileSync('./system/store/dataRPG.json', JSON.stringify(db, null, 2))

    return m.reply(
        `● *¡Registro completado!*\n` +
        `- Estado: Registrado\n` +
        `- Nombre: ${nombre}\n` +
        `- Edad: ${edad}\n` +
        `- Código: ${codigo}`
    )
}

export default command
