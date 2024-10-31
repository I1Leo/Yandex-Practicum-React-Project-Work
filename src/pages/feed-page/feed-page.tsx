import { useAppDispatch, useAppSelector } from "../../hooks"
import Feed from "../../components/feed/feed";
import { TFeedResponse } from "../../components/types/feed";
import { wsFeedConnect, wsFeedDisconnect } from "../../services/feed/actions";
import { useEffect } from "react";
import { FEED_SERVER_URL } from "../../constants";

export default function FeedPage () {
   
   const feed = useAppSelector<TFeedResponse | null>(state => state.root.feed.feed);

   const dispatch = useAppDispatch();

   useEffect(() => {
		dispatch(wsFeedConnect(FEED_SERVER_URL));

      return () => {
         dispatch(wsFeedDisconnect());
      };
	}, [dispatch]);

   if (!feed) {
      return null
   }
 
   return (
      <main>
         <Feed type="feed" data={feed}/>
      </main>
   )
}