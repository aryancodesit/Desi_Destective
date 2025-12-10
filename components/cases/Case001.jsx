'use client';

import React from 'react';
import CaseTemplate from './CaseTemplate';
import { StegoScanner } from '../tools/ForensicTools';

const Case001 = () => {
    // Case 001 Configuration
    // The engine handles the logic. We just pass the tool.
    const toolProps = {
        hiddenText: "TIME: 20:45 | LOC: GREEN_ROOM",
        hiddenSubtext: "Matches Mr. Mehta's entry logs."
    };

    return (
        <CaseTemplate
            caseId="001"
            ToolComponent={StegoScanner}
            toolProps={toolProps}
        />
    );
};

export default Case001;
