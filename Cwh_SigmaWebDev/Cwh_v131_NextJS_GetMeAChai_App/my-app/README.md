# GetMeAChai Crowdfunding Web App

GetMeAChai is a crowdfunding platform designed to help creators, developers, and individuals raise funds for their projects, ideas, or personal needs. The app allows users to create an account, integrate Razorpay as their payment gateway, and receive funding from their supporters. Whether you're a content creator, developer, or someone with a great idea, GetMeAChai provides a seamless way to connect with your audience and receive financial support. It is a crowdfunding web application built with Next.js, using NextAuth for authentication, MongoDB for data storage (including image buffers), and Razorpay as the payment gateway.

## Features

- Built with Next.js App Router
- Authentication using NextAuth (GitHub & Google login)
- Secure payments via Razorpay
- Users can create an account and receive funding from supporters
- Users can paste their Razorpay ID and Razorpay Secret in the dashboard after registration
- Images stored in MongoDB as buffer format
- Server-side rendering and static generation support
- Optimized font loading with [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts)
- Toast notifications using `react-toastify`
- Tailwind Scrollbar Hide for better UI experience

## Tech Stack

This project uses the following technologies:

- **Next.js** `15.1.2`
- **React** `19.0.0`
- **NextAuth** `4.24.11`
- **MongoDB (Mongoose)** `8.9.5`
- **Razorpay SDK** `2.9.5`
- **bcryptjs** `3.0.2`
- **React Toastify** `11.0.3`
- **Tailwind Scrollbar Hide** `2.0.0`

## 📂 Project Folder Structure

```
📂 my-app
  ├── 📂 actions
  │   ├── 📜 useraction.js
  │
  ├── 📂 app
  │   ├── 📂 [username]
  │   │   ├── 📜 page.js
  │   │
  │   ├── 📂 about
  │   │   ├── 📜 page.js
  │   │
  │   ├── 📂 api
  │   │   ├── 📂 auth [...nextauth]
  │   │   │   ├── 📜 route.js
  │   │   │
  │   │   ├── 📂 contact
  │   │   │   ├── 📜 route.js
  │   │   │
  │   │   ├── 📂 razorpay
  │   │   │   ├── 📜 route.js
  │   │   │
  │   │   ├── 📂 usersSearch
  │   │   │   ├── 📜 route.js
  │   │
  │   ├── 📂 contact
  │   │   ├── 📜 page.js
  │   │   
  │   ├── 📂 dashboard
  │   │   ├── 📜 page.js
  │   │
  │   ├── 📂 login
  │   │   ├── 📜 page.js
  │   │
  │   ├── 📜 favicon.ico
  │   ├── 📜 globals.css
  │   ├── 📜 layout.js
  │   ├── 📜 not-found.js
  │   ├── 📜 page.js
  │
  ├── 📂 components
  │   ├── 📜 AutoScrollGallery.jsx
  │   ├── 📜 Footer.jsx
  │   ├── 📜 Logo.jsx
  │   ├── 📜 Navbar.jsx
  │   ├── 📜 Navlinks.jsx
  │   ├── 📜 PaymentPage.jsx
  │   ├── 📜 Searchbox.jsx
  │   ├── 📜 SessionWrapper.jsx
  │   ├── 📜 Sidebar.jsx
  │   ├── 📜 UserAccount.jsx
  │   ├── 📜 WhatsappChaitBox.jsx
  │
  ├── 📂 lib
  │   ├── 📜 dbConnect.js
  │
  ├── 📂 models
  │   ├── 📜 Contact.js
  │   ├── 📜 Payment.js
  │   ├── 📜 User.js
  │
  ├── 📂 node_modules
  │
  ├── 📂 public
  │   ├── 📜 admin.webp
  │   ├── 📜 coffee.gif
  │   ├── 📜 cultur.gif
  │   ├── 📜 homePoster.webp
  │   ├── 📜 homeVideo1.mp4
  │   ├── 📜 homeVideo2.mp4
  │   ├── 📜 joypixels.gif
  │   ├── 📜 moneda.gif
  │   ├── 📜 poster.jpg
  │   ├── 📜 scrollPic1.jpg
  │   ├── 📜 scrollPic2.jpg
  │   ├── 📜 scrollPic3.jpg
  │   ├── 📜 scrollPic4.jpg
  │   ├── 📜 scrollPic5.jpg
  │   ├── 📜 scrollPic6.jpg
  │   ├── 📜 scrollPic7.jpg
  │
  ├── 📜 .env.local
  ├── 📜 .gitignore
  ├── 📜 env.examples
  ├── 📜 eslint.config.mjs
  ├── 📜 jsconfig.json
  ├── 📜 middleware.js
  ├── 📜 next.config.mjs
  ├── 📜 package-lock.json
  ├── 📜 package.json
  ├── 📜 postcss.config.mjs
  ├── 📜 README.md
  ├── 📜 tailwind.config.mjs
```

## Getting Started

### Prerequisites

Ensure you have the following installed:

- [Node.js](https://nodejs.org/en/download/) (Latest LTS recommended)
- [MongoDB](https://www.mongodb.com/)
- [Razorpay Account](https://razorpay.com/)
- [GitHub and Google Developer Accounts](https://next-auth.js.org/providers/)

### Installation

Clone the repository:

```bash
git clone https://github.com/abhishekh1516techboy/GetMeAChai.git
cd GetMeAChai
```

Install dependencies:

```bash
npm install
# or
yarn install
# or
pnpm install
# or
bun install
```

### Running the Development Server

Start the Next.js development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the application running.

# Payment Integration

The app integrates with Razorpay to process payments. Users can register, log in via GitHub or Google, and paste their Razorpay credentials in the dashboard to receive funding from supporters.

# How It Works

- **User Registration:** Users sign up using GitHub or Google authentication.

- **Dashboard Setup:** After logging in, users can access their dashboard and enter their Razorpay ID and Razorpay Secret.

- **Accepting Payments:** Once set up, users can share their funding page link with their followers and supporters.

- **Secure Transactions:** Supporters can contribute funds, and payments will be processed securely via Razorpay.

- **Tracking Earnings:** Users can view their earnings and transaction history within their Page.

## Screenshots of GetMeAChai Web App

### Home Page

<figure>
  <img src="public/homePage1.webp" alt="Home Page" />
  <figcaption>Home Page: A welcoming landing page with a call-to-action.</figcaption>
</figure>

<figure>
  <img src="public/homePage2.webp" alt="Home Page" />
  <figcaption>Home Page: A welcoming landing page with a call-to-action.</figcaption>
</figure>

<figure>
  <img src="public/homePage3.webp" alt="Home Page" />
  <figcaption>Home Page: A welcoming landing page with a call-to-action.</figcaption>
</figure>

<figure>
  <img src="public/homePage4.webp" alt="Home Page" />
  <figcaption>Home Page: navbar with dropdown on hover.</figcaption>
</figure>

<figure>
  <img src="public/homePage5.webp" alt="Home Page" />
  <figcaption>Home Page with watsApp features.</figcaption>
</figure>


### Login Page

<figure>
  <img src="public/loginPage1.webp" alt="login Page" />
  <figcaption>Login Page: Users sign up using GitHub or Google authentication.</figcaption>
</figure>

### Login With Google OAuth2

<figure>
  <img src="public/loginWithGoogle.webp" alt="login Page" />
  <figcaption>Login with Google OAuth2: Users sign up using Google authentication</figcaption>
</figure>

### Login With GitHub OAuth2

<figure>
  <img src="public/loginWithGithub.webp" alt="login Page" />
    <figcaption>Login with GitHub OAuth2: Users sign up using GitHub authentication</figcaption>
</figure>

### Dashboard Page

<figure>
  <img src="public/dashBoardPage1.webp" alt="about Page" />
  <figcaption>Dashboard: Users can manage their Razorpay credentials for accepting payments.</figcaption>
</figure>

<figure>
  <img src="public/dashBoardPage2.webp" alt="about Page" />
  <figcaption>Dashboard: Users can change UserName at least 4 characters long.</figcaption>
</figure>

<figure>
  <img src="public/dashBoardPage3.webp" alt="about Page" />
  <figcaption>Dashboard: UserName already taken by other user you cant take it own.</figcaption>
</figure>

<figure>
  <img src="public/dashBoardPage4.webp" alt="about Page" />
  <figcaption>Dashboard: Users can manage own Profile management change profilePic, coverPic and set rzpId & RzpSecret .</figcaption>
</figure>

### Admin Page

<figure>
  <img src="public/adminPage1.webp" alt="about Page" />
  <figcaption>Admin Page: This is Admin page when user login successfully green tic show otherwise not .</figcaption>
</figure>

### About Page

<figure>
  <img src="public/aboutPage1.webp" alt="about Page" />
  <figcaption>About page: This is about page read about getMeAChai Crowdfunding webApp.</figcaption>
</figure>

### Contact Page

<figure>
  <img src="public/contactPage1.webp" alt="contact Page" />
  <figcaption>Contact Page: user ablt for contact developer when login otherwise not.</figcaption>
</figure>

<figure>
  <img src="public/contactPage2.webp" alt="contact Page" />
  <figcaption>Dashboard: contact form submit successfully.</figcaption>
</figure>

### Find user Page

<figure>
  <img src="public/userSearch1.webp" alt="find user Page" />
  <figcaption>Find User: User can find users by userName.</figcaption>
</figure>   

<figure>
  <img src="public/userSearch2.webp" alt="find user Page" />
  <figcaption>Find User: you can find user when user available .</figcaption>
</figure>   

<figure>
  <img src="public/userSearch3.webp" alt="find user Page" />
  <figcaption>Find User: you can find user when user available in database.</figcaption>
</figure>   

<figure>
  <img src="public/userSearch4.webp" alt="find user Page" />
  <figcaption>Find User: you can find user when user not available in database show not user found .</figcaption>
</figure>   

### user Page

<figure>
  <img src="public/userPage1.webp" alt="user Page" />
  <figcaption>user Page: when user found and you click you redirect user profile under 3 second.</figcaption>
</figure> 

<figure>
  <img src="public/userPage4.webp" alt="user Page" />
  <figcaption>user Page: when user try to donation and user not able to accept payment show message bcz user not set razowPay Id & Secret in own profile</figcaption>
</figure> 

<figure>
  <img src="public/userPage2.webp" alt="user Page" />
  <figcaption>user Page: this is another user from your searching</figcaption>
</figure> 

<figure>
  <img src="public/userPage3.webp" alt="user Page" />
  <figcaption>user Page: when user login if user donate money other user otherwise you cant donate.</figcaption>
</figure> 


### RazorPay Payment

<figure>
  <img src="public/rzp1.webp" alt="Rzp Pay" />
  <figcaption>RazorPay: Rzp payment process starting when user click pay btn.</figcaption>
</figure> 

<figure>
  <img src="public/rzp2.webp" alt="Rzp Pay" />
  <figcaption>RazorPay: user select payment method then pay and you want to cancled it you can do it.</figcaption>
</figure> 

<figure>
  <img src="public/rzp3.webp" alt="Rzp Pay" />
  <figcaption>RazorPay:Payment successfull after 5 second page redirect payment success page.</figcaption>
</figure> 

<figure>
  <img src="public/rzp4.webp" alt="Rzp Pay" />
  <figcaption>RazorPay: payment done success show notification.</figcaption>
</figure> 


### NotFound Payment

<figure>
  <img src="public/notFoundPage.webp" alt="notFound Page" />
  <figcaption>404 NotFound Page: when user try to go unlisted url's show 404 Page not found page.</figcaption>
</figure> 

### SignOut user

<figure>
  <img src="public/signOutUser.webp" alt="signOutUser Page" />
  <figcaption>SignOutUser: User signOut onClick signOut btn after signOut userName green tick disable for clearing uuser signOut successfully.</figcaption>
</figure> 

## Deployment

The easiest way to deploy this Next.js app is with [Vercel](https://vercel.com/):

1. Push your code to GitHub, GitLab, or Bitbucket.
2. [Import the repository into Vercel](https://vercel.com/new).
3. Set the required environment variables.
4. Deploy and enjoy!

## Learn More

To learn more about Next.js, MongoDB, NextAuth, and Razorpay, check out the following resources:

- [Next.js Documentation](https://nextjs.org/docs)
- [MongoDB Documentation](https://www.mongodb.com/docs/)
- [NextAuth.js Documentation](https://next-auth.js.org/)
- [Razorpay API Docs](https://razorpay.com/docs/api/)
- [React Toastify](https://fkhadra.github.io/react-toastify/introduction/)

## Contributing

Contributions are welcome! Feel free to submit a pull request or open an issue.

## License

This project is licensed under the MIT License.
