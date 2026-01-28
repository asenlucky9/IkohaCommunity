'use client'

import { useState, useRef, useEffect } from 'react'
import { Music, Play, Pause, Volume2, VolumeX, SkipForward, SkipBack, List } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

export interface Track {
  id: string
  title: string
  artist?: string
  src: string
}

interface MusicPlayerProps {
  tracks?: Track[]
  defaultTrack?: Track
}

const defaultPlaylist: Track[] = [
  {
    id: '1',
    title: 'Ijesumwen',
    artist: 'Ikoha Community',
    src: '/Ijesumwen.mp3'
  }
]

export default function MusicPlayer({ 
  tracks = defaultPlaylist,
  defaultTrack
}: MusicPlayerProps) {
  const [playlist, setPlaylist] = useState<Track[]>(tracks)
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const [volume, setVolume] = useState(0.5)
  const [isMinimized, setIsMinimized] = useState(true)
  const [showPlaylist, setShowPlaylist] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [duration, setDuration] = useState(0)
  const [currentTime, setCurrentTime] = useState(0)
  const audioRef = useRef<HTMLAudioElement>(null)

  const currentTrack = playlist[currentTrackIndex]

  // Initialize with default track if provided
  useEffect(() => {
    if (defaultTrack) {
      const trackIndex = playlist.findIndex(t => t.id === defaultTrack.id)
      if (trackIndex !== -1) {
        setCurrentTrackIndex(trackIndex)
      } else {
        setPlaylist([defaultTrack, ...playlist])
        setCurrentTrackIndex(0)
      }
    }
  }, [defaultTrack])

  // Update audio source when track changes
  useEffect(() => {
    if (audioRef.current && currentTrack) {
      audioRef.current.src = currentTrack.src
      audioRef.current.load()
      setCurrentTime(0)
      setError(null)
    }
  }, [currentTrack])

  // Handle audio events
  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    audio.volume = volume
    audio.muted = isMuted

    const handlePlay = () => setIsPlaying(true)
    const handlePause = () => setIsPlaying(false)
    const handleError = (e: Event) => {
      console.error('Audio error:', e)
      setError(`Failed to load: ${currentTrack?.title || 'audio file'}`)
    }
    const handleLoadedData = () => {
      setError(null)
      setDuration(audio.duration)
    }
    const handleTimeUpdate = () => {
      setCurrentTime(audio.currentTime)
    }
    const handleEnded = () => {
      setIsPlaying(false)
      handleNext()
    }
    const handleLoadedMetadata = () => {
      setDuration(audio.duration)
    }

    audio.addEventListener('play', handlePlay)
    audio.addEventListener('pause', handlePause)
    audio.addEventListener('error', handleError)
    audio.addEventListener('loadeddata', handleLoadedData)
    audio.addEventListener('timeupdate', handleTimeUpdate)
    audio.addEventListener('ended', handleEnded)
    audio.addEventListener('loadedmetadata', handleLoadedMetadata)

    return () => {
      audio.removeEventListener('play', handlePlay)
      audio.removeEventListener('pause', handlePause)
      audio.removeEventListener('error', handleError)
      audio.removeEventListener('loadeddata', handleLoadedData)
      audio.removeEventListener('timeupdate', handleTimeUpdate)
      audio.removeEventListener('ended', handleEnded)
      audio.removeEventListener('loadedmetadata', handleLoadedMetadata)
    }
  }, [volume, isMuted, currentTrack])

  const togglePlay = async () => {
    if (audioRef.current) {
      try {
        if (isPlaying) {
          audioRef.current.pause()
          setIsPlaying(false)
        } else {
          await audioRef.current.play()
          setIsPlaying(true)
          setError(null)
        }
      } catch (err: any) {
        console.error('Audio play error:', err)
        setError('Unable to play audio. Please try again.')
        setIsPlaying(false)
      }
    }
  }

  const handleNext = () => {
    const nextIndex = (currentTrackIndex + 1) % playlist.length
    setCurrentTrackIndex(nextIndex)
    setIsPlaying(false)
  }

  const handlePrevious = () => {
    const prevIndex = currentTrackIndex === 0 ? playlist.length - 1 : currentTrackIndex - 1
    setCurrentTrackIndex(prevIndex)
    setIsPlaying(false)
  }

  const selectTrack = (index: number) => {
    setCurrentTrackIndex(index)
    setIsPlaying(false)
    setShowPlaylist(false)
  }

  const toggleMute = () => {
    setIsMuted(!isMuted)
  }

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value)
    setVolume(newVolume)
    if (audioRef.current) {
      audioRef.current.volume = newVolume
    }
  }

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTime = parseFloat(e.target.value)
    if (audioRef.current) {
      audioRef.current.currentTime = newTime
      setCurrentTime(newTime)
    }
  }

  const formatTime = (seconds: number) => {
    if (isNaN(seconds)) return '0:00'
    const mins = Math.floor(seconds / 60)
    const secs = Math.floor(seconds % 60)
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  const addTrack = (track: Track) => {
    setPlaylist([...playlist, track])
  }

  return (
    <>
      <audio
        ref={audioRef}
        preload="metadata"
      />

      {/* Floating Music Player Button */}
      <AnimatePresence>
        {isMinimized ? (
          <motion.button
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            onClick={() => setIsMinimized(false)}
            className="fixed bottom-6 right-6 z-50 bg-secondary hover:bg-secondary-dark text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 group"
            aria-label="Open music player"
          >
            <Music className="w-6 h-6" />
            {isPlaying && (
              <motion.div
                className="absolute inset-0 rounded-full border-2 border-white"
                animate={{ scale: [1, 1.3, 1] }}
                transition={{ duration: 1, repeat: Infinity }}
              />
            )}
            {playlist.length > 1 && (
              <span className="absolute -top-1 -right-1 bg-primary text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {playlist.length}
              </span>
            )}
          </motion.button>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed bottom-6 right-6 z-50 bg-white rounded-lg shadow-2xl p-4 w-96 max-h-[600px] border border-gray-200 flex flex-col"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Music className="w-5 h-5 text-secondary" />
                <h3 className="font-semibold text-gray-900">Music Player</h3>
                {playlist.length > 1 && (
                  <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                    {currentTrackIndex + 1}/{playlist.length}
                  </span>
                )}
              </div>
              <div className="flex items-center gap-2">
                {playlist.length > 1 && (
                  <button
                    onClick={() => setShowPlaylist(!showPlaylist)}
                    className="text-gray-400 hover:text-gray-600 p-1"
                    aria-label={showPlaylist ? 'Hide playlist' : 'Show playlist'}
                    title={showPlaylist ? 'Hide playlist' : 'Show playlist'}
                  >
                    <List className="w-4 h-4" />
                  </button>
                )}
                <button
                  onClick={() => setIsMinimized(true)}
                  className="text-gray-400 hover:text-gray-600 text-sm"
                  aria-label="Minimize music player"
                >
                  Minimize
                </button>
              </div>
            </div>

            {/* Current Track Info */}
            <div className="mb-4">
              <p className="text-sm font-medium text-gray-900 mb-1">
                {currentTrack?.title || 'No track selected'}
              </p>
              {currentTrack?.artist && (
                <p className="text-xs text-gray-600 mb-2">{currentTrack.artist}</p>
              )}
              {error && (
                <div className="mb-3 p-2 bg-red-50 border border-red-200 rounded text-xs text-red-700">
                  {error}
                </div>
              )}
            </div>

            {/* Progress Bar */}
            {duration > 0 && (
              <div className="mb-4">
                <input
                  type="range"
                  min="0"
                  max={duration || 0}
                  value={currentTime}
                  onChange={handleSeek}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary"
                  aria-label="Seek"
                />
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>{formatTime(currentTime)}</span>
                  <span>{formatTime(duration)}</span>
                </div>
              </div>
            )}

            {/* Playback Controls */}
            <div className="flex items-center gap-3 mb-4">
              {playlist.length > 1 && (
                <button
                  onClick={handlePrevious}
                  className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-full transition-colors"
                  aria-label="Previous track"
                  title="Previous track"
                >
                  <SkipBack className="w-5 h-5" />
                </button>
              )}
              <button
                onClick={togglePlay}
                className="p-2 bg-primary hover:bg-primary-dark text-white rounded-full transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                aria-label={isPlaying ? 'Pause' : 'Play'}
                disabled={!!error}
              >
                {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
              </button>
              {playlist.length > 1 && (
                <button
                  onClick={handleNext}
                  className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-full transition-colors"
                  aria-label="Next track"
                  title="Next track"
                >
                  <SkipForward className="w-5 h-5" />
                </button>
              )}
              <div className="flex-1 flex items-center gap-2">
                <button
                  onClick={toggleMute}
                  className="p-1 text-gray-600 hover:text-gray-900 disabled:opacity-50"
                  aria-label={isMuted ? 'Unmute' : 'Mute'}
                  disabled={!!error}
                >
                  {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                </button>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.01"
                  value={volume}
                  onChange={handleVolumeChange}
                  className="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary disabled:opacity-50"
                  aria-label="Volume control"
                  disabled={!!error}
                />
                <span className="text-xs text-gray-500 w-8">{Math.round(volume * 100)}%</span>
              </div>
            </div>

            {/* Playlist */}
            {showPlaylist && playlist.length > 1 && (
              <div className="border-t border-gray-200 pt-4 mt-4 overflow-y-auto max-h-64">
                <h4 className="text-xs font-semibold text-gray-700 mb-2">Playlist</h4>
                <div className="space-y-1">
                  {playlist.map((track, index) => (
                    <button
                      key={track.id}
                      onClick={() => selectTrack(index)}
                      className={`w-full text-left p-2 rounded text-sm transition-colors ${
                        index === currentTrackIndex
                          ? 'bg-primary text-white'
                          : 'hover:bg-gray-100 text-gray-700'
                      }`}
                      aria-label={`Play ${track.title}`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex-1 min-w-0">
                          <p className={`font-medium truncate ${
                            index === currentTrackIndex ? 'text-white' : 'text-gray-900'
                          }`}>
                            {track.title}
                          </p>
                          {track.artist && (
                            <p className={`text-xs truncate ${
                              index === currentTrackIndex ? 'text-white/80' : 'text-gray-500'
                            }`}>
                              {track.artist}
                            </p>
                          )}
                        </div>
                        {index === currentTrackIndex && isPlaying && (
                          <motion.div
                            className="ml-2"
                            animate={{ rotate: 360 }}
                            transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                          >
                            <Music className="w-4 h-4 text-white" />
                          </motion.div>
                        )}
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            <p className="text-xs text-gray-500 mt-4">
              Ikoha Community music. {playlist.length > 1 ? 'Browse your playlist above.' : 'Add more tracks to create a playlist.'}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
