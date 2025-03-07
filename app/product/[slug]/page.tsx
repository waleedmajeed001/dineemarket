import { client } from "@/app/lib/sanity";
import { fullProduct } from "@/app/interface";
import { urlFor } from "@/app/lib/sanity";
import Image from "next/image";
import { PortableText } from "@portabletext/react";

async function getData(slug: string) {
  const query = `*[_type == "product" && slug.current == "${slug}"][0]{
    _id,
    images,
    price,
    name,
    description,
    "categoryName": category->name,
    price_id
  }`;

  const data = await client.fetch(query);
  return data;
}

export default async function ProductPage({
  params,
}: {
  params: { slug: string };
}) {
  const data: fullProduct = await getData(params.slug);

  return (
    <div className="mx-auto max-w-screen-xl px-4 md:px-8">
      <div className="grid gap-8 md:grid-cols-2">
        <div className="overflow-hidden rounded-lg">
          <Image
            src={urlFor(data.images[0]).url()}
            alt={data.name}
            width={500}
            height={500}
            className="h-full w-full object-cover object-center"
          />
        </div>

        <div className="flex flex-col justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{data.name}</h1>
            <p className="mt-2 text-lg text-gray-500">{data.categoryName}</p>
            <p className="mt-4 text-2xl font-bold text-gray-900">
              ${data.price}
            </p>
          </div>

          <div className="mt-8">
            <h2 className="text-xl font-semibold text-gray-900">Description</h2>
            <div className="mt-4 text-gray-500">
              <PortableText value={data.description} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 