import fetch from 'node-fetch'

let handler = async (m, { conn, args }) => {
const botname = conn.botname || conn.botName
const textbot = conn.textbot || global.textbot
let mentionedJid = await m.mentionedJid
let userId = mentionedJid && mentionedJid[0] ? mentionedJid[0] : m.sender
let totalreg = Object.keys(global.db.data.users).length
let totalCommands = Object.values(global.plugins).filter((v) => v.help && v.tags).length

let txt = ` > ❀ hola! ${m.pushName}, Soy ${conn.botName}, Aquí tienes la lista de comandos.

*❀ canal oficial »* https://whatsapp.com/channel/0029Vagdmfv1SWt5nfdR4z3w

╭┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈
│✦ *Tipo* » ${(conn.user.jid == global.conn.user.jid ? 'Principal' : 'Sub-Bot')}
│✰ *Usuarios* » ${totalreg.toLocaleString()}
│⚘ *Versión* » ${vs}
│ꕥ *Plugins* » ${totalCommands}
│🜸 *Librería* » ${libreria}
╰ׅ┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈

𐔌   .  ⋮ *✐ ECONOMÍA* .ᐟ  ֹ   ₊ ꒱
> ✿ Comandos de *✐ ECONOMÍA*.
┃
┃ ✿ #w • #work • #trabajar
┃ › _Ganar coins trabajando._
┃ ✿ #slut • #prostitución
┃ › _Ganar coins prostituyéndote._
┃ ✿ #coinflip • #flip • #cf [cantidad]
┃ › _Apostar coins en un cara o cruz._
┃ ✿ #crime • #crimen
┃ › _Ganar coins rápido._
┃ ✿ #roulette • #rt [red/black]
┃ › _Apostar coins en una ruleta._
┃ ✿ #casino • #apostar • #slot
┃ › _Apuestas coins en el casino._
┃ ✿ #balance • #bal • #bank
┃ › _Ver cuantos coins tienes en el banco._
┃ ✿ #deposit • #dep • #depositar
┃ › _Depositar tus coins en el banco._
┃ ✿ #withdraw • #with • #retirar
┃ › _Retirar tus coins del banco._
┃ ✿ #economyinfo • #einfo
┃ › _Ver tu información de economía en el grupo._
┃ ✿ #givecoins • #pay • #coinsgive
┃ › _Dar coins a un usuario._
┃ ✿ #miming • #minar • #mine
┃ › _Realizar trabajos de minería y ganar coins._
┃ ✿ #daily • #diario
┃ › _Reclamar tu recompensa diaria._
┃ ✿ #cofre • #coffer
┃ › _Reclamar tu cofre diario._
┃ ✿ #weekly • #semanal
┃ › _Reclamar tu recompensa semanal._
┃ ✿ #monthly • #mensual
┃ › _Reclamar tu recompensa mensual._
┃ ✿ #steal • #robar • #rob
┃ › _Intentar robar coins a un usuario._
┃ ✿ #economyboard • #eboard • #baltop
┃ › _Ver el ranking de economía en el grupo._
┃ ✿ #aventura • #adventure
┃ › _Aventuras para ganar coins y exp._
┃ ✿ #curar • #heal
┃ › _Curar salud para salir de aventuras._
┃ ✿ #cazar • #hunt
┃ › _Cazar animales para ganar coins y exp._
┃ ✿ #fish • #pescar
┃ › _Ganar coins y exp pescando._
┃ ✿ #mazmorra • #dungeon
┃ › _Explorar mazmorras para ganar coins y exp._
*꒷꒦︶꒷꒦︶꒷꒦︶꒷꒦︶꒷꒦︶꒷꒦*

𐔌   .  ⋮ *✐ DESCARGAS* .ᐟ  ֹ   ₊ ꒱
> ✿ Comandos de *✐ DESCARGAS*.
┃
┃ ✿ #tiktok • #tt [Link]
┃ › _Descargar un video de TikTok._
┃ ✿ #wagroups • #wpgroups
┃ › _Buscar grupos de WhatsApp._
┃ ✿ #mediafire • #mf
┃ › _Descargar un archivo de MediaFire._
┃ ✿ #mega • #mg
┃ › _Descargar un archivo de MEGA._
┃ ✿ #play • #ytmp3 • #ytmp4
┃ › _Descargar una canción o vídeo de YouTube._
┃ ✿ #facebook • #fb
┃ › _Descargar un video de Facebook._
┃ ✿ #twitter • #x
┃ › _Descargar un video de Twitter/X._
┃ ✿ #ig • #instagram
┃ › _Descargar un reel de Instagram._
┃ ✿ #pinterest • #pin
┃ › _Buscar y descargar imágenes de Pinterest._
┃ ✿ #image • #imagen
┃ › _Buscar y descargar imágenes de Google._
┃ ✿ #apk • #modapk
┃ › _Descargar un apk de Aptoide._
┃ ✿ #ytsearch • #search
┃ › _Buscar videos de YouTube._
*꒷꒦︶꒷꒦︶꒷꒦︶꒷꒦︶꒷꒦︶꒷꒦*

𐔌   .  ⋮ *✐ GACHA* .ᐟ  ֹ   ₊ ꒱
> ✿ Comandos de *✐ GACHA*.
┃
┃ ✿ #buycharacter • #buychar
┃ › _Comprar un personaje en venta._
┃ ✿ #charimage • #waifuimage
┃ › _Ver una imagen aleatoria de un personaje._
┃ ✿ #charinfo • #winfo
┃ › _Ver información de un personaje._
┃ ✿ #claim • #c • #reclamar
┃ › _Reclamar un personaje._
┃ ✿ #delclaimmsg
┃ › _Restablecer el mensaje al reclamar un personaje._
┃ ✿ #deletewaifu • #delwaifu
┃ › _Eliminar un personaje reclamado._
┃ ✿ #favoritetop • #favtop
┃ › _Ver el top de personajes favoritos._
┃ ✿ #gachainfo • #ginfo
┃ › _Ver tu información de gacha._
┃ ✿ #giveallharem
┃ › _Regalar todos tus personajes a otro usuario._
┃ ✿ #givechar • #givewaifu
┃ › _Regalar un personaje a otro usuario._
┃ ✿ #robwaifu • #robarwaifu
┃ › _Robar un personaje a otro usuario._
┃ ✿ #harem • #waifus • #claims
┃ › _Ver tus personajes reclamados._
┃ ✿ #haremshop • #tiendawaifus
┃ › _Ver los personajes en venta._
┃ ✿ #removesale • #removerventa
┃ › _Eliminar un personaje en venta._
┃ ✿ #rollwaifu • #rw • #roll
┃ › _Waifu o husbando aleatorio._
┃ ✿ #sell • #vender
┃ › _Poner un personaje a la venta._
┃ ✿ #serieinfo • #ainfo
┃ › _Información de un anime._
┃ ✿ #serielist • #slist
┃ › _Listar series del bot._
┃ ✿ #setclaimmsg • #setclaim
┃ › _Modificar el mensaje al reclamar un personaje._
┃ ✿ #trade • #intercambiar
┃ › _Intercambiar un personaje con otro usuario._
┃ ✿ #vote • #votar
┃ › _Votar por un personaje para subir su valor._
┃ ✿ #waifusboard • #wtop
┃ › _Ver el top de personajes con mayor valor._
*꒷꒦︶꒷꒦︶꒷꒦︶꒷꒦︶꒷꒦︶꒷꒦*

𐔌   .  ⋮ *✐ SOCKETS* .ᐟ  ֹ   ₊ ꒱
> ✿ Comandos de *✐ SOCKETS*.
┃
┃ ✿ #qr • #code
┃ › _Crear un Sub-Bot con un código QR/Code._
┃ ✿ #setname • #setbanner
┃ › _Personaliza el nombre/banner de tu Sub-Bot._
┃ ✿ #bots • #botlist
┃ › _Ver el número de bots activos._
┃ ✿ #status • #estado
┃ › _Ver estado del bot._
┃ ✿ #p • #ping
┃ › _Medir tiempo de respuesta._
┃ ✿ #join
┃ › _Unir al bot a un grupo._
┃ ✿ #leave • #salir
┃ › _Salir de un grupo._
┃ ✿ #logout
┃ › _Cerrar sesión del bot._
┃ ✿ #setpfp • #setimage
┃ › _Cambiar la imagen de perfil._
┃ ✿ #setstatus
┃ › _Cambiar el estado del bot._
┃ ✿ #setusername
┃ › _Cambiar el nombre de usuario._
*꒷꒦︶꒷꒦︶꒷꒦︶꒷꒦︶꒷꒦︶꒷꒦*

𐔌   .  ⋮ *✐ UTILIDADES* .ᐟ  ֹ   ₊ ꒱
> ✿ Comandos de *✐ UTILIDADES*.
┃
┃ ✿ #help • #menu
┃ › _Ver el menú de comandos._
┃ ✿ #sc • #script
┃ › _Link del repositorio oficial del Bot._
┃ ✿ #sug • #suggest
┃ › _Sugerir nuevas funciones al desarrollador._
┃ ✿ #reporte • #reportar
┃ › _Reportar fallas o problemas del bot._
┃ ✿ #calcular • #cal
┃ › _Calcular tipos de ecuaciones._
┃ ✿ #delmeta
┃ › _Restablecer el pack y autor por defecto para tus stickers._
┃ ✿ #getpic • #pfp
┃ › _Ver la foto de perfil de un usuario._
┃ ✿ #say
┃ › _Repetir un mensaje._
┃ ✿ #setmeta
┃ › _Establecer el pack y autor por defecto para tus stickers._
┃ ✿ #sticker • #s • #wm
┃ › _Convertir una imagen/video a sticker._
┃ ✿ #toimg • #img
┃ › _Convertir un sticker/imagen a imagen._
┃ ✿ #brat • #bratv • #qc
┃ › _Crear stickers con texto._
┃ ✿ #gitclone
┃ › _Descargar un repositorio de Github._
┃ ✿ #enhance • #remini • #hd
┃ › _Mejorar calidad de una imagen._
┃ ✿ #letra • #style
┃ › _Cambiar la fuente de las letras._
┃ ✿ #read • #readviewonce
┃ › _Ver imágenes viewonce._
┃ ✿ #ss • #ssweb
┃ › _Ver el estado de una página web._
┃ ✿ #translate • #traducir
┃ › _Traducir palabras en otros idiomas._
┃ ✿ #ia • #gemini
┃ › _Preguntar a Chatgpt._
┃ ✿ #iavoz • #aivoz
┃ › _Hablar o preguntar a chatgpt mexicano modo voz._
┃ ✿ #tourl • #catbox
┃ › _Convertidor de imagen/video en urls._
┃ ✿ #wiki • #wikipedia
┃ › _Investigar temas a través de Wikipedia._
┃ ✿ #dalle • #flux
┃ › _Crear imágenes con texto mediante IA._
┃ ✿ #npmdl • #npmjs
┃ › _Descargar paquetes de NPMJS._
┃ ✿ #google
┃ › _Realizar búsquedas por Google._
*꒷꒦︶꒷꒦︶꒷꒦︶꒷꒦︶꒷꒦︶꒷꒦*

𐔌   .  ⋮ *✐ PERFILES* .ᐟ  ֹ   ₊ ꒱
> ✿ Comandos de *✐ PERFILES*.
┃
┃ ✿ #leaderboard • #lboard • #top
┃ › _Top de usuarios con más experiencia._
┃ ✿ #level • #lvl
┃ › _Ver tu nivel y experiencia actual._
┃ ✿ #marry • #casarse
┃ › _Casarte con alguien._
┃ ✿ #profile
┃ › _Ver tu perfil._
┃ ✿ #setbirth
┃ › _Establecer tu fecha de cumpleaños._
┃ ✿ #setdescription • #setdesc
┃ › _Establecer tu descripción._
┃ ✿ #setgenre
┃ › _Establecer tu género._
┃ ✿ #delgenre • #delgenero
┃ › _Eliminar tu género._
┃ ✿ #delbirth
┃ › _Borrar tu fecha de cumpleaños._
┃ ✿ #divorce
┃ › _Divorciarte de tu pareja._
┃ ✿ #setfavourite • #setfav
┃ › _Establecer tu claim favorito._
┃ ✿ #deldescription • #deldesc
┃ › _Eliminar tu descripción._
┃ ✿ #prem • #vip
┃ › _Comprar membresía premium._
*꒷꒦︶꒷꒦︶꒷꒦︶꒷꒦︶꒷꒦︶꒷꒦*

𐔌   .  ⋮ *✐ GRUPOS* .ᐟ  ֹ   ₊ ꒱
> ✿ Comandos de *✐ GRUPOS*.
┃
┃ ✿ #tag • #hidetag • #invocar
┃ › _Envía un mensaje mencionando a todos._
┃ ✿ #detect • #alertas
┃ › _Activar/desactivar las alertas de promote/demote._
┃ ✿ #antilink • #antienlace
┃ › _Activar/desactivar el antienlace._
┃ ✿ #bot
┃ › _Activar/desactivar al bot._
┃ ✿ #close • #cerrar
┃ › _Cerrar el grupo para solo administradores._
┃ ✿ #demote
┃ › _Descender a unusuario de administrador._
┃ ✿ #economy
┃ › _Activar/desactivar los comandos de economía._
┃ ✿ #gacha
┃ › _Activar/desactivar los comandos de Gacha y Games._
┃ ✿ #welcome • #bienvenida
┃ › _Activar/desactivar la bienvenida y despedida._
┃ ✿ #setbye
┃ › _Establecer un mensaje de despedida personalizado._
┃ ✿ #setprimary
┃ › _Establece un bot como primario del grupo._
┃ ✿ #setwelcome
┃ › _Establecer un mensaje de bienvenida personalizado._
┃ ✿ #kick
┃ › _Expulsar a un usuario del grupo._
┃ ✿ #nsfw
┃ › _Activar/desactivar los comandos NSFW._
┃ ✿ #onlyadmin
┃ › _Permitir que solo los administradores usen comandos._
┃ ✿ #open • #abrir
┃ › _Abrir el grupo para que todos envíen mensajes._
┃ ✿ #promote
┃ › _Ascender a un usuario a administrador._
┃ ✿ #add • #añadir • #agregar
┃ › _Invita a un usuario a tu grupo._
┃ ✿ admins • admin
┃ › _Mencionar a los admins para solicitar ayuda._
┃ ✿ #restablecer • #revoke
┃ › _Restablecer enlace del grupo._
┃ ✿ #addwarn • #warn
┃ › _Advertir a un usuario._
┃ ✿ #unwarn • #delwarn
┃ › _Quitar advertencias de un usuario._
┃ ✿ #advlist • #listadv
┃ › _Ver lista de usuarios advertidos._
┃ ✿ #inactivos • #kickinactivos
┃ › _Ver y eliminar a usuarios inactivos._
┃ ✿ #listnum • #kicknum
┃ › _Eliminar usuarios con prefijo de país._
┃ ✿ #gpbanner • #groupimg
┃ › _Cambiar la imagen del grupo._
┃ ✿ #gpname • #groupname
┃ › _Cambiar el nombre del grupo._
┃ ✿ #gpdesc • #groupdesc
┃ › _Cambiar la descripción del grupo._
┃ ✿ #del • #delete
┃ › _Eliminar un mensaje._
┃ ✿ #linea • #listonline
┃ › _Ver lista de usuarios en línea._
┃ ✿ #gp • #infogrupo
┃ › _Ver la información del grupo._
┃ ✿ #link
┃ › _Ver enlace de invitación del grupo._
*꒷꒦︶꒷꒦︶꒷꒦︶꒷꒦︶꒷꒦︶꒷꒦*

𐔌   .  ⋮ *✐ REACCIONES ANIME* .ᐟ  ֹ   ₊ ꒱
> ✿ Comandos de *✐ REACCIONES ANIME*.
┃
┃ ✿ #angry • #enojado
┃ › _Estar enojado._
┃ ✿ #bath • #bañarse
┃ › _Bañarse._
┃ ✿ #bite • #morder
┃ › _Muerde a alguien._
┃ ✿ #bleh • #lengua
┃ › _Sacar la lengua._
┃ ✿ #blush • #sonrojarse
┃ › _Sonrojarte._
┃ ✿ #bored • #aburrido
┃ › _Estar aburrido._
┃ ✿ #clap • #aplaudir
┃ › _Aplaudir._
┃ ✿ #coffee • #cafe
┃ › _Tomar café._
┃ ✿ #cry • #llorar
┃ › _Llorar por algo o alguien._
┃ ✿ #cuddle • #acurrucarse
┃ › _Acurrucarse._
┃ ✿ #dance • #bailar
┃ › _Sácate los pasitos prohibidos._
┃ ✿ #dramatic • #drama
┃ › _Drama._
┃ ✿ #drunk • #borracho
┃ › _Estar borracho._
┃ ✿ #eat • #comer
┃ › _Comer algo delicioso._
┃ ✿ #facepalm • #palmada
┃ › _Darte una palmada en la cara._
┃ ✿ #happy • #feliz
┃ › _Salta de felicidad._
┃ ✿ #hug • #abrazar
┃ › _Dar un abrazo._
┃ ✿ #impregnate • #preg
┃ › _Embarazar a alguien._
┃ ✿ #kill • #matar
┃ › _Toma tu arma y mata a alguien._
┃ ✿ #kiss • #muak
┃ › _Dar un beso._
┃ ✿ #kisscheek • #beso
┃ › _Beso en la mejilla._
┃ ✿ #laugh • #reirse
┃ › _Reírte de algo o alguien._
┃ ✿ #lick • #lamer
┃ › _Lamer a alguien._
┃ ✿ #love • #amor
┃ › _Sentirse enamorado._
┃ ✿ #pat • #palmadita
┃ › _Acaricia a alguien._
┃ ✿ #poke • #picar
┃ › _Picar a alguien._
┃ ✿ #pout • #pucheros
┃ › _Hacer pucheros._
┃ ✿ #punch • #pegar
┃ › _Dar un puñetazo._
┃ ✿ #run • #correr
┃ › _Correr._
┃ ✿ #sad • #triste
┃ › _Expresar tristeza._
┃ ✿ #scared • #asustado
┃ › _Estar asustado._
┃ ✿ #seduce • #seducir
┃ › _Seducir a alguien._
┃ ✿ #shy • #tímido
┃ › _Sentir timidez._
┃ ✿ #slap • #bofetada
┃ › _Dar una bofetada._
┃ ✿ #sleep • #dormir
┃ › _Tumbarte a dormir._
┃ ✿ #smoke • #fumar
┃ › _Fumar._
┃ ✿ #spit • #escupir
┃ › _Escupir._
┃ ✿ #step • #pisar
┃ › _Pisar a alguien._
┃ ✿ #think • #pensar
┃ › _Pensar en algo._
┃ ✿ #walk • #caminar
┃ › _Caminar._
┃ ✿ #wink • #guiñar
┃ › _Guiñar el ojo._
┃ ✿ #cringe • #avergonzarse
┃ › _Sentir vergüenza ajena._
┃ ✿ #smug • #presumir
┃ › _Presumir con estilo._
┃ ✿ #smile • #sonreír
┃ › _Sonreír con ternura._
┃ ✿ #highfive • #5
┃ › _Chocar los cinco._
┃ ✿ #bully • #bullying
┃ › _Molestar a alguien._
┃ ✿ #handhold • #mano
┃ › _Tomarse de la mano._
┃ ✿ #wave • #ola • #hola
┃ › _Saludar con la mano._
┃ ✿ #waifu
┃ › _Buscar una waifu aleatoria._
┃ ✿ #ppcouple • #ppcp
┃ › _Genera imágenes para amistades o parejas._
*꒷꒦︶꒷꒦︶꒷꒦︶꒷꒦︶꒷꒦︶꒷꒦*

𐔌   .  ⋮ *✐ NSFW* .ᐟ  ֹ   ₊ ꒱
> ✿ Comandos de *✐ NSFW*.
┃
┃ ✿ #danbooru • #dbooru
┃ › _Buscar imágenes en Danbooru._
┃ ✿ #gelbooru • #gbooru
┃ › _Buscar imágenes en Gelbooru._
┃ ✿ #rule34 • #r34
┃ › _Buscar imágenes en Rule34._
┃ ✿ #xvideos • #xvideosdl
┃ › _Descargar un video Xvideos._
┃ ✿ #xnxx • #xnxxdl
┃ › _Descargar un video Xnxx._
*꒷꒦︶꒷꒦︶꒷꒦︶꒷꒦︶꒷꒦︶꒷꒦*`.trim()
await conn.sendMessage(m.chat, { 
text: txt,
contextInfo: {
mentionedJid: [userId],
isForwarded: true,
forwardedNewsletterMessageInfo: {
newsletterJid: channelRD.id,
serverMessageId: '',
newsletterName: channelRD.name
},
externalAdReply: {
title: botname,
body: textbot,
mediaType: 1,
mediaUrl: redes,
sourceUrl: redes,
thumbnail: await (await fetch(.conn botName)).buffer(),
showAdAttribution: false,
containsAutoReply: true,
renderLargerThumbnail: true
}}}, { quoted: m })
}

handler.help = ['menu']
handler.tags = ['main']
handler.command = ['menu', 'menú', 'help']

export default handler