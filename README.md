# DinerPocket

DinerPocket is an app allowing users to search, share, sort, and comment restaurants. Features are expanding.

# Feature
 
With DinerPocket, you can do the followings

- Sign in and sign up
- Comment, like or add restaurant to favorite
- Sort restaurants by its categories
- Follow other users
- Checkout the users with most followers
- Checkout the restaurants with most followers
- Check out details of a restaurant
- Administrator can create, update and delete restaurants
- Administrator can create, update and delete categories
- Administrator can assign users' role either as user/admin
 
## Getting Started (adopting mySQL database)

1. Clone the repository
   ```
   git clone -b master https://github.com/cschang07/forum-express-grading.git
   ```
2. Go to the file on your terminal
   ```
   cd forum-express-grading
   ```
3. Install the kits
   ```
   npm install
   ```
4. Make an .env file according to the content of the .env.example file you will find in the repo
5. Go to config/config.json and change username and password under 'development' to match your mySQL data
6. Go to mySQL workbench
   ```
   create database named forum;
   ```
7. Set up the data
   ```
   npx sequelize db:migrate
   ```
8. Set up seed data
   ```
   npx sequelize db:seed:all
   ```

10. Then you are good to run the server
   ```
   npm run dev
   ```
## User login

both user and administrator seed accounts are provided, shown in the table below:

| Role | User account | Password |
| ----------- | ----------- | ----------- |
| User | user1@example.com | 12345678 |
| User | user2@example.com | 12345678 |
| Admin | root@example.com | 12345678 |
