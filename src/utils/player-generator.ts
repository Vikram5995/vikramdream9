import { Player } from '../types/player'
// import fs from 'fs'
// import csv from 'csv-parser'

export function generatePlayers(count: number): Player[] {
  return [
    { id: 1, name: 'Aakash', price: 3000, gender: 'male', type: 'bowler' },
    { id: 2, name: 'Aarti', price: 2000, gender: 'female', type: 'allrounder' },
    { id: 3, name: 'Adarsh', price: 4000, gender: 'male', type: 'bowler' },
    { id: 4, name: 'Adil', price: 3000, gender: 'male', type: 'allrounder' },
    { id: 5, name: 'Aditya Done', price: 3000, gender: 'male', type: 'batter' },
    { id: 6, name: 'Akshay', price: 1000, gender: 'male', type: 'batter' },
    { id: 7, name: 'Alpesh', price: 3000, gender: 'male', type: 'allrounder' },
    { id: 8, name: 'Amanpreet', price: 1000, gender: 'female', type: 'allrounder' },
    { id: 9, name: 'Amol', price: 5000, gender: 'male', type: 'batter' },
    { id: 10, name: 'Anand', price: 3000, gender: 'male', type: 'allrounder' },
    { id: 11, name: 'Ankit', price: 3000, gender: 'male', type: 'allrounder' },
    { id: 12, name: 'Anusha', price: 2000, gender: 'female', type: 'allrounder' },
    { id: 13, name: 'Apeksha', price: 2000, gender: 'female', type: 'allrounder' },
    { id: 14, name: 'Apoorva', price: 2000, gender: 'female', type: 'allrounder' },
    { id: 15, name: 'Chandra Kumar', price: 1000, gender: 'male', type: 'batter' },
    { id: 16, name: 'Chandra S', price: 2000, gender: 'male', type: 'batter' },
    { id: 17, name: 'Chintan', price: 1000, gender: 'male', type: 'batter' },
    { id: 18, name: 'Devarsh', price: 2000, gender: 'male', type: 'batter' },
    { id: 19, name: 'Dharmendra', price: 1000, gender: 'male', type: 'batter' },
    { id: 20, name: 'Dharti', price: 1000, gender: 'female', type: 'allrounder' },
    { id: 21, name: 'Dhiraj', price: 1000, gender: 'male', type: 'bowler' },
    { id: 22, name: 'Dhruvi', price: 1000, gender: 'female', type: 'allrounder' },
    { id: 23, name: 'Diksha', price: 1000, gender: 'female', type: 'allrounder' },
    { id: 24, name: 'Dilip', price: 1000, gender: 'male', type: 'bowler' },
    { id: 25, name: 'Gaurav', price: 1000, gender: 'male', type: 'batter' },
    { id: 26, name: 'Hemang', price: 1000, gender: 'male', type: 'batter' },
    { id: 27, name: 'Hiral', price: 1000, gender: 'female', type: 'allrounder' },
    { id: 28, name: 'Jay', price: 2000, gender: 'male', type: 'batter' },
    { id: 29, name: 'Jayant', price: 3000, gender: 'male', type: 'allrounder' },
    { id: 30, name: 'Kartavya', price: 3000, gender: 'male', type: 'allrounder' },
    { id: 31, name: 'Kashyap', price: 2000, gender: 'male', type: 'batter' },
    { id: 32, name: 'Machhindra', price: 5000, gender: 'male', type: 'batter' },
    { id: 33, name: 'Maitrey', price: 3000, gender: 'male', type: 'allrounder' },
    { id: 34, name: 'Mihir', price: 3000, gender: 'male', type: 'batter' },
    { id: 35, name: 'Mitesh', price: 2000, gender: 'male', type: 'bowler' },
    { id: 36, name: 'Moumita', price: 1000, gender: 'female', type: 'allrounder' },
    { id: 37, name: 'Mukesh', price: 3000, gender: 'male', type: 'allrounder' },
    { id: 38, name: 'Parvez', price: 3000, gender: 'male', type: 'batter' },
    { id: 39, name: 'Pavan', price: 2000, gender: 'male', type: 'batter' },
    { id: 40, name: 'Prabhjot', price: 2000, gender: 'female', type: 'allrounder' },
    { id: 41, name: 'Pradnya', price: 1000, gender: 'female', type: 'allrounder' },
    { id: 42, name: 'Prasanna', price: 4000, gender: 'male', type: 'allrounder' },
    { id: 43, name: 'Prashant Pallav', price: 4000, gender: 'male', type: 'allrounder' },
    { id: 44, name: 'Prashant Patil', price: 3000, gender: 'male', type: 'bowler' },
    { id: 45, name: 'Pritesh', price: 5000, gender: 'male', type: 'batter' },
    { id: 46, name: 'Rahul', price: 5000, gender: 'male', type: 'allrounder' },
    { id: 47, name: 'Rajan', price: 4000, gender: 'male', type: 'bowler' },
    { id: 48, name: 'Rakesh', price: 1000, gender: 'male', type: 'bowler' },
    { id: 49, name: 'Raunak', price: 1000, gender: 'male', type: 'bowler' },
    { id: 50, name: 'Ravi', price: 3000, gender: 'male', type: 'allrounder' },
    { id: 51, name: 'Riddhi', price: 1000, gender: 'female', type: 'allrounder' },
    { id: 52, name: 'Ritik', price: 2000, gender: 'male', type: 'bowler' },
    { id: 53, name: 'Rohan', price: 1000, gender: 'male', type: 'bowler' },
    { id: 54, name: 'Sagar', price: 4000, gender: 'male', type: 'allrounder' },
    { id: 55, name: 'Sahil', price: 3000, gender: 'male', type: 'allrounder' },
    { id: 56, name: 'Salil', price: 3000, gender: 'male', type: 'batter' },
    { id: 57, name: 'Shibin', price: 3000, gender: 'male', type: 'allrounder' },
    { id: 58, name: 'Somesh', price: 2000, gender: 'male', type: 'batter' },
    { id: 59, name: 'Srinivas', price: 1000, gender: 'male', type: 'bowler' },
    { id: 60, name: 'Stephen', price: 1000, gender: 'male', type: 'batter' },
    { id: 61, name: 'Sumeet', price: 2000, gender: 'male', type: 'batter' },
    { id: 62, name: 'Tanvir', price: 1000, gender: 'male', type: 'batter' },
    { id: 63, name: 'Tarun', price: 3000, gender: 'male', type: 'allrounder' },
    { id: 64, name: 'Vaibhav', price: 2000, gender: 'male', type: 'bowler' },
    { id: 65, name: 'Vandna S', price: 1000, gender: 'female', type: 'allrounder' },
    { id: 66, name: 'Vikram', price: 5000, gender: 'male', type: 'batter' },
    { id: 67, name: 'Vinita', price: 3000, gender: 'female', type: 'allrounder' },
    { id: 68, name: 'Vishal A', price: 1000, gender: 'male', type: 'bowler' },
    { id: 69, name: 'Vishnupriya', price: 2000, gender: 'female', type: 'allrounder' },
    { id: 70, name: 'Yash', price: 3000, gender: 'male', type: 'bowler' },
    { id: 71, name: 'Yohan', price: 2000, gender: 'male', type: 'bowler' }
  ]
}

// export async function generatePlayersFromCSV(filePath: string): Promise<Player[]> {
//   return new Promise((resolve, reject) => {
//     const results: Player[] = [];
//     fs.createReadStream(filePath)
//       .pipe(csv())
//       .on('data', (data) => {
//         results.push({
//           id: parseInt(data.id),
//           name: data.name,
//           price: parseInt(data.price),
//           gender: data.gender as 'male' | 'female',
//           type: data.type as 'allrounder' | 'batter' | 'bowler'
//         });
//       })
//       .on('end', () => {
//         resolve(results);
//       })
//       .on('error', (error) => {
//         reject(error);
//       });
//   });
// }
