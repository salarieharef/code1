import { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
	const staticUrls: any = [
		{
			url: `${process.env.NEXTAUTH_URL}`,
			lastModified: new Date(),
			changeFrequency: "yearly",
			priority: 1,
		},
		{
			url: `${process.env.NEXTAUTH_URL}/help`,
			lastModified: new Date(),
			changeFrequency: "monthly",
			priority: 0.8,
		},
	];

	return [...staticUrls];
}
