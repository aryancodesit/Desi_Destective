import { CASES_DATA } from './cases';
import { CLUE_POOL, MOTIVES } from './clue_pool';

// --- UTILS ---
const getRandom = (arr) => arr[Math.floor(Math.random() * arr.length)];
const shuffle = (arr) => [...arr].sort(() => Math.random() - 0.5);

/**
 * Generates a full game state for a specific case ID.
 * This ensures replayability by randomizing the Killer, Motive, and Clue distribution.
 */
export const generateGameSession = (caseId) => {
    const staticData = CASES_DATA[caseId];
    if (!staticData) return null;

    // 1. SELECT SUSPECTS
    // In a full version, we might pick 3 random suspects from a larger pool.
    // For now, we take the defined suspects and maybe shuffling them or adding a generic one if needed.
    // Let's assume CASES_DATA has at least 3 suspects to make it interesting.
    // For this engine, we will SHUFFLE roles to make it replayable.
    // We force one to be the killer.

    let suspects = shuffle(staticData.suspects.map(s => ({ ...s }))); // Deep clone to avoid mutating static data

    // 2. ASSIGN ROLES
    const killerIndex = Math.floor(Math.random() * suspects.length);
    suspects.forEach((s, idx) => {
        if (idx === killerIndex) {
            s.isKiller = true;
            s.role = "The Culprit"; // Hidden from UI, logic purpose
            s.motive = getRandom(Object.values(MOTIVES));
        } else {
            s.isKiller = false;
            s.role = "Suspect";
        }
    });

    // 3. GENERATE CLUES
    // We need:
    // - 1 Definitive "Smoking Gun" (connected to killer)
    // - 2 Motive Clues (connected to killer)
    // - 2 Red Herrings (connected to innocent suspects)
    // - 3 Generic Ambient Clues (flavor text)

    let generatedClues = [];

    // Smoking Gun
    const killer = suspects[killerIndex];
    if (staticData.clues) {
        // Try to find a clue tagged 'killer_clue' from static data, or make a generic one
        // For complexity, let's just grab random clues from the pool for now and assign "ownership"
        // This serves as the 'logic' layer.
    }

    // SIMPLIFIED LOGIC FOR PROTOTYPE:
    // We will just mix static clues + generic clues.
    // Real "logic generation" requires a constraint solver (future step).
    // Here we just ensure we have a list.

    let pool = [...(CLUE_POOL[caseId] || []), ...CLUE_POOL['generic']];
    let selectedClues = shuffle(pool).slice(0, 8); // Pick 8 random clues

    // MAPPING CLUES TO SUSPECTS (The "Board" Logic)
    // We simply assign ownership or relatedness randomly for the 'Investigation Board' mechanic.
    selectedClues = selectedClues.map(c => ({
        ...c,
        relatedSuspectId: Math.random() > 0.5 ? getRandom(suspects).id : null,
        status: 'UNFOUND', // UNFOUND -> FOUND -> ANALYZED
        location: getRandom(['Scene', 'Body', 'Trash', 'Digital']) // Where to find it
    }));

    // 4. SET DIFFICULTY PARAMS
    const difficulty = {
        movesLeft: 24, // "Hours" in game time. Each action costs 1 hour.
        message: "You have 24 hours before the suspect flees."
    };

    return {
        caseInfo: staticData,
        suspects: suspects,
        clues: selectedClues,
        state: {
            currentLocation: 'HQ',
            timeElapsed: 0,
            verdictLocked: true,
            notes: []
        },
        difficulty
    };
};

/**
 * Validates a verdict.
 */
export const checkVerdict = (sessionId, suspectId, sessionState) => {
    // secure check
    const suspect = sessionState.suspects.find(s => s.id === suspectId);
    return suspect && suspect.isKiller;
};
