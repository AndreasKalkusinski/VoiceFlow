import { useState, useCallback } from 'react';
import { useAudioPlayer, useAudioPlayerStatus, setAudioModeAsync } from 'expo-audio';

export interface PlaybackHook {
  isPlaying: boolean;
  isLoading: boolean;
  currentTime: number;
  duration: number;
  play: (uri: string) => Promise<void>;
  pause: () => void;
  resume: () => void;
  stop: () => void;
}

export function usePlayback(): PlaybackHook {
  const [audioUri, setAudioUri] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const player = useAudioPlayer(audioUri);
  const status = useAudioPlayerStatus(player);

  const play = useCallback(
    async (uri: string) => {
      try {
        setIsLoading(true);

        // Setup audio mode for playback
        await setAudioModeAsync({
          allowsRecordingIOS: false,
          playsInSilentModeIOS: true,
        });

        // Set the URI and play
        setAudioUri(uri);
        player.replace({ uri });
        player.play();

        setIsLoading(false);
      } catch (error) {
        console.error('Failed to play audio:', error);
        setIsLoading(false);
        throw error;
      }
    },
    [player],
  );

  const pause = useCallback(() => {
    player.pause();
  }, [player]);

  const resume = useCallback(() => {
    player.play();
  }, [player]);

  const stop = useCallback(() => {
    player.pause();
    player.seekTo(0);
  }, [player]);

  return {
    isPlaying: status.playing,
    isLoading,
    currentTime: status.currentTime,
    duration: status.duration,
    play,
    pause,
    resume,
    stop,
  };
}
