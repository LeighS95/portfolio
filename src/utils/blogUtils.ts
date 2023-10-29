export const getBlogPath = (name: string, subName: string, fileName: string) =>
    `/blog/${name}/${subName}/${fileName}`;

export const getBlogThumbnail = (fileName: string) => `/assets/${fileName}.png`;