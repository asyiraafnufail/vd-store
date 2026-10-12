/**
 * Settings Helper — VD Phone Store
 * Read from localStorage, fallback ke constants
 */

const DEFAULT_WA_NUMBER = '6281234567890'
const DEFAULT_STORE_NAME = 'VD Phone Store'
const STORAGE_KEY = 'vd_store_settings'

export interface Settings {
  waNumber: string
  storeName: string
}

export function getSettingsFromStorage(): Settings {
  try {
    if (typeof window === 'undefined') return getDefaults()
    const stored = localStorage.getItem(STORAGE_KEY)
    return stored ? JSON.parse(stored) : getDefaults()
  } catch {
    return getDefaults()
  }
}

export function getDefaults(): Settings {
  return {
    waNumber: DEFAULT_WA_NUMBER,
    storeName: DEFAULT_STORE_NAME,
  }
}

export function getWANumber(): string {
  return getSettingsFromStorage().waNumber
}

export function getStoreName(): string {
  return getSettingsFromStorage().storeName
}
