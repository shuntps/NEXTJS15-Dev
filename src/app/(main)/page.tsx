import PostEditor from "@/components/posts/editor/PostEditor";
import TrendsSidebar from "@/components/TrendsSidebar";
import ForYouFeed from "@/app/(main)/ForYouFeed";
import FollowingFeed from "@/app/(main)/FollowingFeed";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function Home() {
  return (
    <main className="flex w-full min-w-0 gap-5">
      <div className="w-full min-w-0 space-y-5">
        <PostEditor />
        <Tabs defaultValue="for-you">
          <TabsList className="h-12 w-full gap-1 bg-card shadow-md">
            <TabsTrigger
              value="for-you"
              className="h-full flex-1 hover:bg-background data-[state=active]:font-bold"
            >
              For you
            </TabsTrigger>
            <TabsTrigger
              value="following"
              className="h-full flex-1 hover:bg-background data-[state=active]:font-bold"
            >
              Following
            </TabsTrigger>
          </TabsList>
          <TabsContent value="for-you">
            <ForYouFeed />
          </TabsContent>
          <TabsContent value="following">
            <FollowingFeed />
          </TabsContent>
        </Tabs>
      </div>
      <TrendsSidebar />
    </main>
  );
}
