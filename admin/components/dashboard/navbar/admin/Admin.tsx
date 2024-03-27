import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

const Admin = () => {
    return (
        <Avatar>
            <AvatarImage src='https://github.com/shadcn.png' alt='@shadcn' />
            <AvatarFallback>CN</AvatarFallback>
        </Avatar>
    );
};

export default Admin;
