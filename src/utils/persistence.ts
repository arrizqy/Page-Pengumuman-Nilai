import { GoogleSheetConfig, UniversitySettings } from '../types';
import { extractGoogleSheetId } from './googleSheets';

const STORAGE_KEY_CONFIG = 'siakad_uts_sheet_config_v1';
const STORAGE_KEY_SETTINGS = 'siakad_uts_settings_v1';

// Public cloud sync endpoint key (fallback cross-device key-value store)
const KV_ENDPOINT = 'https://api.allorigins.win/raw?url=' + encodeURIComponent('https://jsonblob.com/api/jsonBlob/');

export interface ResolvedInitialConfig {
  config: GoogleSheetConfig;
  source: 'url' | 'localStorage' | 'env' | 'default';
}

/**
 * Extracts sheetId and gid from current URL search params or hash
 */
export function getSheetParamsFromUrl(): { sheetId: string | null; gid: string | null } {
  if (typeof window === 'undefined') {
    return { sheetId: null, gid: null };
  }

  try {
    const url = new URL(window.location.href);
    let sheetParam = url.searchParams.get('sheet') || 
                     url.searchParams.get('sheetId') || 
                     url.searchParams.get('id') || 
                     url.searchParams.get('spreadsheet');

    let gidParam = url.searchParams.get('gid');

    // Check hash anchor as well (#sheet=... or #/sheet/...)
    if (!sheetParam && window.location.hash) {
      const hash = window.location.hash.substring(1);
      const hashParams = new URLSearchParams(hash.includes('?') ? hash.split('?')[1] : hash);
      sheetParam = hashParams.get('sheet') || hashParams.get('sheetId') || hashParams.get('id');
      if (!gidParam) {
        gidParam = hashParams.get('gid');
      }
    }

    if (sheetParam) {
      const extracted = extractGoogleSheetId(sheetParam);
      return { sheetId: extracted, gid: gidParam || '0' };
    }
  } catch (e) {
    console.warn('Error reading sheet params from URL:', e);
  }

  return { sheetId: null, gid: null };
}

/**
 * Updates browser URL with the linked sheetId without page reload
 */
export function updateUrlWithSheetId(sheetId: string | null, gid: string = '0'): void {
  if (typeof window === 'undefined') return;

  try {
    const url = new URL(window.location.href);
    if (sheetId && sheetId.trim().length > 10) {
      const cleanId = extractGoogleSheetId(sheetId);
      url.searchParams.set('sheet', cleanId);
      if (gid && gid !== '0') {
        url.searchParams.set('gid', gid);
      } else {
        url.searchParams.delete('gid');
      }
    } else {
      url.searchParams.delete('sheet');
      url.searchParams.delete('sheetId');
      url.searchParams.delete('id');
      url.searchParams.delete('gid');
    }
    window.history.replaceState({}, '', url.toString());
  } catch (e) {
    console.warn('Could not update URL state:', e);
  }
}

/**
 * Generates a full shareable link that anyone on any device can open
 */
export function getShareablePortalUrl(sheetId: string, gid: string = '0'): string {
  if (typeof window === 'undefined') return '';
  const cleanId = extractGoogleSheetId(sheetId);
  const origin = window.location.origin;
  const pathname = window.location.pathname;
  let url = `${origin}${pathname}?sheet=${encodeURIComponent(cleanId)}`;
  if (gid && gid !== '0') {
    url += `&gid=${encodeURIComponent(gid)}`;
  }
  return url;
}

/**
 * Saves config to local storage
 */
export function saveConfigToStorage(config: GoogleSheetConfig): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEY_CONFIG, JSON.stringify(config));
  } catch (e) {
    console.warn('Failed to save config to localStorage:', e);
  }
}

/**
 * Saves settings to local storage
 */
export function saveSettingsToStorage(settings: UniversitySettings): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEY_SETTINGS, JSON.stringify(settings));
  } catch (e) {
    console.warn('Failed to save settings to localStorage:', e);
  }
}

/**
 * Reads settings from local storage
 */
export function loadSettingsFromStorage(defaultSettings: UniversitySettings): UniversitySettings {
  if (typeof window === 'undefined') return defaultSettings;
  try {
    const raw = localStorage.getItem(STORAGE_KEY_SETTINGS);
    if (raw) {
      const parsed = JSON.parse(raw);
      return { ...defaultSettings, ...parsed };
    }
  } catch (e) {
    console.warn('Failed to load settings from localStorage:', e);
  }
  return defaultSettings;
}

/**
 * Resolves initial GoogleSheetConfig considering:
 * 1. URL Query Parameter (?sheet=...) - Highest priority
 * 2. LocalStorage (previously saved on this device)
 * 3. Environment Variable (VITE_SHEET_ID / VITE_DEFAULT_SHEET_ID)
 * 4. Default Demo fallback
 */
export function getInitialGoogleSheetConfig(defaultConfig: GoogleSheetConfig): ResolvedInitialConfig {
  // 1. Check URL parameters
  const urlParams = getSheetParamsFromUrl();
  if (urlParams.sheetId) {
    const cfg: GoogleSheetConfig = {
      ...defaultConfig,
      sheetId: urlParams.sheetId,
      gid: urlParams.gid || '0',
      mode: 'public_csv',
      isRealTime: true,
      lastFetchedAt: 'Tersambung via Link URL',
    };
    saveConfigToStorage(cfg);
    return { config: cfg, source: 'url' };
  }

  // 2. Check LocalStorage
  if (typeof window !== 'undefined') {
    try {
      const raw = localStorage.getItem(STORAGE_KEY_CONFIG);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (parsed.sheetId && parsed.mode === 'public_csv') {
          return {
            config: { ...defaultConfig, ...parsed },
            source: 'localStorage',
          };
        }
      }
    } catch (e) {
      console.warn('Failed to load config from storage:', e);
    }
  }

  // 3. Check Environment Variables (Netlify deploy support)
  const envSheetId = (import.meta as any).env?.VITE_SHEET_ID || (import.meta as any).env?.VITE_DEFAULT_SHEET_ID;
  const envGid = (import.meta as any).env?.VITE_SHEET_GID || '0';
  if (envSheetId && typeof envSheetId === 'string' && envSheetId.trim().length > 10) {
    const cleanId = extractGoogleSheetId(envSheetId);
    const cfg: GoogleSheetConfig = {
      ...defaultConfig,
      sheetId: cleanId,
      gid: envGid,
      mode: 'public_csv',
      isRealTime: true,
      lastFetchedAt: 'Tersambung via Environment Variable Netlify',
    };
    saveConfigToStorage(cfg);
    return { config: cfg, source: 'env' };
  }

  return { config: defaultConfig, source: 'default' };
}

/**
 * Checks public /sheet-config.json static file (if present on deployment)
 */
export async function fetchStaticSheetConfig(): Promise<{ sheetId: string; gid?: string } | null> {
  if (typeof window === 'undefined') return null;
  try {
    const res = await fetch('/sheet-config.json', { cache: 'no-cache' });
    if (res.ok) {
      const data = await res.json();
      if (data && data.sheetId) {
        return {
          sheetId: extractGoogleSheetId(data.sheetId),
          gid: data.gid || '0',
        };
      }
    }
  } catch {
    // File not found or not deployed, which is expected
  }
  return null;
}
