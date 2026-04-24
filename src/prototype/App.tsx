import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ThemeProvider } from '../design-system/theme';
import { FrameProvider, IPhoneFrame } from '../shell';
import { HomeScreen } from './screens/HomeScreen';

export const App: React.FC = () => (
  <ThemeProvider initialTheme="light">
    <FrameProvider>
      <BrowserRouter>
        <IPhoneFrame>
          <Routes>
            <Route path="/" element={<HomeScreen />} />
          </Routes>
        </IPhoneFrame>
      </BrowserRouter>
    </FrameProvider>
  </ThemeProvider>
);
