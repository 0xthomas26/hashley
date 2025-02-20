import { MARKET_AGENT_CAPABILITIES } from './capabilities';
import { MARKET_AGENT_DESCRIPTION } from './description';
import { MARKET_AGENT_NAME } from './name';
import { MARKET_TOOLS } from './tools';

import { Agent } from '@/types/agent';

export const marketAgent: Agent = {
    name: MARKET_AGENT_NAME,
    slug: 'market',
    systemPrompt: MARKET_AGENT_DESCRIPTION,
    capabilities: MARKET_AGENT_CAPABILITIES,
    tools: MARKET_TOOLS,
};
