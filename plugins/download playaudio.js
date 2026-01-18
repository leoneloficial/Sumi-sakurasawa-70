import fetch from 'node-fetch'
import yts from 'yt-search'
import { spawn } from 'child_process'
import { writeFileSync, unlinkSync, promises as fs } from 'fs'
import path from 'path'

const estados = {}
const TIEMPO_ESPERA = 120000

let handler = async (m, { conn, usedPrefix, command, args, text }) => {

if (!text) return m.reply(
`🪐 Ingresa un texto o enlace de YouTube.
Ejemplo: *${usedPrefix + command} autos edits*`
)

const isLink = text.includes('youtube.com') || text.includes('youtu.be')
let video

if (isLink) {
  const search = await yts({ videoId: text.split('v=')[1] || text.split('/').pop() })
  video = search
} else {
  const search = await yts(text)
  video = search.videos[0]
}

if (!video) return m.reply('🪐 Video no encontrado.')
if (estados[m.sender]) clearTimeout(estados[m.sender].timeout)

estados[m.sender] = {
  step: 'esperando_tipo',
  videoInfo: video,
  command,
  intentos: 0,
  timeout: setTimeout(() => delete estados[m.sender], TIEMPO_ESPERA)
}

let info =
`*╭─「 🪐 ${video.title} 」*
│ ❒ *Título:* ${video.title}
│ ✶ *Autor:* ${video.author.name}
│ ⤿ *Duración:* ${video.timestamp}
│ ⤿ *Publicado:* ${video.ago}
│ ⤿ *Vistas:* ${video.views.toLocaleString()}
│ ⤿ *Canal:* ${video.author.url.replace('https://', '')}
*╰─〔 Tipo: Descarga 〕*

⛅ *¿Quieres el audio o el vídeo?*
Responde con:
1 para Audio (mp3)
2 para Vídeo (mp4)`

await conn.sendMessage(
  m.chat,
  { image: { url: video.thumbnail }, caption: info },
  { quoted: m }
)
}

handler.before = async (m, { conn }) => {

const estado = estados[m.sender]
if (!estado) return false

if (estado.step === 'esperando_tipo') {
  const resp = (m.text || '').trim()

  if (resp === '1' || resp === '1️⃣') {
    clearTimeout(estado.timeout)
    await m.reply(`🪐 Descargando audio de: *${estado.videoInfo.title}*`)
    await enviarArchivo(m, conn, estado.videoInfo.url, 'mp3', estado.videoInfo.title)
    delete estados[m.sender]
    return true
  }

  if (resp === '2' || resp === '2️⃣') {
    clearTimeout(estado.timeout)
    await m.reply(`⛅ Descargando vídeo de: *${estado.videoInfo.title}*`)
    await enviarArchivo(m, conn, estado.videoInfo.url, 'mp4', estado.videoInfo.title)
    delete estados[m.sender]
    return true
  }

  estado.intentos++
  if (estado.intentos <= 1) {
    await m.reply('🪐 Por favor responde con *1 (audio)* o *2 (vídeo)*.')
  }

  return true
}

return false
}

async function enviarArchivo(m, conn, url, tipo, titulo) {
const sendDoc = async (buffer, fileName, mimetype) => {
  await conn.sendMessage(
    m.chat,
    { document: buffer, fileName, caption: `🪐 Archivo descargado para: *${titulo}*`, mimetype },
    { quoted: m }
  )
}

try {
  const apiURL =
    `https://optishield.uk/api/?type=youtubedl` +
    `&apikey=c50919b9828c357cd81e753f03d4c000` +
    `&url=${encodeURIComponent(url)}` +
    `&video=${tipo === 'mp3' ? 0 : 1}`

  const res = await fetch(apiURL)
  const json = await res.json()

  if (!json?.result?.download)
    throw new Error('No se pudo obtener el archivo')

  const buffer = await (await fetch(json.result.download)).buffer()

  await sendDoc(
    buffer,
    `${titulo}.${tipo}`,
    tipo === 'mp3' ? 'audio/mpeg' : 'video/mp4'
  )

} catch (e) {
  await m.reply(`🪐 Error al descargar ${tipo}.\n${e.message}`)
}
}

handler.help = ['play']
handler.tags = ['descargas']
handler.command = ['play', 'musicdl']

export default handler