import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ThemeProvider } from '../design-system/theme';
import { IPhoneFrame } from '../shell';
import { HomeScreen } from './screens/HomeScreen';

export const App: React.FC = () => (
  <ThemeProvider initialTheme="light">
    <BrowserRouter>
      <IPhoneFrame>
        <Routes>
          <Route path="/" element={<HomeScreen />} />
        </Routes>
      </IPhoneFrame>
    </BrowserRouter>
  </ThemeProvider>
);
