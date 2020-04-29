require('dotenv').config()

const Discord = require('discord.js')
const client = new Discord.Client()
const fetch = require('node-fetch')

const TOKEN = process.env.TOKEN
const PREFIX = process.env.PREFIX

const commands = message => {
    const commandEmbed = new Discord.MessageEmbed()
        .setColor('#010030')
        .setTitle('Command List')
        .setDescription('List of possible commands.')
        .setThumbnail('https://gamepedia.cursecdn.com/minecraft_gamepedia/thumb/2/22/Repeating_Command_Block.gif/150px-Repeating_Command_Block.gif?version=a6666ce38e934de146cb973003fd3f32')
        .addFields(
            { name: '|Weapons', value: 'Pulls all weapons' },
            { name: '|Weapons {Type}', value: 'Pulls waepons based on type.' },
            { name: '|Pull {Name}', value: 'Pulls weapon by name.' },
            { name: 'Weapon Types', value: 'Hand Cannons, Sniper Rifles, Rocket Launchers, Shotguns, Pulse Rifles, Scout Rifle, Auto Rifles, Fusion Rifles, Linear Fusion Rifles, Bows, Swords, Grenade Launchers, Machine Guns, Submachine Guns, Sidearms, Trace Rifles' }
        )
    message.channel.send(commandEmbed)
}

const weapons = async message => {
    message.channel.send('This will be all weapons.')
}

const pull = async message => {
    let urlContent = message.content.substring(message.content.indexOf(" ") + 1, message.content.length)
    fetch(`http://www.wavform.co/v1/${urlContent}`)
        .then(res => res.json())
        .then(json => {
            if(!json[0]) {
                message.channel.send('That weapon appears to not be in the database yet.')
                return
            }
            let weapon = json[0]
            let barrelPerkStr = ''
            let magPerkStr = ''
            let perkPool1Str = ''
            let perkPool2Str = ''
            let masterworkStr = ''
            for(let i = 0; i < weapon.randomRolls.barrelPerks.length; i++) {
                if(i === weapon.randomRolls.barrelPerks.length - 1) {
                    barrelPerkStr += weapon.randomRolls.barrelPerks[i]
                } else {
                    barrelPerkStr += weapon.randomRolls.barrelPerks[i] + ', '
                }
            }
            for(let i = 0; i < weapon.randomRolls.magPerks.length; i++) {
                if(i === weapon.randomRolls.magPerks.length - 1) {
                    magPerkStr += weapon.randomRolls.magPerks[i]
                } else {
                    magPerkStr += weapon.randomRolls.magPerks[i] + ', '
                }
            }
            for(let i = 0; i < weapon.randomRolls.perks1.length; i++) {
                if(i === weapon.randomRolls.perks1.length - 1) {
                    perkPool1Str += weapon.randomRolls.perks1[i]
                } else {
                    perkPool1Str += weapon.randomRolls.perks1[i] + ', '
                }
            }
            for(let i = 0; i < weapon.randomRolls.perks2.length; i++) {
                if(i === weapon.randomRolls.perks2.length - 1) {
                    perkPool2Str += weapon.randomRolls.perks2[i]
                } else {
                    perkPool2Str += weapon.randomRolls.perks2[i] + ', '
                }
            }
            for(let i = 0; i < weapon.randomRolls.masterworks.length; i++) {
                if(i === weapon.randomRolls.masterworks.length - 1) {
                    masterworkStr += weapon.randomRolls.masterworks[i]
                } else {
                    masterworkStr += weapon.randomRolls.masterworks[i] + ', '
                }
            }
            //console.log(weapon)
            const weaponEmbed = new Discord.MessageEmbed()
                .setColor('#010030')
                .setTitle(weapon.name)
                .setDescription(`${weapon.frame.name}.`)
                .setThumbnail(weapon.weaponImg)
                .addFields(
                    { name: 'Impact', value: weapon.shownStats.impact, inline: true },
                    { name: 'Range', value: weapon.shownStats.range, inline: true },
                    { name: 'Stability', value: weapon.shownStats.stability, inline: true },
                    { name: 'Handling', value: weapon.shownStats.handling, inline: true },
                    { name: 'Reload Speed', value: weapon.shownStats.reloadSpeed, inline: true},
                )
                .addFields(
                    { name: 'Aim Assistance', value: weapon.hiddenStats.aimAssistance, inline: true },
                    { name: 'Inventory Size', value: weapon.hiddenStats.inventorySize, inline: true },
                    { name: 'Zoom', value: weapon.hiddenStats.zoom, inline: true },
                    { name: 'Recoil', value: weapon.hiddenStats.recoil, inline: true },
                    { name: 'Bounce Intensity', value: weapon.hiddenStats.bounceIntensity, inline: true },
                    { name: 'Bounce Direction', value: weapon.hiddenStats.bounceDirection, inline: true },
                    { name: '\u200b', value: '\u200b', inline: true }
                )
                .addFields(
                    { name: '\u200b', value: 'Curated Roll'},
                    { name: 'Barrel Perk', value: weapon.curatedRoll.barrelPerk, inline: true },
                    { name: 'Magazine Perk', value: weapon.curatedRoll.magPerk, inline: true},
                    { name: 'Masterwork', value: weapon.curatedRoll.masterwork, inline: true },
                    { name: 'Perk One', value: weapon.curatedRoll.perk1, inline: true },
                    { name: 'Perk Two', value: weapon.curatedRoll.perk2, inline: true },
                    { name: '\u200b', value: '\u200b', inline: true }
                )
                .addFields(
                    { name: '\u200b', value: 'Random Rolls'},
                    { name: 'Barrel/Sight Perks', value: barrelPerkStr },
                    { name: 'Magazine Perks', value: magPerkStr },
                    { name: 'Perk Pool 1', value: perkPool1Str },
                    { name: 'Perk Pool 2', value: perkPool2Str },
                    { name: 'Masterworks', value: masterworkStr },
                )
            message.channel.send(weaponEmbed)
        })
}

client.on('message', async message => {
    if(message.author.bot) return
    if(!message.content.startsWith(PREFIX)) return

    if(message.content.startsWith(`${PREFIX}Commands`) || message.content.startsWith(`${PREFIX}commands`)) {
        commands(message)
        return
    } else if(message.content.startsWith(`${PREFIX}Weapons`) || message.content.startsWith(`${PREFIX}weapons`)) {
        weapons(message)
        return
    } else if(message.content.startsWith(`${PREFIX}Pull`) || message.content.startsWith(`${PREFIX}pull`)) {
        pull(message)
        return
    } else {
        message.channel.send('That command is not recognized. Please use |Commands for a list of commands.')
    }
})

client.login(TOKEN).then(console.log(`Logged in as Titan`))