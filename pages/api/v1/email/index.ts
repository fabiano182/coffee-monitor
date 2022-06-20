import type { NextApiRequest, NextApiResponse } from "next";
import Mail from "../../../../services/mail/mail";


export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<string>
) {
    

    Mail.to = req.body.email;
    Mail.subject = "User Registered Successfully";
    Mail.template = 'registered';
    Mail.context = {
        name: "Fabiano"
    }
    let result = Mail.sendMail();


    res.status(200).send("Sent");
}