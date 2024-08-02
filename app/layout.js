"use client";

import '../styles/globals.css';
import Navbar from '@components/Navbar/Navbar';
import Footer from '@components/Footer/Footer';
import map from '../icons/mapUkr.svg';
import Image from 'next/image';
import Donate from '@components/Donate';
import { UserProvider } from '../hooks/useUser';
import { useEffect } from "react";

import { metaData } from '@app/data/metaData';

const RootLayout = ({ children }) => {
  useEffect(() => {
    const noop = () => { };
    const methods = [
      'log', 'warn', 'info', 'error', 'debug', 'trace', 'dir', 'group', 'groupCollapsed', 'groupEnd', 'time', 'timeEnd', 'timeLog', 'timeStamp', 'profile', 'profileEnd', 'clear', 'table', 'assert', 'count', 'countReset'
    ];

    methods.forEach(method => {
      console[method] = noop;
    });
  }, []);

  return (
    <html lang="en">
      <head>
        <title>{metaData.mainPage.title}</title>
        <meta name="description" content={metaData.mainPage.description} />
        <meta property="og:type" content="website" />
        <meta property="og:title" content={metaData.mainPage.title} />
        <meta
          property="og:description"
          content={metaData.mainPage.description}
        />
        <meta property="og:url" content="https://www.24serpnya.com.ua/" />
        <link rel="manifest" href="/manifest.json" />
      </head>
      <body>
        <UserProvider>
          <Navbar />
          <main>{children}</main>
          <Image className="map" src={map} alt="map" />
          <Donate />
          <Footer />
          <div id='modal-root'></div>
        </UserProvider>
      </body>
    </html>
  );
};

export default RootLayout;
