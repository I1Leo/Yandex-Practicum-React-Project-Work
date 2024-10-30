

export type TFeedResponse = {
   succes: boolean,
   orders: Array<TFeedOrder>,
   total: number,
   totalToday: number
}

export type TFeed = {
   data: TFeedResponse,
   type: "feed" | "profile"
}

export type TFeedOrder = {
   ingredients: Array<string>,
   _id: string,
   status: string,
   name: string,
   number: number,
   createdAt: string,
   updatedAt: string,

}

export type TFeedItem = {
   order: TFeedOrder,
   type: "feed" | "profile"
}

export enum OrderStatus {
   created = "Создан",
   pending = "Готовится",
   done = "Выполнен",
}
