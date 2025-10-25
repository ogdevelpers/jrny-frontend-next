import { fetchFromStrapi } from "@/lib/strapi";
import { CMSclientContextProvider } from "./CMSclientContextProvider";

export default async function CMSContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  let solutionContent: any;
  try {
    const solutionsContentResp = await fetchFromStrapi("solutions?populate=*");
    solutionContent = solutionsContentResp.data;
    console.log({ solutionContent });
  } catch (error) {
    console.error(error);
  }
  return (
    <CMSclientContextProvider content={solutionContent}>
      {children}
    </CMSclientContextProvider>
  );
}
