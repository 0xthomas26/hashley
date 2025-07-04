'use server';

import { getTokenMetadataByContract } from '@/services/token';
import { NextResponse, NextRequest } from 'next/server';

// GET TOKEN METADATA BY CONTRACT ADDRESS
export const POST = async (req: NextRequest) => {
    try {
        const { contractAddress } = await req.json();

        const resp = await getTokenMetadataByContract(contractAddress);

        return NextResponse.json({ data: resp });
    } catch (error: any) {
        console.log(error.message);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
};
