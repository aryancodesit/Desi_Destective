// --- CONFIGURATION FOR ALL CASES ---
// This file acts as the database. 
// "toolName" maps to the component names in ForensicTools.jsx

export const CASES_DATA = {
    '001': {
        title: "The Silence of the Sangeet",
        location: "Oberoi Palace, Udaipur",
        objective: "Recover hidden data from the wedding photo to verify the alibi.",
        plot: "The 'Sangeet' ceremony at the opulent Oberoi Palace was meant to be the highlight of the wedding season. However, amidst the dhol beats and dance performances, the groom's father, Mr. Oberoi, collapsed. Initial reports suggested a heart attack, but the rapid onset and specific symptoms point to foul play. The high-profile nature of the guests has the local police paralyzed.\n\nYou have been brought in to uncover the truth. A seemingly innocent wedding photo found on a guest's cloud drive might hold the key. Hidden within its pixels is digital residue that contradicts the official timeline. Your mission is to decode this image using the StegoScanner and expose the real sequence of events before the killer escapes across the border.",
        toolName: 'StegoScanner', // <--- Points to the specific tool to load
        toolProps: {
            hiddenText: "TIME: 20:45 | LOC: GREEN_ROOM",
            hiddenSubtext: "Matches Mr. Mehta's entry logs."
        },
        suspects: [
            {
                id: 's1',
                name: 'Rohan Oberoi',
                role: 'The Son',
                bio: 'Forced into family business.',
                isKiller: false,
                moreInfo: "Rohan has been publicly vocal about his disdain for the family empire, preferring his art studio in Berlin. Rumors suggest his father threatened to cut him off if he didn't return to take over. He was seen arguing with his father minutes before the collapse."
            },
            {
                id: 's2',
                name: 'Mr. Mehta',
                role: 'The Rival',
                bio: 'Stock portfolio is suspicious.',
                isKiller: true,
                moreInfo: "A ruthless business tycoon whose net worth has plummeted due to Oberoi's recent acquisitions. Insider trading logs suggest he shorted Oberoi Industries stock hours before the event. He has a history of corporate espionage."
            },
            {
                id: 's3',
                name: 'Simran',
                role: 'Event Planner',
                bio: 'Unpaid dues of ₹50 Lakhs.',
                isKiller: false,
                moreInfo: "The mastermind behind the wedding's logistics. She has impeccable taste but a messy financial record. Sources claim she pilfered funds from the wedding budget to pay off loan sharks. Mr. Oberoi reportedly confronted her about the discrepancies earlier that day."
            },
        ],
        clues: [
            { id: 'c1', type: 'physical', text: "Autopsy: Anaphylactic Shock (Peanuts)." },
            { id: 'c2', type: 'physical', text: "Trash: Empty EpiPen found in Green Room." },
        ]
    },
    '002': {
        title: "The Bangalore Bit-Rot",
        location: "Server Farm, Electronic City",
        objective: "Repair the corrupted file header to view the webcam capture.",
        plot: "A revolutionary AI algorithm was stolen from the servers of 'NeuralNet Corp' just hours before its IPO. The CEO blames a rival, but the SysAdmin claims it was an inside job by the Co-Founder. The only evidence is a corrupted video file recorded by a webcam in the server room during the theft. The file's header has been deliberately sabotaged to prevent playback. You need to repair the hex code of the file header to reveal the identity of the thief.",
        toolName: 'HexEditor',
        toolProps: {},
        suspects: [
            { id: 's1', name: 'The Co-Founder', role: 'Insider', bio: 'Wanted to sell the company.', isKiller: true },
            { id: 's2', name: 'SysAdmin', role: 'Disgruntled', bio: 'Fired for crypto mining.', isKiller: false },
        ],
        clues: [
            { id: 'c1', type: 'physical', text: "Note: 'Magic Bytes are the key'." },
            { id: 'c2', type: 'digital', text: "Server logs show internal access." },
        ]
    },
    '003': {
        title: "The Ghost of Golconda",
        location: "Golconda Fort, Hyderabad",
        objective: "Isolate the voice from the wind noise in the audio recording.",
        plot: "Legend speaks of the 'Nizam's Diamond' hidden within the walls of Golconda Fort. Last night, a famous historian was found unconscious near the Rani Mahal. He claims he was attacked by a 'spirit' protecting the treasure. Local police dismissed it as a hallucination, but his audio recorder captured the attack. The wind was howling at 70Hz, drowning out the attacker's voice. You must filter out the wind noise to hear the threats made and identify the assailant.",
        toolName: 'AudioIsolator',
        toolProps: {},
        suspects: [
            { id: 's1', name: 'Treasure Hunter', role: 'Outsider', bio: 'Obsessed with the diamonds.', isKiller: false },
            { id: 's2', name: 'PhD Student', role: 'Mentee', bio: 'Thesis was rejected.', isKiller: true },
        ],
        clues: [
            { id: 'c1', type: 'physical', text: "Diary: 'Wind howls at 70Hz here'." },
        ]
    },
    '004': {
        title: "The Midnight Local",
        location: "Western Line, Mumbai",
        objective: "Synchronize the station logs to disprove the suspect's alibi.",
        plot: "A bag containing ₹50 Lakhs in cash was snatched on the 10:45 PM Virar Fast local train. Two suspects were detained at Dadar station. One claims he got off at Bandra, while the other says the train was delayed. The station server clocks, however, have drifted due to a power surge, making the timestamps unreliable. You must calculate the time offset to synchronize the station logs and prove who was actually on the train when the theft occurred.",
        toolName: 'TimeSync',
        toolProps: {},
        suspects: [
            { id: 's1', name: 'Debt Collector', role: 'Mobster', bio: 'Owed ₹50 Lakhs.', isKiller: true },
            { id: 's2', name: 'Commuter', role: 'Witness', bio: 'Claims he was asleep.', isKiller: false },
        ],
        clues: [
            { id: 'c1', type: 'physical', text: "Report: Server Clock Drift is -5 mins." },
        ]
    },
    '005': {
        title: "The Bollywood Blackmail",
        location: "Film City, Mumbai",
        objective: "Extract GPS metadata from the leaked photo to find the safehouse.",
        plot: "Superstar Aryan Khan has gone missing days before his movie release. A ransom demand was sent to the studio with a photo of Aryan tied up in an unknown location. The kidnappers were careful to disable location services, but they forgot to scrub the EXIF metadata from the original image file. You need to extract the hidden GPS coordinates from the image to pinpoint the safehouse and rescue the star before the media gets wind of the kidnapping.",
        toolName: 'GeoTracer',
        toolProps: {},
        suspects: [
            { id: 's1', name: 'The Director', role: 'Creator', bio: 'Movie launch at stake.', isKiller: true },
            { id: 's2', name: 'Bodyguard', role: 'Protector', bio: 'Ex-Military.', isKiller: false },
        ],
        clues: [
            { id: 'c1', type: 'physical', text: "Magazine: Says photo was at 'Villa'." },
        ]
    }
};