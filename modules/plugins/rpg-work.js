import fs from 'fs'

const command = {
    command: ['work', 'trabajar'],
    categoria: ['RPG']
}

command.script = async (m, { conn }) => {
    const db = global.dataRPGDB
    const userId = m.sender.id
    const user = db[userId] || { ...global.dataRPG.defaultData, premium: false }

    const jobs = [
    { msg: 'Trabajaste como programador de bots y te pagaron con', coins: 20 },
    { msg: 'Limpiaste baños públicos y ganaste', coins: 15 },
    { msg: 'Vendiste limonada en la esquina y te dieron', coins: 5 },
    { msg: 'Trabajaste como DJ y ganaste', coins: 100 },
    { msg: 'Participaste en una competencia de comer y te dieron', coins: 50 },
    { msg: 'Te pagaron por contar chistes malos y ganaste:', coins: 300 },
    { msg: 'Fuiste el cuidador de las plantas de un hipster y te pagaron', coins: 25 },
    { msg: 'Hiciste malabares en la calle y ganaste', coins: 10 },
    { msg: 'Estuviste a cargo de la venta de bocadillos en una fiesta y te dieron', coins: 40 },
    { msg: 'Trabajaste como modelo de memes y ganaste', coins: 60 },
    { msg: 'Fuiste el escritor fantasma de un blog de gatos y te pagaron', coins: 80 },
    { msg: 'Lejiste cuentos de hadas a niños y ganaste', coins: 30 },
    { msg: 'Trabajaste como catador de dulces y te dieron', coins: 70 },
    { msg: 'Fuiste el ayudante de un mago y ganaste', coins: 25 },
    { msg: 'Te pagaron por hacer origami y ganaste', coins: 15 },
    { msg: 'Entrevistaste a un loro y ganaste', coins: 20 },
    { msg: 'Hiciste de probador de videojuegos y ganaste', coins: 150 },
    { msg: 'Montaste un espectáculo de marionetas y te dieron', coins: 45 },
    { msg: 'Fuiste el asistente personal de un gato influencer y ganaste', coins: 35 },
    { msg: 'Escribiste un libro sobre cómo no hacer nada y te pagaron', coins: 250 },
    { msg: 'Hiciste el diseño de una camiseta con frases graciosas y ganaste', coins: 55 },
    { msg: 'Participaste en una batalla de rap contra una cabra y te dieron', coins: 100 },
    { msg: 'Fuiste a un festival de comedia y te pagaron por hacer reír a la gente con tus muecas', coins: 80 },
    { msg: 'Fuiste probador de almohadas y ganaste', coins: 40 },
    { msg: 'Trabajaste como artista de las sombras en un teatro, y te dieron', coins: 70 },
    { msg: 'Te pagaron por hacer trucos de magia con cartas en una fiesta y ganaste', coins: 60 },
    { msg: 'Fuiste el catador oficial de helados para una marca local y te dieron', coins: 85 },
    { msg: 'Hiciste un video viral de baile y te pagaron', coins: 200 },
    { msg: 'Fuiste jurado en un concurso de talentos canino y ganaste', coins: 30 },
    { msg: 'Trabajaste como cuenta cuentos en un café, y te pagaron', coins: 50 },
    { msg: 'Fuiste diseñador de T-shirts de memes y ganaste', coins: 55 },
    { msg: 'Fuiste a un concurso de versiéndose en público y te dieron', coins: 95 },
    { msg: 'Hiciste un tutorial de cómo hacer nueces con una mano y te pagaron', coins: 120 },
    { msg: 'Escribiste un guion para una comedia romántica de dinosaurios y ganaste', coins: 300 },
    { msg: 'Trabajaste como responsable de las redes sociales de un loro influencer y te pagaron', coins: 40 },
    { msg: 'Diseñaste una línea de productos de aromatizantes con olores raros y te dieron', coins: 70 },
    { msg: 'Fuiste retratista de mascotas, y te pagaron por cada retrato', coins: 35 },
    { msg: 'Fuiste reconocedor de aroma de pizza y te dieron', coins: 60 },
    { msg: 'Participaste en un concurso de baile cha-cha y ganaste', coins: 50 },
    { msg: 'Fuiste el organizador de un campeonato de almohadas y te pagaron', coins: 75 },
    { msg: 'Te pagaron por inventar nombres absurdos para nombres de mascotas y ganaste', coins: 90 },
    { msg: 'Fuiste probador de sillas y te dieron', coins: 20 }
    ]

    const job = jobs[Math.floor(Math.random() * jobs.length)]
    user.coin += job.coins
    db[userId] = user
    fs.writeFileSync('./system/store/dataRPG.json', JSON.stringify(db, null, 2))

    return m.reply(`🛠️ ${job.msg} ${job.coins} monedas.`)
}

export default command
