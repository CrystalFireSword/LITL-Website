import nodemailer from 'nodemailer'; // Import nodemailer
import Subscriber from "../models/subscribers.model.js"; // Import Subscriber model

class User {
    constructor(name) {
        this.name = name; // The name here should ideally be the email address
    }

    notify(post) {
        // Configure the nodemailer transporter
        let transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER, // Use environment variables for credentials
                pass: process.env.EMAIL_PASS
            }
        });

        // Setup email data with unicode symbols
        let mailOptions = {
            from: process.env.EMAIL_USER, // Sender address
            to: this.name, // Recipient email address
            subject: `New Post: ${post.title}`, // Subject line
            html: `<p>Hello,</p><p>A new post titled "<strong>${post.title}</strong>" was just added to the blog.</p>` // HTML body
        };

        // Send mail with defined transport object
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.error('Error sending email:', error);
            } else {
                console.log('Email sent successfully:', info.messageId);
            }
        });
    }
}

class Blog {
    constructor() {
        this.subscribers = []; // Initialize as an empty array
        this.get_subscribers();
    }

    async get_subscribers() {
        try {
            const userdata = await Subscriber.find({}, 'mailId'); // Fetch all subscribers
            const userMails = userdata.map(user => new User(user.mailId)); // Map to User objects
            this.subscribers = userMails; // Assign to subscribers
            return userMails;
        } catch (error) {
            console.error('Error fetching subscribers:', error);
            return [];
        }
    }

    subscribe(userEmail) {
        const user = new User(userEmail); 
        this.subscribers.push(user);
    }

    unsubscribe(userEmail) {
        this.subscribers = this.subscribers.filter(subscriber => subscriber.name !== userEmail);
    }

    notifySubscribers(post) {
        this.subscribers.forEach(subscriber => subscriber.notify(post)); // Notify each subscriber
    }

    addPost(newPost) {
        this.notifySubscribers(newPost); // Notify all subscribers about the new post
    }
}

const myBlog = new Blog();

export { myBlog, User };
