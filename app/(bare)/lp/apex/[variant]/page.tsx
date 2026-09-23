import { VariantPage, variantMetadata, variantStaticParams } from "@/components/lp/OfferVariants";

type Props = { params: Promise<{ variant: string }> };

export const dynamicParams = false;
export const generateStaticParams = variantStaticParams;

export async function generateMetadata({ params }: Props) {
  return variantMetadata("apex", (await params).variant);
}

export default async function ApexVariantPage({ params }: Props) {
  return <VariantPage program="apex" variant={(await params).variant} />;
}
