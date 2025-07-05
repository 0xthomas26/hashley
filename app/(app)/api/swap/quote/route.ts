'use server';

import { NextResponse, NextRequest } from 'next/server';

export const POST = async (req: NextRequest) => {
    try {
        const { buyToken, sellToken, sellAmount, taker } = await req.json();

        if (!buyToken || !sellToken || !sellAmount || !taker) {
            return NextResponse.json({ error: 'Missing buyToken, sellToken, sellAmount, or taker' }, { status: 400 });
        }

        const zeroXRes = await fetch(
            `https://api.0x.org/swap/allowance-holder/quote?sellAmount=${sellAmount}&sellToken=${sellToken}&buyToken=${buyToken}&chainId=137&taker=${taker}`,
            {
                headers: {
                    '0x-api-key': process.env.ZEROX_API_KEY!,
                    '0x-version': 'v2',
                    Accept: 'application/json',
                },
            }
        );

        const zeroXData = await zeroXRes.json();

        if (!zeroXRes.ok) {
            console.error('0x API error:', zeroXData);
            return NextResponse.json(zeroXData, { status: zeroXRes.status });
        }

        return NextResponse.json({
            data: {
                swapQuote: zeroXData,
            },
        });
    } catch (error: any) {
        console.error('Proxy error:', error.message);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
};
