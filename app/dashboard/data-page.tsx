import React from "react";

type DataPageProps<T, P extends { initialData: T[] }> = {
  fetcher: () => Promise<T[]>;
  Component: React.ComponentType<P>;
  componentProps?: Omit<P, "initialData">;
};

export default async function DataPage<T, P extends { initialData: T[] }>({
  fetcher,
  Component,
  componentProps = {} as Omit<P, "initialData">,
}: DataPageProps<T, P>) {
  const data = await fetcher();
  return <Component {...(componentProps as P)} initialData={data} />;
}
