# github-hotel-engine

### Project Setup
```
To set up this app you will need first install Redis as this is the service for cacheing.
To install Redis **brew install Redis 2.8**.

Once installed in 1 tab of your terminals run the cmd **redis-server** this will start your redis server for cacheing.
Once redis is installed cd into the backend and **npm install** and **npm start**. This will kick of nodemon which keeps your server running and reruns if there is changes.

After the backend is setup. cd to hotel-frontend and **npm install** followed by **npm start** which will kick off your localhost.
```

### Design Decesion and Reasoning
```
I decided to use redis after talking to a few friends and they said it had really good cacheing. It is the first time I have ever used and so far I like it alot.

I also decided to use React hooks for a few reasons. 1. This is only the second time I have used hooks and I found it easier, but also had a learning curve for getting out the react 16 and below like setState. 2. It makes the app a lot cleaner and can easily follow the flow of the work and make it easy to read.

For the design I just went real simple and did not want to go crazy.
```

### Things I wish I had spend more time on.
```
I wanted to spend more time also learning context so that I could easly move the data around to everywhere I needed. I did not get to passing the data on a single list item to a new page. 
```