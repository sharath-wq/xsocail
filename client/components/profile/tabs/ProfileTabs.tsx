import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import UserPosts from '../UserPosts';
import { PostData, UserPostData } from '@/types/post';
import SavedPosts from './savedPosts/SavedPosts';

const ProfileTabs = ({
    fetchUserPosts,
    userPostsData,
    fetchSavedPosts,
    savedPosts,
}: {
    fetchUserPosts: () => void;
    userPostsData: UserPostData[];
    fetchSavedPosts: () => void;
    savedPosts: PostData[];
}) => {
    return (
        <div className='flex justify-center'>
            <Tabs defaultValue='myPosts' className='w-full'>
                <TabsList className='grid w-full grid-cols-2'>
                    <TabsTrigger value='myPosts'>My Posts</TabsTrigger>
                    <TabsTrigger value='savedPosts'>Saved Posts</TabsTrigger>
                </TabsList>
                <TabsContent value='myPosts'>
                    <UserPosts own={true} fetchUserPosts={fetchUserPosts} posts={userPostsData} />
                </TabsContent>
                <TabsContent value='savedPosts'>
                    <SavedPosts fetchUserSavedPosts={fetchSavedPosts} savedPosts={savedPosts} />
                </TabsContent>
            </Tabs>
        </div>
    );
};

export default ProfileTabs;
