import { useEffect, useRef, useState } from 'react'

type Props = {
  videoId?: string
}

function ensureYouTubeAPI() {
  const win = window as any
  if (win.YT && win.YT.Player) return Promise.resolve()

  if (win.__youTubeApiReady) return win.__youTubeApiReady

  const promise = new Promise<void>((resolve) => {
    win.__ytOnReadyCallbacks = win.__ytOnReadyCallbacks || []
    win.__ytOnReadyCallbacks.push(resolve)

    const prev = win.onYouTubeIframeAPIReady
    win.onYouTubeIframeAPIReady = () => {
      if (typeof prev === 'function') {
        try { prev() } catch {}
      }
      const callbacks = win.__ytOnReadyCallbacks || []
      callbacks.forEach((cb: () => void) => {
        try { cb() } catch {}
      })
      win.__youTubeApiReady = Promise.resolve()
    }
  })

  win.__youTubeApiReady = promise

  if (!document.querySelector('script[src="https://www.youtube.com/iframe_api"]')) {
    const tag = document.createElement('script')
    tag.src = 'https://www.youtube.com/iframe_api'
    document.body.appendChild(tag)
  }

  return promise
}

export default function YouTubeBubble({ videoId = '3JZ_D3ELwOQ' }: Props) {
  const [open, setOpen] = useState(false)
  const [muted, setMuted] = useState(true)
  const [volume, setVolume] = useState(50)
  const [current, setCurrent] = useState(0)
  const [duration, setDuration] = useState(0)

  const playerRef = useRef<any>(null)
  const containerId = useRef(`yt-player-${Math.random().toString(36).slice(2)}`)
  const progressTimer = useRef<number | null>(null)
  const createdRef = useRef(false)

  useEffect(() => {
    if (!open) return

    let destroyed = false
    const loadPlayer = async () => {
      try {
        await ensureYouTubeAPI()
        if (destroyed) return
        const win = window as any
        if (!win.YT || !win.YT.Player) return

        if (playerRef.current && playerRef.current.destroy) {
          playerRef.current.destroy()
        }

        playerRef.current = new win.YT.Player(containerId.current, {
          height: '200',
          width: '320',
          videoId,
          playerVars: {
            rel: 0,
            modestbranding: 1,
            controls: 0,
            enablejsapi: 1,
            autoplay: 1,
            mute: 1,
          },
          events: {
            onReady: (e: any) => {
              const d = e.target.getDuration() || 0
              setDuration(d)
              try { e.target.setVolume(volume) } catch {}
              try { e.target.playVideo() } catch {}
            },
            onStateChange: () => {
              if (!playerRef.current) return
              const state = playerRef.current.getPlayerState()
              if (state === (window as any).YT.PlayerState.PLAYING) {
                setDuration(playerRef.current.getDuration() || 0)
                if (progressTimer.current) window.clearInterval(progressTimer.current)
                progressTimer.current = window.setInterval(() => {
                  try { setCurrent(playerRef.current.getCurrentTime() || 0) } catch {}
                }, 500) as unknown as number
              } else if (progressTimer.current) {
                window.clearInterval(progressTimer.current)
                progressTimer.current = null
              }
            },
          },
        })

        createdRef.current = true
      } catch (error) {
        console.warn('YouTube API load error:', error)
      }
    }

    loadPlayer()

    return () => {
      destroyed = true
      if (progressTimer.current) {
        window.clearInterval(progressTimer.current)
        progressTimer.current = null
      }
      if (createdRef.current && playerRef.current && playerRef.current.destroy) {
        playerRef.current.destroy()
      }
    }
  }, [open, videoId, volume])

  const play = () => {
    if (playerRef.current) {
      try { playerRef.current.playVideo() } catch {}
    }
  }

  const pause = () => {
    if (playerRef.current) {
      try { playerRef.current.pauseVideo() } catch {}
    }
  }

  const toggleMute = () => {
    if (!playerRef.current) return
    try {
      if (playerRef.current.isMuted()) {
        playerRef.current.unMute()
        setMuted(false)
      } else {
        playerRef.current.mute()
        setMuted(true)
      }
    } catch {}
  }

  const setVol = (v: number) => {
    setVolume(v)
    if (playerRef.current) {
      try { playerRef.current.setVolume(v) } catch {}
    }
  }

  const seek = (s: number) => {
    if (playerRef.current) {
      try { playerRef.current.seekTo(s, true) } catch {}
    }
  }

  return (
    <div className="fixed top-4 right-4 z-60">
      <div className="relative">
        <button
          aria-label="Abrir player"
          onClick={() => setOpen((s) => !s)}
          className="h-12 w-12 rounded-full bg-white/20 flex items-center justify-center shadow-lg hover:bg-white/30"
        >
          <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
            <path d="M8 5v14l11-7z" />
          </svg>
        </button>

        {open && (
          <div className="mt-2 w-80 rounded-2xl bg-white/5 p-3 shadow-lg backdrop-blur-sm">
            <div className="flex items-center justify-between mb-2">
              <div className="text-sm font-medium">Música</div>
              <div className="flex items-center gap-2">
                <button onClick={toggleMute} className="text-sm px-2 py-1 bg-white/10 rounded">{muted ? 'Unmute' : 'Mute'}</button>
                <button onClick={() => setOpen(false)} className="text-sm px-2 py-1 bg-white/10 rounded">Fechar</button>
              </div>
            </div>

            <div className="overflow-hidden rounded mb-2">
              <div id={containerId.current} className="w-full h-40" />
            </div>

            <div className="flex items-center gap-2">
              <button onClick={play} className="px-3 py-1 bg-indigo-600 rounded">Play</button>
              <button onClick={pause} className="px-3 py-1 bg-white/10 rounded">Pause</button>
              <div className="flex-1">
                <input
                  type="range"
                  min={0}
                  max={Math.max(1, Math.round(duration))}
                  value={Math.round(current)}
                  onChange={(e) => seek(Number(e.target.value))}
                  className="w-full"
                />
                <div className="text-xs text-white/70 flex justify-between">
                  <span>{Math.floor(current)}s</span>
                  <span>{Math.floor(duration)}s</span>
                </div>
              </div>
            </div>

            <div className="mt-2 flex items-center gap-2">
              <label className="text-xs text-white/70">Vol</label>
              <input
                type="range"
                min={0}
                max={100}
                value={volume}
                onChange={(e) => setVol(Number(e.target.value))}
                className="flex-1"
              />
            </div>

            <p className="mt-2 text-xs text-white/70">Controles finos via YouTube IFrame API. Clique Play e Unmute se necessário.</p>
          </div>
        )}
      </div>
    </div>
  )
}
