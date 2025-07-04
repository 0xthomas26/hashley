import { TOKEN_AGENT_CAPABILITIES } from './capabilities';
import { TOKEN_AGENT_DESCRIPTION } from './description';
import { TOKEN_AGENT_NAME } from './name';
import { TOKEN_TOOLS } from './tools';

import { Agent } from '@/types/agent';

export const tokenAgent: Agent = {
    name: TOKEN_AGENT_NAME,
    slug: 'token',
    systemPrompt: TOKEN_AGENT_DESCRIPTION,
    capabilities: TOKEN_AGENT_CAPABILITIES,
    tools: TOKEN_TOOLS,
};
