import { VariantPage, variantMetadata, variantStaticParams } from "@/components/lp/OfferVariants";

type Props = { params: Promise<{ variant: string }> };

export const dynamicParams = false;
export const generateStaticParams = variantStaticParams;

export async function generateMetadata({ params }: Props) {
  return variantMetadata("tutoring", (await params).variant);
}

export default async function TutoringVariantPage({ params }: Props) {
  return <VariantPage program="tutoring" variant={(await params).variant} />;
}
