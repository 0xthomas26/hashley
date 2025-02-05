'use server';

import { PrivyClient } from '@privy-io/server-auth';

export const privy = new PrivyClient(process.env.PRIVY_APP_ID!, process.env.PRIVY_APP_SECRET!);
