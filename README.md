This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.js`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.js`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.


sprawdzić
https://www.youtube.com/watch?v=C6eH6zsPgSk

session cookie "next-auth/client"
  const [session, loading] = useSession(); //takie dane zwraca ten hook

next-auth.csrf-token
chrome - > nadzie developerskie -> Application -> Cookies -> next-auth.csrf-token

session to tak naprawdę JWT token który jest automatycznie zarządzany prze next-auth, który jest przchowywany przez next auth w anszej przeglądarce - this cookie który przechowuje ten token, któy jest tam stworozny i next-auth determinuej czy mamy aktywną sesję (user jest zalogowany) przez sprawdzenie tego cookie i tokena będącego wewnątrz tokena - to się dzieje w profile.js w const session =- awai getSession({req: context.req}); 
albo w main-navigation.js const [session, loading] = useSesstion() useSession hook