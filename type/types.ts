

export type PostType = {
    id?: number,
    title: string,
    comments?: string,
    content:string,
    categoryPost: string,
    published?: boolean
    userId?: number,
    views?: number,
    likes?: number,
    user: any
}