// src/routes/dashboard/+page.ts
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ fetch, session }) => {
  const user = session.user;

  if (!user) {
    return {
      status: 302,
      redirect: '/login'
    };
  }

  return {
    props: {
      user
    }
  };
};
