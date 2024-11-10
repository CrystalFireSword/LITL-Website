// this is sample gpt code for now, this is to be fully changed and exported and used in portfolio and subscriber.js files

import Subscriber from "../models/subscribers.model.js"

// Observer Pattern: Notifying users when a new post is added

// Observer (User) class
class User {
    constructor(name) {
        this.name = name;
    }

    notify(post) {
        console.log(`Notification for ${this.name}: New post titled "${post.title}" was added.`);
    }
}

// Subject (Blog) class
class Blog {
    constructor() {
        this.subscribers = null; // List of subscribers (observers)
        this.get_subscribers()
    }

    async get_subscribers(){
        const userdata = await Subscriber.find({}, 'mailId')
        const userMails = userdata.map(user => new User(user.mailId))
        this.subscribers = userMails
        return userMails
    }

    subscribe(user) {
        this.subscribers.push(new User(user));
    }

    unsubscribe(user) {
        this.subscribers = this.subscribers.filter(subscriber => subscriber.name !== user);
    }

    notifySubscribers(post) {
        //console.log('SUBS', this.subscribers)
        this.subscribers.forEach(subscriber => subscriber.notify(post));
    }

    addPost(newPost) {
        //console.log(newPost)
        this.notifySubscribers(newPost); 
    }
}

const myBlog = new Blog();

export {myBlog, User}

