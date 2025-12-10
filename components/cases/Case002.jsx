'use client';

import React from 'react';
import CaseTemplate from './CaseTemplate';
import { HexEditor } from '../tools/ForensicTools';

const Case002 = () => {
    return (
        <CaseTemplate
            caseId="002"
            ToolComponent={HexEditor}
            toolProps={{}}
        />
    );
};

export default Case002;
