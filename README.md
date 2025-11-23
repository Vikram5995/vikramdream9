This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

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


-------------------------
Prompts:

This is my current application for dream9.. 

1) I want to make changes to this.. and add two columns in the available section
	-	male and female
	-	and type of player - allrounder, batter, bowler
	
	There are some rules to be enforced:
	-	2 female minimum
	-	2 batter minimum ( in male )
	-	2 bowler minimum ( in male )
	-	2 allrounder maximum ( in male )
	
2) These output will be captured and put int the selected players list and passed to backend using the actions.tsx.

3) additionally, change the playergeneration part of file to accept a csv file to populate the UI

-------------------------------------------------

1) instead of email - take Name as input
2) keep Name and password in same line.
3) just keep the Selected player part on left, and available player part on right.
4) Distribute the Available player part in 4 sections:
	-	First keep females 
	-	Batter list
	-	Allrounder list
	-	Bowler List
	
	Sort each by their price ( descending order )
	
	Note: Try to show max min rules in each section precisely in UI ( only if possible )
	
	Also give toast for max minimum violations
	
5) Selected players should also be sorted in the above section order, with costliest player on top in each section
-----------------------------------------------
1) please add some light colors for diff sections accordingly
2) Make UI( texts and colors ) more attaractive keeping the same functionality and simplicity. 
3) Add some icons for allrounder, batter, bowler and cash as well.. try for other where possible.
4) use some logo on app as well

----------------------------------------------
1) Use a better icons for cricket.
2) keep type ( icon only ) infront of name, and just price in price... that will reduce the hieght of each row.
3) all-roudner logic is not working correctly.. I want to able to select max 2 allrounders, it is allowing 1 only