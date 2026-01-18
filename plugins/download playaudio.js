import fetch from "node-fetch"
import yts from "yt-search"

const handler = async (m, { conn, text, usedPrefix, command }) => {
  try {
    if (!text?.trim())
      return conn.reply(m.chat, `❀ Por favor, ingresa el nombre o link de YouTube.`, m)

    await m.react("🕒")

    // 1. Buscar el video en YouTube
    const videoMatch = text.match(
      /(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|shorts\/|live\/|v\/))([a-zA-Z0-9_-]{11})/
    )
    const query = videoMatch ? "https://youtu.be/" + videoMatch[1] : text

    const search = await yts(query)
    const result = videoMatch
      ? search.videos.find(v => v.videoId === videoMatch[1]) || search.all?.[0]
      : search.all?.[0]

    if (!result) throw "ꕥ No se encontraron resultados."

    const { title, thumbnail, url, author, seconds, timestamp } = result
    if (seconds > 2700) throw "⚠ El contenido supera el límite de duración (45 minutos)."

    const isAudio = ["play", "yta", "ytmp3", "playaudio"].includes(command)
    const format = isAudio ? 'mp3' : 'mp4'
    const apiKey = 'barboza' // API Key extraída

    // 2. Llamada a la API MediaHub
    const apiUrl = `https://getmod-mediahub.vercel.app/api/ytdl?url=${encodeURIComponent(url)}&format=${format}&apikey=${apiKey}`
    const res = await fetch(apiUrl)
    const json = await res.json()

    if (!json.status || !json.dl) throw '⚠ No se pudo obtener el archivo de descarga.'

    const info =
      `「✦」Descargando *<${title}>*\n\n` +
      `> ✐ Canal » *${author?.name || "Desconocido"}*\n` +
      `> ⴵ Duracion » *${timestamp}*\n` +
      `> ✰ Calidad: *${isAudio ? '128kbps' : '720p'}*\n` +
      `> ❒ API » *MediaHub*\n` +
      `> 🜸 Link » ${url}`

    // 3. Enviar miniatura e info
    const thumb = (await conn.getFile(thumbnail)).data
    await conn.sendMessage(m.chat, { image: thumb, caption: info }, { quoted: m })

    // 4. Enviar el archivo (Audio o Video)
    if (isAudio) {
      if (command === "ytmp3") {
        await conn.sendMessage(
          m.chat,
          { audio: { url: json.dl }, fileName: `${title}.mp3`, mimetype: "audio/mpeg" },
          { quoted: m }
        )
      } else {
        await conn.sendMessage(
          m.chat,
          {
            document: { url: json.dl },
            fileName: `${title}.mp3`,
            mimetype: "audio/mpeg"
          },
          { quoted: m }
        )
      }
    } else {
      if (command === "ytmp4") {
        await conn.sendMessage(
          m.chat,
          { video: { url: json.dl }, mimetype: "video/mp4", caption: `> ❀ ${title}` },
          { quoted: m }
        )
      } else {
        await conn.sendMessage(
          m.chat,
          {
            document: { url: json.dl },
            fileName: `${title}.mp4`,
            mimetype: "video/mp4"
          },
          { quoted: m }
        )
      }
    }

    await m.react("✔️")

  } catch (e) {
    console.error(e)
    await m.react("✖️")
    return conn.reply(
      m.chat,
      `⚠︎ Error: ${e.message || e}`,
      m
    )
  }
}

handler.command = handler.help = ["play", "yta", "ytmp3", "play2", "ytv", "ytmp4", "mp4"]
handler.tags = ["descargas"]
handler.group = true

export default handler