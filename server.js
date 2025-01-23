require('dotenv').config();
const express = require('express');
const axios = require('axios');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static('public')); // لتقديم ملفات HTML من مجلد public

const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID;

app.post('/send-message', async (req, res) => {
    const { message } = req.body;

    try {
        await axios.post(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
            chat_id: TELEGRAM_CHAT_ID,
            text: message
        });

        res.json({ success: true });
    } catch (error) {
        console.error('Error sending message to Telegram:', error);
        res.json({ success: false });
    }
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
