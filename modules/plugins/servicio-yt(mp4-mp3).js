import axios from 'axios'

const command = { 
    command: ['ytmp3', 'ytmp4'], 
    categoria: ['descargas'] 
}

command.script = async (m, { conn }) => {
    if (!m.args[0]?.includes('youtube.com/watch')) {
        return m.reply(`Uso: /${m.command} <enlace de YouTube>\nEjemplo: /${m.command} https://youtube.com/watch?v=...`)
    }

    const apiUrl = `https://restapi.apibotwa.biz.id/api/ytmp4?url=${m.args[0]}`
    const isAudio = m.command === 'ytmp3'
    const mediaType = isAudio ? 'audio' : 'video'
    const mimetype = isAudio ? 'audio/mp4' : undefined

    try {
        await m.react('wait')
        const { data: { status, data: { response } } } = await axios.get(apiUrl)
        if (status !== 200 || !response) throw new Error('No se pudo procesar el enlace.')

        const { mp3, mp4 } = response
        const url = isAudio ? mp3 : mp4
        const options = {
            [mediaType]: { url },
            mimetype,
            contextInfo: {
                externalAdReply: {
                    title: '○ Zyphor-AI - 𝟸𝟺/𝟽',
                    body: 'Audio • Mp3',
                    previewType: "PHOTO",
                    thumbnailUrl: 'https://files.catbox.moe/',
                    sourceUrl: 'https://whatsapp.com/channel/0029VaiYDdB89inkuoRbEV13',
                    showAdAttribution: true
                }
            },
            fileName: isAudio ? "audio.mp3" : undefined,
            caption: !isAudio ? '' : undefined
        }

        await conn.sendMessage(m.chat.id, options, { quoted: m });
        await m.react('done')
    } catch (error) {
        console.error('Error en el comando YTMP3/YTMP4:', error.message);
        m.react('error')
        m.reply('Hubo un error al procesar la solicitud.')
    }
}

export default command
