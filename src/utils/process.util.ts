export const getThumbnailUrl = (image: any) => image?.formats?.thumbnail?.url || null;

export const getLeftImages = (images: any) =>
    images?.map((img: any) => ({
      name: img?.name,
      thumbnail: getThumbnailUrl(img)
    })) || [];

export const extractContent = (data: any) => {
  return {
    Hero: {
      Title: data?.Hero?.Title || '',
      CTALink: data?.Hero?.CTALink || '',
      CTAText: data?.Hero?.CTAText || '',
      ShowReelVideoLink: data?.Hero?.ShowReelVideoLink || '',
    //   Background_Image_Right_URL: getImageUrl(data?.Hero?.Background_Image_Right),
      Background_Image_Right: getLeftImages(data?.Hero?.Background_Image_Left),
      Background_Image_Left: getLeftImages(data?.Hero?.Background_Image_Left)
    },

    About: data?.About ? {
      title: data?.About?.Title || '',
      description: data?.About?.Description || '',
      CTA_Link: data?.About?.CTA_Link || '',
      CTA_Text: data?.About?.CTA_Text || '',
    //   images: (data?.About?.images || []).map((img: any) => ({
    //     url: img?.url,
    //     thumbnail: getThumbnailUrl(img)
    //   }))
    } : null,
    Service: {
      title: data?.Service?.Title || '',
      services: (data?.Service?.services || []).map((service: any) => ({
        id: service?.id,
        Title: service?.Title,
        ShortDescriptionPoints: service?.ShortDescriptionPoints?.split(',') || [],
        slug: service?.slug
      })),
      description: data?.Service?.Description
    },

    Form: {
      title: data?.Form?.title || '',
      Email: data?.Form?.Email || '',
      PhoneNumber: data?.Form?.PhoneNumber || '',
      locations: data?.Form?.locations || [],
      services: (data?.Form?.services || []).map((service:any) => ({
        id: service?.id,
        Title: service?.Title,
        ShortDescriptionPoints: service?.ShortDescriptionPoints?.split(',') || [],
        slug: service?.slug
      }))
    },

    Partner: {
      title: data?.Partner?.title || '',
      brands: data?.Partner?.brands || []
    },

    Portfolio: {
      title: data?.Portfolio?.title || '',
      description: data?.Portfolio?.description || '',
      CTA_Link: data?.Portfolio?.CTA_Link || '',
      CTA_Text: data?.Portfolio?.CTA_Text || '',
      portfolios: data?.Portfolio?.portfolios || []
    },

    Why_Jrny: {
      title: data?.Why_Jrny?.title || '',
      description: data?.Why_Jrny?.description || '',
      jrnies: data?.Why_Jrny?.jrnies || []
    },

    Testimonial: {
      title: data?.Testimonial?.title || '',
      subTitle: data?.Testimonial?.subTitle || '',
      testimonials: data?.Testimonial?.testimonials || []
    }
  };
}

export const extractTextInBrackets = (text: string) => {
  const match = text.match(/<([^>]+)>/);
  return match ? match[1] : null;
}

export const extractPortfolioContent = (data: any) => {
  return {
    pageTitle: data?.Page_Title,
    pageDescription: data?.Page_Description,
    brandLogos: data?.brand_logos?.map((element: any) => ({
      brandName: element.brandName,
      brandLogoLink: element.brandLogoLink
    })),
    portfolios: (data?.portfolios || [])?.map((element: any) => ({
      id: element.id,
      CTA_Text: element.CTA_Text,
      Location: element.Location,
      Project_Description: element.Project_Description,
      Project_Heading: element.Project_Heading,
      Project_Name: element.Project_Name,
      key: element.key,
      thumbnil: getThumbnailUrl(element.thumbnail),
      categories: element?.categories.map((element: any) => (
        {
          name: element.Name
        }
      ))
    }))
  }
}

export const extractPortfolioDetailData = (data: any) => {
  return {
      id: data.id,
      CTA_Text: data.CTA_Text,
      Location: data.Location,
      Project_Description: data.Project_Description,
      Project_Heading: data.Project_Heading,
      Project_Name: data.Project_Name,
      key: data.key,
      Project_Sub_Description: data.Project_Sub_Description,
      Project_Sub_Heading: data.Project_Sub_Heading,
      Project_Sub_Heading_2: data.Project_Sub_Heading_2,
      Project_Video_Url: data.Project_Video_Url,
      Project_Year: data.Project_Year,
      Project_Images: getLeftImages(data.Project_Images),
      categories: data?.categories, 
      descriptionGlobal: data?.description || '',
  }
}
