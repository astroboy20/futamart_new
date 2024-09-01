// src/app/api/fetchBusinessData.js
export async function fetchBusinessData(businessName) {
    const response = await fetch(`http://localhost:8000/v1/business/${businessName}`);
    if (!response.ok) {
      throw new Error('Failed to fetch business data');
    }
    const data = await response.json();
    return data.data; // Return only the necessary data
  }
  