// store.js - Centralized Game State Management for Desi Detective OS

const STORAGE_PREFIX = 'desi_detective_case_';

// Default state: Case 001 is open, others locked
const DEFAULT_GAME_STATE = {
  '001': 'ACTIVE',
  '002': 'LOCKED',
  '003': 'LOCKED',
  '004': 'LOCKED',
  '005': 'LOCKED'
};

/**
 * Retrieves the current status of a specific case.
 * @param {string} caseId - The ID of the case (e.g., '001', '002')
 * @returns {string} - 'LOCKED' | 'ACTIVE' | 'SOLVED'
 */
export const getCaseStatus = (caseId) => {
  if (typeof window === 'undefined') return 'LOCKED'; // SSR Safety
  
  const storedStatus = localStorage.getItem(`${STORAGE_PREFIX}${caseId}`);
  return storedStatus || DEFAULT_GAME_STATE[caseId] || 'LOCKED';
};

/**
 * Gets all case statuses at once (useful for Dashboard)
 */
export const getAllCaseStatuses = () => {
  const statuses = {};
  Object.keys(DEFAULT_GAME_STATE).forEach(id => {
    statuses[`case${id}`] = getCaseStatus(id);
  });
  return statuses;
};

/**
 * Marks a case as SOLVED.
 * @param {string} caseId - ID of the case just solved
 */
export const markCaseSolved = (caseId) => {
  if (typeof window === 'undefined') return;
  localStorage.setItem(`${STORAGE_PREFIX}${caseId}`, 'SOLVED');
};

/**
 * Unlocks the next case in the sequence.
 * @param {string} caseId - ID of the case to unlock
 */
export const unlockCase = (caseId) => {
  if (typeof window === 'undefined') return;
  
  // Only unlock if currently LOCKED (don't overwrite SOLVED)
  const current = getCaseStatus(caseId);
  if (current === 'LOCKED') {
    localStorage.setItem(`${STORAGE_PREFIX}${caseId}`, 'ACTIVE');
  }
};

/**
 * Resets all game progress (Useful for testing or "New Game")
 */
export const resetGameProgress = () => {
  if (typeof window === 'undefined') return;
  
  Object.keys(DEFAULT_GAME_STATE).forEach(id => {
    localStorage.removeItem(`${STORAGE_PREFIX}${id}`);
  });
  // Optional: Reload to reflect changes
  window.location.reload();
};