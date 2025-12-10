'use client';

import React from 'react';
import CaseTemplate from './CaseTemplate';
import { TimeSync } from '../tools/ForensicTools';

const Case004 = () => {
    return (
        <CaseTemplate
            caseId="004"
            ToolComponent={TimeSync}
            toolProps={{}}
        />
    );
};

export default Case004;
