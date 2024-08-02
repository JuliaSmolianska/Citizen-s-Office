export default function sitemap() {
  const baseUrl = "https://www.24serpnya.com.ua";
  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      priority: 1,
    },
    {
      url: `${baseUrl}/mission`,
      lastModified: new Date(),
      priority: 0.9,
    },
    {
      url: `${baseUrl}/privacy`,
      lastModified: new Date(),
      priority: 0.5,
    },
    {
      url: `${baseUrl}/roads`,
      lastModified: new Date(),
      priority: 0.9,
    },
    {
      url: `${baseUrl}/terms`,
      lastModified: new Date(),
      priority: 0.5,
    },
    {
      url: `${baseUrl}/zakonodawche-pidgruntya`,
      lastModified: new Date(),
      priority: 0.9,
    },
  ];
}
