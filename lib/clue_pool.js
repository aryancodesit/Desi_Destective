export const CLUE_POOL = {
    // --- GENERIC CLUES (Can apply to any case) ---
    generic: [
        {
            id: 'gen_001',
            type: 'PHYSICAL',
            text: "A torn piece of fabric with a distinct pattern.",
            tags: ['struggle', 'clothing'],
            complexity: 1
        },
        {
            id: 'gen_002',
            type: 'DIGITAL',
            text: "Encrypted email about a 'cleaning' service.",
            tags: ['finance', 'conspiracy'],
            complexity: 2
        },
        {
            id: 'gen_003',
            type: 'TESTIMONIAL',
            text: "Witness saw someone running away at 10 PM.",
            tags: ['timeline', 'witness'],
            complexity: 1
        },
        {
            id: 'gen_004',
            type: 'PHYSICAL',
            text: "Muddy footprints leading to the back exit.",
            tags: ['entry_exit', 'procedural'],
            complexity: 1
        },
        {
            id: 'gen_005',
            type: 'DIGITAL',
            text: "Deleted call log to an unknown number (Burner Phone).",
            tags: ['comm', 'secrecy'],
            complexity: 2
        }
    ],

    // --- CASE SPECIFIC POOLS (To mix with generic) ---
    '001': [ // The Silence of the Sangeet
        {
            id: 'c1_001',
            type: 'PHYSICAL',
            text: "Crushed peanut shells under the table.",
            tags: ['killer_clue', 'poison'], // Definitive
            complexity: 1
        },
        {
            id: 'c1_002',
            type: 'DIGITAL',
            text: "CCTV footage erased from 20:00 to 20:30.",
            tags: ['tampering'],
            complexity: 2
        },
        {
            id: 'c1_003',
            type: 'TESTIMONIAL',
            text: "Waiter overheard a fight about 'inheritance'.",
            tags: ['motive', 'money'],
            complexity: 1
        },
        {
            id: 'c1_004',
            type: 'PHYSICAL',
            text: "Empty vial of 'Adrenaline' in the trash.",
            tags: ['medical', 'red_herring'],
            complexity: 2
        }
    ],
    '002': [ // The Bangalore Bit-Rot
        // ... (To be filled)
    ]
};

export const MOTIVES = {
    'money': "Deep in debt and needed the inheritance immediately.",
    'revenge': "blamed the victim for a past tragedy.",
    'silence': "The victim was about to expose a dark secret.",
    'jealousy': "Couldn't stand the victim's success."
};
