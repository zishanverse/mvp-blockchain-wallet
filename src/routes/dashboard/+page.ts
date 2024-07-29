export const load = async ({ fetch }) => {
  try {
    const response = await fetch('/api/user'); // Adjust to your actual endpoint
    const data = await response.json();

    if (!data || !data.user) {
      throw new Error('User data not found');
    }

    return { user: data.user };
  } catch (error) {
    console.error('Error loading user data:', error);
    return { user: null }; // or handle the error as needed
  }
};
