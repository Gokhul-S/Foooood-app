import React, { createContext, useContext, useState, ReactNode } from 'react';

interface LocationContextType {
  selectedArea: string | null;
  selectedAreaName: string | null;
  setSelectedArea: (areaId: string | null, areaName: string | null) => void;
}

const LocationContext = createContext<LocationContextType | undefined>(undefined);

export function LocationProvider({ children }: { children: ReactNode }) {
  const [selectedArea, setArea] = useState<string | null>(null);
  const [selectedAreaName, setAreaName] = useState<string | null>(null);

  const setSelectedArea = (areaId: string | null, areaName: string | null) => {
    setArea(areaId);
    setAreaName(areaName);
  };

  return (
    <LocationContext.Provider value={{ selectedArea, selectedAreaName, setSelectedArea }}>
      {children}
    </LocationContext.Provider>
  );
}

export function useLocation() {
  const context = useContext(LocationContext);
  if (!context) {
    throw new Error('useLocation must be used within a LocationProvider');
  }
  return context;
}
