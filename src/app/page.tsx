import { fetchFromStrapi } from '@/lib/strapi';

export default async function HomePage() {
  const data = await fetchFromStrapi('contents');

  return (
    <main>
      <>Hello</>
    </main>
  );
}
