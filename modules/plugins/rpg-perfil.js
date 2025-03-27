const command = {
    command: ['perfil'],
    categoria: ['RPG']
}

command.script = async (m, { conn }) => {
    const db = global.dataRPGDB
    const userId = m.sender.id
    const userData = db[userId]
    const user = db[userId] || { ...config.defaultData, premium: false }

    if (!userData || !userData.registrado) {
        return m.reply(`No estás registrado. Usa /reg para registrarte.`);
    }

    const perfil = `● *Perfil de Usuario*\n` +
                   `- Nombre: ${userData.nombre}\n` +
                   `- WhatsApp: ${m.sender.id.split('@')[0]}\n` +
                   `- Edad: \`${userData.edad}\`\n` +
                   `- Código/Registro: \`${userData.codigo}\`\n` +
                   `- Role: ${user.role}\n` +
                   `- Nivel: \`${user.nivel}\`\n` +
                   `- XP: \`${user.exp}\`\n` +
                   `- Monedas: \`${user.coin}\`\n` +
                   `- Premium: ${user.premium ? '✅' : '❌'}`;

    let userPhoto;
    try {
        userPhoto = await conn.profilePictureUrl(m.sender.id, 'image');
    } catch {
        userPhoto = 'https://objetivoligar.com/wp-content/uploads/2017/03/blank-profile-picture-973460_1280-768x768.jpg';
    }

    return conn.sendMessage(m.chat.id, {
        image: { url: userPhoto },
        caption: perfil
    }, { quoted: m })
}

export default command
