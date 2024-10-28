This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).


<!-- For Events go to this link https://next-auth.js.org/configuration/events -->

<!-- 
only for the development not for production
npx prisma generate
npx prisma db push //everytime you change the schema you need to run this command
npx prisma studio// it is for checking the database it open localhost:5555 you can see your table 
npx prisma migrate reset
-->

<!-- middleware is nexjs specific not next auth specific
'matcher in middleware.ts' is only to invoke the middleware like if i do /api/auth/signin it will not invoke the middleware
simply it first invoke the middleware and then it will invoke the route(/api/auth/signin etc...) -->

<!--
https://next-auth.js.org/configuration/callbacks
 Callbacks are asynchronous func you can use to control what happens when an action is performed.

Callbacks are extremely powerful, especially in scenerios involving JWT as they allow you to implement access controls without database and to integrate with external databases or APIs.

If you want to pass the data such as an Access Token or User Id to the browser when using JWT, you can persist the data in the token when the JWT callback is called, then pass the data through the browser in the session callback. -->


<!-- how can i pass the id from jwt token inside the user session -->


## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
