import { fetchPackage } from "@/app/lib/fetch-package";
import PackagePageClient from "./page-client";

export const dynamic = "force-dynamic";

export default async function PackagePage() {
  const initialData = await fetchPackage();
  return <PackagePageClient initialData={initialData} />;
}
