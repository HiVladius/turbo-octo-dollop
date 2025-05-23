
export interface MailData {
    from: string;
    to: [string];
    subject: string;
    html: string;
}

// 
export interface SendMailResponse {
    success: boolean;
    message: string;
}

// const mail = import.meta.env.VITE_EMAIL_SERVICE.toString();
const mail = "http://localhost:4000/send-mail"

console.log(`mail: ${mail}`);


export const sendMail = async (mailData: MailData): Promise<SendMailResponse> => {
    try {
        const response = await fetch(mail, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(mailData)
        });

        if (!response.ok) {
            throw new Error(`Failed to send mail: ${response.statusText}`);
        }

        const data = await response.json();
        return data as SendMailResponse;
    } catch (error) {
        console.error('Error sending mail:', error);
        throw error;
    }
};