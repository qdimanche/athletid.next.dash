export interface SectionsWithImgFile {
    id: string,
    subTitle: string,
    paragraph: string,
    order: number,
    img?: string,
    imgFile: File  | null,
}