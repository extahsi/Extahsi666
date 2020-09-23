import type { AppFile, AppLoader } from '@/utils/programs.d';

import dynamic from 'next/dynamic';
import { extname } from 'path';
import { isValidUrl } from '@/utils/url';

import { loaderOptions as dosLoaderOptions } from '@/components/Programs/Dos';
import { loaderOptions as explorerLoaderOptions } from '@/components/Programs/Explorer';
import { loaderOptions as winampLoaderOptions } from '@/components/Programs/Winamp';

const Dos = dynamic(import('@/components/Programs/Dos')),
  Explorer = dynamic(import('@/components/Programs/Explorer')),
  Winamp = dynamic(import('@/components/Programs/Winamp'));

const appLoaderByName = (name: string): AppLoader | undefined => {
  // TODO: Make this generic and feed in a list?
  switch (name) {
    case 'dos':
      return {
        loader: Dos,
        loaderOptions: dosLoaderOptions
      };
    case 'explorer':
      return {
        loader: Explorer,
        loaderOptions: explorerLoaderOptions
      };
    case 'winamp':
      return {
        loader: Winamp,
        loaderOptions: winampLoaderOptions
      };
  }
};

const appLoaderByFileType = (
  appFile: AppFile,
  ext?: string,
  searchParams?: URLSearchParams
): AppLoader | undefined => {
  switch (ext || extname(appFile.url)) {
    case '.jsdos':
    case '.zip':
      return {
        loader: Dos,
        loaderOptions: dosLoaderOptions,
        loadedAppOptions: {
          file: appFile,
          args: searchParams ? [...searchParams.entries()].flat() : []
        }
      };
    case '.mp3':
    case '.m3u':
    case '.wsz':
      return {
        loader: Winamp,
        loaderOptions: winampLoaderOptions,
        loadedAppOptions: {
          file: appFile
        }
      };
  }
};

export const appLoader = (appFile: AppFile): AppLoader | undefined => {
  const { ext, url } = appFile;

  if (isValidUrl(url)) {
    const { pathname, searchParams } = new URL(url);

    return pathname === '/'
      ? appLoaderByName(searchParams.get('app') || '')
      : appLoaderByFileType(appFile, ext || extname(pathname), searchParams);
  }

  return appLoaderByFileType(appFile);
};
