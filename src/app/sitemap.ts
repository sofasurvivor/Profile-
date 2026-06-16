import { MetadataRoute } from 'next'
 
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: 'https://rahulmina.com', // Replace with actual domain
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1,
    },
    // Add other dynamic or static routes as needed
  ]
}
