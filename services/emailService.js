require('dotenv').config()
const nodemailer = require('nodemailer');
const sendgridTransport = require('nodemailer-sendgrid-transport');
const fs = require("fs");
const ejs = require("ejs");
const { htmlToText } = require("html-to-text");
const juice = require("juice");
const path = require("path");

module.exports = async function sendMail({ template: templateName, templateVars, ...restOfOptions }) {
    const templatePath = path.join(__dirname, `../templates/${templateName}.html`);
    const options = {
        ...restOfOptions,
    };

    if (templateName && fs.existsSync(templatePath)) {
        const template = fs.readFileSync(templatePath, "utf-8");
        const html = ejs.render(template, templateVars);
        const text = htmlToText(html);
        const htmlWithStylesInlined = juice(html);
    
        options.html = htmlWithStylesInlined;
        options.text = text;
    }

    // Configure Nodemailer SendGrid Transporter
    const transporter = nodemailer.createTransport(
        sendgridTransport({
        auth: {
            api_key: process.env.SEND_GRID_API_KEY, // SG API KEY
        },
        })
    );

    try {
        const info = await transporter.sendMail(options);
        // console.log(`Message sent: ${info.messageId}`);
    } catch (error) {
        console.log(`Message seding failed: ${error}`);
    }
}