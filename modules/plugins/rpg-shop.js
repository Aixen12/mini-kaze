import fs from 'fs';

const command = {
    command: ['shop', 'tienda'],
    categoria: ['RPG']
};

command.script = async (m, { conn }) => {
    const db = global.dataRPGDB;
    const config = global.dataRPG;

    const userId = m.sender.id;
    const user = db[userId] || { ...config.defaultData, premium: false };

    // Verificar si el usuario pidió "all" o una cantidad específica
    const input = m.args[0]?.toLowerCase();
    if (!input || (input !== 'all' && isNaN(input))) {
        return m.reply(
            `● *Tienda de Intercambio*\n\n` +
            `Intercambia tu XP por monedas.\n` +
            `150 XP = 3 Coins\n\n` +
            `- *shop <cantidad>*: Compra una cantidad específica de monedas.\n` +
            `- *shop all*: Convierte todo tu XP disponible en monedas.\n\n` +
            `Ejemplo: *shop 6* (Para comprar 6 monedas) o *shop all*`
        );
    }

    let coinsToBuy = 0;
    let requiredExp = 0;

    if (input === 'all') {
        coinsToBuy = Math.floor(user.exp / 150) * 3;
        requiredExp = (coinsToBuy / 3) * 150;

        if (coinsToBuy < 3) {
            return m.reply(`No tienes suficiente XP para comprar monedas. Necesitas al menos 150 XP.`);
        }
    } else {
        coinsToBuy = parseInt(input);
        requiredExp = (coinsToBuy / 3) * 150;

        if (coinsToBuy % 3 !== 0) {
            return m.reply(`Solo puedes comprar monedas en múltiplos de 3.\nEjemplo: 3, 6, 9, etc.`);
        }
        if (user.exp < requiredExp) {
            return m.reply(`No tienes suficiente XP.\nNecesitas ${requiredExp} XP para comprar ${coinsToBuy} monedas.`);
        }
    }

    user.exp -= requiredExp;
    user.coin += coinsToBuy;

    db[userId] = user;
    fs.writeFileSync('./system/store/dataRPG.json', JSON.stringify(db, null, 2));

    return m.reply(
        `*✓ Compra Realizada*\n\n` +
        `${input === 'all' ? `Has convertido todo tu XP disponible en monedas.` : `Has intercambiado ${requiredExp} XP por ${coinsToBuy} monedas.`}\n` +
        `- Monedas actuales: ${user.coin}\n` +
        `- XP restante: ${user.exp}`
    );
};

export default command;
