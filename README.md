## What is our app?

<<<<<<< HEAD
Carefully curated audio content specifically for people with chronic pain  
Use mindfulness as a medium manage pain  
“Big Red Button” that the user can click whenever feeling like taking opioids

### “Big Red Button”?

- After clicking, it immediately provides users with a relevant audio guide that will ease their discomfort, ranging from guided meditation and visualization practices.
- Data of the button usage is tracked and presented to the user (More button clicked, less opioid intake, present a graph to encourage the user to rely on our button)
- Pain level is asked after the episode to determine the usefulness of the guide, (Adaptation to user individual preference overtime through machine learning is a possible future feature)

### Let's have a user journey!

For example, John, our imaginary user, has been suffering from joint pain for years and he is using opioids for pain relief. He then understands what the opioids are doing to his body. John wants to change that. However, he tried multiple times but failed to do so because of the addictiveness of opioids and his system’s reliance on opioids to maintain the “new balance” for normal functionalities.

Our app is the immediate place John can think about as we have meditation programs and exercises tailored to help his body slowly recover from its dependence on opioids. After pressing the “big red button”, relevant meditation will calm John down before making him an irrational decision. Eventually, John will associate ease of pain through the “big red button” instead of opioids.

The application rewards users for resisting their temptation from taking opioids, and provides tracking to show the user their success. John will have a profile page that showcases him the times that he pressed the “big red button”, and congratulates him for resisting his urge, afterwards, pain level is surveyed and recorded.

### How does this app differentiate themselves from the other guided meditation apps?

- Chronic pain focused content, chronic pain patients can feel a deep sense of feeling understood.
- Not only meditation, but also stories of other people’s journey with chronic pain, to create a sense of belonging
- "Big Red Button"

Guided meditation is a proven way for many individuals to cope with chronic pain, not only the app provides guided meditation, it also has personal stories of people with similar experiences, sleeping aid, exercise and yoga. We ensure the app aligns with medical standards by working closely with experts in this field.

### What technologies do you use?

The technology of the demo app is created with React.js and Express.js, the final goal of the project is to be available as a mobile app.

!!! Please check out our introduction video, as it provides a general vibe to the content that the app offers !!!

### Links

- Video:
  https://www.youtube.com/watch?v=CvkhcILytPg
- Website:
  https://eazeease.netlify.app/
- SOURCES:
  https://pubmed.ncbi.nlm.nih.gov/25470476/
=======
## Server Address and Endpoint

### Frontend

- Production: [eazeease.netlify.app](https://eazeease.netlify.app)

### Backend

- Production: [https://eazyeaze.190304.xyz](https://eazyeaze.190304.xyz)

## Technologies:
- ### *Frontend*:
  - React + Vite

- ### *Backend*:
  - Express
  - PostgreSQL

## Features:
- **Meditation Sessions**: Users can access guided meditation sessions.
- **Big Red Button**: Provides users with a relevant audio guide that will ease their discomfort, ranging from guided meditation and visualization practices
- **User Authentication**: Secure user accounts with authentication.

## Contributors

- **Prabesh Sharma** and **Vasu Bhatnagar:** Frontend development
- **Roman Zinkevich:** Backend development
- **Zhiyuan Liu:** Code Reviewer

## API Endpoints

- #### **Retrieve Content by ID**
  - **Endpoint**: `/api/contents/:id`
  - **Description**: Embark on a mindful journey with one "content" retrieved by id from the database.
  - **Example**: `GET https://eazyeaze.190304.xyz/api/contents/1`

- #### **Get All Sections**
  - **Endpoint**: `/api/sections`
  - **Description**: Explore a tapestry of "Sections," each weaving its unique story.
  - **Example**: `GET https://eazyeaze.190304.xyz/api/sections`
  - **Parameters**:
    - `sort` (optional): Sort the sections based on a specific attribute (e.g., `content_name`, `author`). Equals to 'section_id' by default.
    - `order` (optional): Specify the sorting order as either `asc` (ascending) or `desc` (descending). Equals to 'asc' by default.
  - **Example with Sorting**:
    - `GET https://eazyeaze.190304.xyz/api/sections?sort=content_name&order=desc`

- #### **Get Content by Section ID**
  - **Endpoint**: `/api/sections/:id`
  - **Description**: Uncover the depth of wisdom within one "section's" treasures.
  - **Example**: `GET https://eazyeaze.190304.xyz/api/sections/1`
  - **Parameters**:
    - `sort` (optional): Sort the contents based on a specific attribute (e.g., `content_name`, `author`). Equals to 'content_id' by default.
    - `order` (optional): Specify the sorting order as either `asc` (ascending) or `desc` (descending). Equals to 'asc' by default.
  - **Example with Sorting**:
    - `GET https://eazyeaze.190304.xyz/api/sections/1?sort=content_name&order=desc`

- #### **Create New User**
  - **Endpoint**: `/api/users`
  - **Description**: Begin your meditation quest with a new user account.
  - **Example**: `POST https://eazyeaze.190304.xyz/api/users`
  - **Request Body**:
    ```json
    {
        "name": "NewUser",
        "password": "SecurePa$$word123"
    }
    ```

- #### **User Login**
  - **Endpoint**: `/api/users/login`
  - **Description**: Open the door to serenity by logging in if you've wandered here before.
  - **Example**: `POST https://eazyeaze.190304.xyz/api/users/login`
  - **Request Body**:
    ```json
    {
        "name": "ExistingUser",
        "password": "TheirSecretPa$$w0rd"
    }
    ```

- #### **Get User Information**
  - **Endpoint**: `/api/users`
  - **Description**: Peek into the mirror of self-awareness with information about the logged-in user.
  - **Authorization**: Bearer Token Required
  - **Example**: `GET https://eazyeaze.190304.xyz/api/users`

- #### **Update User Information**
  - **Endpoint**: `/api/users`
  - **Description**: Sculpt your profile with the gentle touch of personalized changes.
  - **Authorization**: Bearer Token Required
  - **Example**: `PUT https://eazyeaze.190304.xyz/api/users`
  - **Request Body**:
    ```json
    {
        "email": "MyNewEmail@gmail.com",
        "name": "John Doe"
    }
    ```

- #### **Change User Password**
  - **Endpoint**: `/api/users/password`
  - **Description**: Renew your spiritual essence by changing your password.
  - **Authorization**: Bearer Token Required
  - **Example**: `PUT https://eazyeaze.190304.xyz/api/users/password`
  - **Request Body**:
    ```json
    {
        "password": "NewSecurePa$$w0rd"
    }
    ```

- #### **Delete User Account**
  - **Endpoint**: `/api/users`
  - **Description**: Bid farewell to your account, gracefully leaving the tranquil space.
  - **Authorization**: Bearer Token Required
  - **Example**: `DELETE https://eazyeaze.190304.xyz/api/users`

- #### **Admin: Update Content Data**
  - **Endpoint**: `/api/contents/admin/:id`
  - **Description**: Craft and mold the essence of "content" data with divine precision.
  - **Authorization**: Bearer Admin Token Required
  - **Example**: `PUT https://eazyeaze.190304.xyz/api/contents/admin/1`
  - **Request Body**:
    ```json
    {
        "content_name": "Content Number 5",
        "description": "Enhanced and refined for supreme tranquility"
    }
    ```

- #### **Admin: Get All Users**
  - **Endpoint**: `/api/users/admin`
  - **Description**: Ascend to the heights of awareness with insights into all users in the database.
  - **Authorization**: Bearer Admin Token Required
  - **Example**: `GET https://eazyeaze.190304.xyz/api/users/admin`
  - **Parameters**:
    - `sort` (optional): Sort the users based on a specific attribute (e.g., `user_id`, `email`). Equals to 'user_id' by default.
    - `order` (optional): Specify the sorting order as either `asc` (ascending) or `desc` (descending). Equals to 'asc' by default.
  - **Example with Sorting**:
    - `GET https://eazyeaze.190304.xyz/api/users/admin?sort=content_name&order=desc`

- #### **Admin: Update User Role**
  - **Endpoint**: `/api/users/admin/:id`
  - **Description**: Bestow roles with the wisdom of the ancients upon the chosen user.
  - **Authorization**: Bearer Admin Token Required
  - **Example**: `PUT https://eazyeaze.190304.xyz/api/users/admin/1`
  - **Request Body**:
    ```json
    {
        "role": "1"
    }
    ```

- #### **Admin: Create New Content**
  - **Endpoint**: `/api/contents/admin`
  - **Description**: Infuse the spiritual realm with new "content" as an admin.
  - **Authorization**: Bearer Admin Token Required
  - **Example**: `POST https://eazyeaze.190304.xyz/api/contents/admin`
  - **Request Body**:
    ```json
    {
        "content_name": "NewContent",
        "description": "NewDescription",
        "audio": "NewAudio",
        "image": "NewImage",
        "author": "NewAuthor",
        "section_name": "Section 1"
    }
    ```

## ERD
![image](https://github.com/ZealinBee/MeditationNotMedication/assets/75644570/dc01da79-06f1-4fce-9e8c-0e1cac47e5ed)



>>>>>>> c6a76fb154117a2a121fb6245b053d2bfd04c33f
