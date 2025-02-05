const BASE_URL = '/api/chats';

export const createChat = async (message: string, model: string, token: string): Promise<any> => {
    try {
        const response = await fetch(BASE_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ message, model }),
        });

        if (!response.ok) {
            throw new Error(`Failed to create chat with status: ${response.status}`);
        }

        return await response.json();
    } catch (error) {
        throw error;
    }
};

export const deleteChat = async (chatId: string, token: string): Promise<any> => {
    try {
        const response = await fetch(`${BASE_URL}/${chatId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
        });

        if (!response.ok) {
            throw new Error(`Failed to delete chat with status: ${response.status}`);
        }

        return await response.json();
    } catch (error) {
        throw error;
    }
};

export const sendMessage = async (chatId: string, message: string, model: string, token: string): Promise<any> => {
    try {
        const response = await fetch(`${BASE_URL}/${chatId}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ message, model }),
        });

        if (!response.ok) {
            throw new Error(`Failed to send message with status: ${response.status}`);
        }

        return await response.json();
    } catch (error) {
        throw error;
    }
};
