'use client';

import React from 'react';
import CaseTemplate from './CaseTemplate';
import { AudioIsolator } from '../tools/ForensicTools';

const Case003 = () => {
    return (
        <CaseTemplate
            caseId="003"
            ToolComponent={AudioIsolator}
            toolProps={{}}
        />
    );
};

export default Case003;
