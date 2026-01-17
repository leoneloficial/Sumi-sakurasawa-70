import fetch from "node-fetch"
import yts from 'yt-search'

const handler = async (m, { conn, text, usedPrefix, command }) => {
    try {
        if (!text.trim()) return conn.reply(m.chat, `❀ Por favor, ingresa el nombre o link de YouTube.`, m)
        await m.react('🕒')
        
        const videoMatch = text.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|shorts\/|live\/|v\/))([a-zA-Z0-9_-]{11})/)
        const query = videoMatch ? 'https://youtu.be/' + videoMatch[1] : text
        const search = await yts(query)
        const result = videoMatch ? search.videos.find(v => v.videoId === videoMatch[1]) || search.all[0] : search.all[0]
        
        if (!result) throw 'ꕥ No se encontraron resultados.'
        
        const { title, thumbnail, timestamp, views, url, author } = result
        const info = `「✦」Descargando *<${title}>*\n\n> ❑ Canal » *${author.name}*\n> ♡ Vistas » *${views.toLocaleString()}*\n> ✧︎ Duración » *${timestamp}*\n> ➪ Link » ${url}`
        
        const thumb = (await conn.getFile(thumbnail)).data
        await conn.sendMessage(m.chat, { image: thumb, caption: info }, { quoted: m })

        const isAudio = ['play', 'yta', 'ytmp3', 'playaudio'].includes(command)
        const endpoint = isAudio ? 'ytaudio' : 'ytvideo'
        const apiUrl = `https://api-adonix.ultraplus.click/download/${endpoint}?apikey=AdonixKeyvr85v01953&url=${encodeURIComponent(url)}`
        
        const res = await fetch(apiUrl)
        const json = await res.json()

        if (!json.status || !json.data?.url) throw '⚠ El servidor de Adonix no devolvió un enlace válido.'

        if (isAudio) {
            await conn.sendMessage(m.chat, { 
                audio: { url: json.data.url }, 
                fileName: `${title}.mp3`, 
                mimetype: 'audio/mpeg' 
            }, { quoted: m })
        } else {
            await conn.sendMessage(m.chat, {
                video: { url: json.data.url },
                caption: `> ❀ ${title}`,
                mimetype: 'video/mp4',
                fileName: `${title}.mp4`
            }, { quoted: m })
        }
        
        await m.react('✔️')

    } catch (e) {
        await m.react('✖️')
        return conn.reply(m.chat, `⚠︎ Error: ${e}`, m)
    }
}

handler.command = /^(play|yta|ytmp3|play2|ytv|ytmp4|playaudio|mp4)$/i
handler.group = true

export default handler