import React, { createContext, useState, useContext, ReactNode } from 'react';

interface SharedAudioContextType {
  sharedAudioUri: string | null;
  setSharedAudioUri: (uri: string | null) => void;
  hasSharedAudio: boolean;
  clearSharedAudio: () => void;
}

const SharedAudioContext = createContext<SharedAudioContextType | undefined>(undefined);

export const SharedAudioProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [sharedAudioUri, setSharedAudioUri] = useState<string | null>(null);

  const clearSharedAudio = () => {
    setSharedAudioUri(null);
  };

  return (
    <SharedAudioContext.Provider
      value={{
        sharedAudioUri,
        setSharedAudioUri,
        hasSharedAudio: !!sharedAudioUri,
        clearSharedAudio,
      }}
    >
      {children}
    </SharedAudioContext.Provider>
  );
};

export const useSharedAudio = () => {
  const context = useContext(SharedAudioContext);
  if (!context) {
    throw new Error('useSharedAudio must be used within SharedAudioProvider');
  }
  return context;
};
