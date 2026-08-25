import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  useCallback,
} from 'react'

const AudioPlayerContext = createContext(null)

/**
 * Wrap your app (or just the layout) in <AudioPlayerProvider> once. It owns
 * a single <audio> element so only one preview ever plays at a time, no
 * matter how many <TrackList> rows are on screen.
 *
 * const { currentTrack, isPlaying, play, togglePlay } = usePlayer()
 */
export function AudioPlayerProvider({ children }) {
  const audioRef = useRef(null)
  if (!audioRef.current && typeof Audio !== 'undefined') {
    audioRef.current = new Audio()
    audioRef.current.preload = 'metadata'
  }

  const [currentTrack, setCurrentTrack] = useState(null) // { id, title, albumTitle, coverUrl, previewUrl }
  const [isPlaying, setIsPlaying] = useState(false)
  const [progress, setProgress] = useState(0) // seconds
  const [duration, setDuration] = useState(0) // seconds
  const [volume, setVolumeState] = useState(0.8)

  // Wire up <audio> event listeners once.
  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    const onTimeUpdate = () => setProgress(audio.currentTime)
    const onLoadedMetadata = () => setDuration(audio.duration || 0)
    const onEnded = () => {
      setIsPlaying(false)
      setProgress(0)
    }

    audio.addEventListener('timeupdate', onTimeUpdate)
    audio.addEventListener('loadedmetadata', onLoadedMetadata)
    audio.addEventListener('ended', onEnded)
    audio.volume = volume

    return () => {
      audio.removeEventListener('timeupdate', onTimeUpdate)
      audio.removeEventListener('loadedmetadata', onLoadedMetadata)
      audio.removeEventListener('ended', onEnded)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const play = useCallback((track) => {
    const audio = audioRef.current
    if (!audio || !track?.previewUrl) return

    const isSameTrack = currentTrack?.id === track.id
    if (!isSameTrack) {
      audio.src = track.previewUrl
      setCurrentTrack(track)
      setProgress(0)
    }
    audio.play()
    setIsPlaying(true)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentTrack])

  const pause = useCallback(() => {
    audioRef.current?.pause()
    setIsPlaying(false)
  }, [])

  const togglePlay = useCallback(
    (track) => {
      if (track && currentTrack?.id !== track.id) {
        play(track)
        return
      }
      if (isPlaying) {
        pause()
      } else {
        audioRef.current?.play()
        setIsPlaying(true)
      }
    },
    [currentTrack, isPlaying, pause, play]
  )

  const seek = useCallback((seconds) => {
    const audio = audioRef.current
    if (!audio) return
    audio.currentTime = seconds
    setProgress(seconds)
  }, [])

  const setVolume = useCallback((value) => {
    const clamped = Math.min(1, Math.max(0, value))
    setVolumeState(clamped)
    if (audioRef.current) audioRef.current.volume = clamped
  }, [])

  const value = useMemo(
    () => ({
      currentTrack,
      isPlaying,
      progress,
      duration,
      volume,
      play,
      pause,
      togglePlay,
      seek,
      setVolume,
    }),
    [currentTrack, isPlaying, progress, duration, volume, play, pause, togglePlay, seek, setVolume]
  )

  return (
    <AudioPlayerContext.Provider value={value}>
      {children}
    </AudioPlayerContext.Provider>
  )
}

export function usePlayer() {
  const ctx = useContext(AudioPlayerContext)
  if (!ctx) {
    throw new Error('usePlayer() must be used inside <AudioPlayerProvider>')
  }
  return ctx
}
