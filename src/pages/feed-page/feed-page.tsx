import s from "./feed-page.module.scss"
import { useAppDispatch, useAppSelector } from "../../hooks"
import Feed from "../../components/feed/feed";
import { TFeed, TFeedResponse } from "../../components/types/feed";
import Preload from "../../components/preload/preload";

export default function FeedPage () {
   
   const feed = useAppSelector<TFeedResponse | null>(state => state.root.feed.feed);

   if (!feed) {
      return null
   }
 
   return (
      <main>
         <Feed type="feed" data={feed}/>
      </main>
   )
}