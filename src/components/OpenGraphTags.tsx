import { Helmet } from 'react-helmet';

interface OpenGraphTagsProps {
  title: string;
  description: string;
  url: string;
  image?: string;
  type?: 'website' | 'article';
}

export default function OpenGraphTags({ 
  title, 
  description, 
  url, 
  image = 'https://cdn.poehali.dev/files/9f862400-252f-44a3-b612-fddd201cb3b6.png',
  type = 'website'
}: OpenGraphTagsProps) {
  return (
    <Helmet>
      <link rel="canonical" href={url} />
      
      <meta property="og:type" content={type} />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:locale" content="ru_RU" />
      <meta property="og:site_name" content="Интелект" />
      
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={url} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
    </Helmet>
  );
}
