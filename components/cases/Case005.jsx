'use client';

import React from 'react';
import CaseTemplate from './CaseTemplate';
import { GeoTracer } from '../tools/ForensicTools';

const Case005 = () => {
    return (
        <CaseTemplate
            caseId="005"
            ToolComponent={GeoTracer}
            toolProps={{}}
        />
    );
};

export default Case005;
